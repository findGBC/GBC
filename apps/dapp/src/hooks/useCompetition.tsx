import { useQuery } from '@tanstack/react-query'

import { gmxSubgraph } from '../global/gmx-middleware'
import { div, getTokenAmount } from '../global/gmx-middleware/gmxUtils'
import {
  formatFixed,
  getMappedValue,
  groupByMapMany,
  readableNumber,
} from '../global/gmx-middleware/utils'
import type { IBlueberryLadder, IRequestCompetitionLadderApi } from '../global/middleware'
import {
  BLUEBERRY_REFFERAL_CODE,
  CHAIN,
  COMPETITION_METRIC_LIST,
  USD_PERCISION,
  getCompetitionMetrics,
  getCompetitionSchedule,
  isWinner,
  unixTimestampNow,
} from '../global/middleware'
import { CHAIN_ADDRESS_MAP } from '../global/middleware/address/token'

const MIN_MAX_COLLATERAL = USD_PERCISION * 200n // 200 USD
const MIN_ROI = 150n // 1.5%

const getCumulative = async (queryParams: IRequestCompetitionLadderApi) => {
  const tradeList = await gmxSubgraph.getCompetitionTrades(queryParams)

  const accounts = tradeList ? groupByMapMany(tradeList, (t) => t.account) : []
  const priceMap = await fetch('https://arbitrum-api.gmxinfra2.io/prices/tickers').then((res) =>
    res.json(),
  )
  const positions = await gmxSubgraph.getGMXPositions(queryParams.from, Object.keys(accounts))

  const traders = positions.map((el) => {
    return {
      account: el.id,
      avgCollateral: el.cumsumCollateral,
      cumSize: BigInt(el.cumsumSize),
      lossCount: el.losses,
      maxCollateral: BigInt(el.maxCapital),
      openPnl: BigInt(el.startUnrealizedPnl),
      pnl: BigInt(el.realizedPnl) - BigInt(el.startUnrealizedPnl) - BigInt(el.realizedFees),
      realisedPnl: BigInt(el.realizedPnl),
      winCount: el.wins,
    }
  })
  const { size, activeWinnerCount, totalMaxCollateral } = traders.reduce(
    (seed, next) => {
      const roi = div(next.pnl, next.maxCollateral)

      // prevent spam of small trades to affect the average
      if (isWinner(next) && next.maxCollateral > MIN_MAX_COLLATERAL && roi > MIN_ROI) {
        seed.activeWinnerCount++
        seed.totalMaxCollateral += next.maxCollateral
      }

      if (next.pnl > seed.pnl ? next.pnl : seed.pnl) {
        seed.pnl = next.pnl
        seed.highestMaxCollateralBasedOnPnl = next.maxCollateral
      }

      seed.size += next.cumSize

      return seed
    },
    {
      activeWinnerCount: 0n,
      highestMaxCollateralBasedOnPnl: 0n,
      pnl: 0n,
      size: 0n,
      totalMaxCollateral: 0n,
    },
  )
  const averageMaxCollateral = totalMaxCollateral ? totalMaxCollateral / activeWinnerCount : 0n

  const metrics = getCompetitionMetrics(size, queryParams.schedule)

  const totalScore = traders.reduce((s, n) => {
    const score =
      queryParams.metric === 'roi'
        ? div(
            n.pnl,
            n.maxCollateral > averageMaxCollateral ? n.maxCollateral : averageMaxCollateral,
          )
        : n[queryParams.metric]

    return score > 0n ? s + score : s
  }, 1n)
  const connectedProfile: null | IBlueberryLadder = queryParams.account
    ? {
        account: queryParams.account,
        avgCollateral: 0n,
        avgLeverage: 0n,
        avgSize: 0n,
        cumCollateral: 0n,
        cumSize: 0n,
        cumulativeLeverage: 0n,
        fee: 0n,
        lossCount: 0,
        maxCollateral: 0n,
        openPnl: 0n,
        pnl: 0n,
        profile: null,
        rank: 0,
        realisedPnl: 0n,
        score: 0n,
        winCount: 0,
      }
    : null
  const sortedCompetitionList: IBlueberryLadder[] = traders
    .map((summary) => {
      const maxCollateral =
        summary.maxCollateral > averageMaxCollateral ? summary.maxCollateral : averageMaxCollateral
      const score =
        queryParams.metric === 'roi' ? div(summary.pnl, maxCollateral) : summary[queryParams.metric]

      return {
        score,
        summary,
      }
    })
    .sort((a, b) => Number(b.score - a.score))
    .map(({ score, summary }, idx) => {
      const tempSummary: IBlueberryLadder = {
        ...summary,
        profile: null,
        rank: idx + 1,
        score,
      }

      if (connectedProfile && queryParams.account === summary.account) {
        return Object.assign(connectedProfile, tempSummary)
      }

      return tempSummary
    })

  if (queryParams.schedule.ended) {
    // log CSV file for airdrop
    const nativeToken = getMappedValue(CHAIN_ADDRESS_MAP, queryParams.chain).NATIVE_TOKEN
    console.log(
      'token_type,token_address,receiver,amount,id\n' +
        sortedCompetitionList
          .filter((x) => {
            const prize = (metrics.feePool * x.score) / totalScore
            return prize > USD_PERCISION
          })
          .map((x, idx) => {
            const ethPrice = BigInt(
              priceMap.find((token) => token.tokenAddress.toLowerCase() === nativeToken).maxPrice ||
                0,
            )
            const prizeUsd = (metrics.feePool * x.score) / totalScore
            const tokenAmount = formatFixed(getTokenAmount(prizeUsd, ethPrice, 1), 19)
            return `erc20,${nativeToken},${x.account},${readableNumber(tokenAmount)},`
          })
          .join('\n'),
    )
  }

  return {
    averageMaxCollateral,
    metrics,
    profile: connectedProfile as null | IBlueberryLadder,
    size,
    sortedCompetitionList,
    totalScore,
  }
}

// const METRIC_LABEL = {
//   [COMPETITION_METRIC_LIST[0]]: 'PnL',
//   [COMPETITION_METRIC_LIST[1]]: 'ROI',
// } as const

const MAX_COLLATERAL = 500000000000000000000000000000000n

const useCompetition = (address: string | undefined) => {
  const historyParam = Number(new URLSearchParams(document.location.search).get('history') || 0)
  const unixTime = unixTimestampNow()
  const competitionSchedule = getCompetitionSchedule(unixTime, historyParam)
  const from = competitionSchedule.start
  const to = from + competitionSchedule.duration
  const currentMetric = COMPETITION_METRIC_LIST[competitionSchedule.date.getUTCMonth() % 2]
  // const currentMetricLabel = METRIC_LABEL[currentMetric]

  const queryParams: IRequestCompetitionLadderApi = {
    // ...params.sortBy,
    account: address || null,
    chain: CHAIN.ARBITRUM,
    direction: 'desc',
    from,
    maxCollateral: MAX_COLLATERAL,

    metric: currentMetric,

    offset: 0,
    // offset: params.pageIndex * 20,
    pageSize: 20,
    referralCode: BLUEBERRY_REFFERAL_CODE,
    schedule: competitionSchedule,
    selector: 'pnl',
    to,
  }

  const { data, isLoading, status } = useQuery({
    queryFn: async () => {
      return await getCumulative(queryParams)
    },
    queryKey: ['competition', address],
  })

  return {
    currentMetric,
    isLoading,
    leaderboard: data!,
    schedule: competitionSchedule,
    status,
  }
}

export default useCompetition
