import { O } from '@aelea/core'
import { map } from '@most/core'
import { cacheExchange, fetchExchange, gql } from '@urql/core'

import { CHAIN } from '../middleware'

import { TOKEN_SYMBOL } from './address/symbol'
import { intervalTimeMap } from './constant'
import { getTokenDescription } from './gmxUtils'
import type {
  IChainParamApi,
  IEnsRegistration,
  IPositionV2,
  IPriceLatest,
  IPricefeed,
  IPricefeedV2,
  IRequestAccountApi,
  IRequestPageApi,
  IRequestPagePositionApi,
  IRequestPricefeedApi,
  IRequestTimerangeApi,
  ITradeV2,
} from './types'
import {
  createSubgraphClient,
  getChainName,
  getMappedValue,
  groupByKeyMap,
  parseFixed,
  unixTimestampNow,
} from './utils'

import { fromJson } from '.'

export const ensGraph = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch as any,
  url: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
})

export const arbitrumGraph = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch as any,
  url: 'https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum', //https://api.studio.thegraph.com/query/36314/gmx-blueberry-club/version/latest; https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum
})

export const arbitrumGraphV2 = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch as any,
  url: 'https://api.studio.thegraph.com/query/36314/gmx-blueberry-club/version/latest',
})

export const gmxGraph = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch as any,
  url: 'https://gmx.squids.live/gmx-synthetics-arbitrum/graphql',
})

export const arbitrumGraphDev = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch as any,
  url: 'https://api.thegraph.com/subgraphs/name/nissoh/gmx-arbitrum-dev',
})
export const avalancheGraphDev = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch as any,
  url: 'https://api.thegraph.com/subgraphs/name/nissoh/gmx-avalanche-dev',
})

export const avalancheGraph = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch as any,
  url: 'https://api.thegraph.com/subgraphs/name/nissoh/gmx-avalanche',
})

// export const subgraphDevChainMap: { [p in CHAIN]: typeof arbitrumGraph } = {
//   [CHAIN.ARBITRUM]: arbitrumGraphDev,
//   [CHAIN.AVALANCHE]: avalancheGraphDev,
// } as any

export const subgraphChainMap: { [p in CHAIN]: typeof arbitrumGraph } = {
  [CHAIN.ARBITRUM]: arbitrumGraph,
  [CHAIN.AVALANCHE]: avalancheGraph,
  [2]: arbitrumGraphV2,
} as any

const gmxIoPricefeedIntervalLabel = {
  [intervalTimeMap.MIN5]: '5m',
  [intervalTimeMap.MIN15]: '15m',
  [intervalTimeMap.MIN60]: '1h',
  [intervalTimeMap.HR4]: '4h',
  [intervalTimeMap.HR24]: '1d',
}

const derievedSymbolMapping: { [k: string]: TOKEN_SYMBOL } = {
  [TOKEN_SYMBOL.WETH]: TOKEN_SYMBOL.ETH,
  [TOKEN_SYMBOL.WBTC]: TOKEN_SYMBOL.BTC,
  [TOKEN_SYMBOL.BTCB]: TOKEN_SYMBOL.BTC,
  [TOKEN_SYMBOL.WBTCE]: TOKEN_SYMBOL.BTC,
  [TOKEN_SYMBOL.WAVAX]: TOKEN_SYMBOL.AVAX,
}

export const getEnsProfile = O(
  map(async (queryParams: IRequestAccountApi): Promise<IEnsRegistration> => {
    const res = await ensGraph(
      gql(`{
  account(id: "${queryParams.account.toLowerCase()}") {
    domains(where: {resolvedAddress: "${queryParams.account.toLowerCase()}"}) {
      id
      name
      labelName
      resolvedAddress {
        id
      }
      name
      resolver {
        texts
      }
    }
  }
}`),
      {},
    )

    return res.domains[0] as IEnsRegistration
  }),
)

// export async function getProfilePickList(idList: string[]): Promise<IEnsRegistration[]> {
//   if (idList.length === 0) {
//     return []
//   }

//   const newLocal = `{
//   ${idList
//     .map(
//       (id) => `
//   _${id}: account(id: "${id}") {
//     id
//     registrations(orderBy: expiryDate, orderDirection: desc) {
//       expiryDate
//       labelName
//       id
//       domain {
//         resolvedAddress {
//           id
//         }
//         resolver {
//           texts
//         }
//       }
//       expiryDate
//     }
//   }
// `,
//     )
//     .join('')}
// }
// `

//   const nowTime = unixTimestampNow()
//   const res = await ensGraph(gql(newLocal), {})
//   const rawList = Object.values(res)
//     .map((res: any) => {
//       if (!Array.isArray(res?.registrations)) {
//         return null
//       }

//       return res.registrations.filter((x: IEnsRegistration) => {
//         return x.domain.resolvedAddress && Number(x?.expiryDate) > nowTime
//       })[0]
//     })
//     .filter(Boolean) as IEnsRegistration[]

//   return rawList
// }

// export const getEnsProfileListPick = O(
//   map(async (idList: string[]): Promise<IEnsRegistration[]> => {
//     return getProfilePickList(idList)
//   }),
// )

export const getGmxIoPricefeed = O(
  map(async (queryParams: IRequestPricefeedApi): Promise<IPricefeed[]> => {
    const tokenDesc = getTokenDescription(queryParams.tokenAddress)
    const intervalLabel = getMappedValue(gmxIoPricefeedIntervalLabel, queryParams.interval)
    const symbol = derievedSymbolMapping[tokenDesc.symbol] || tokenDesc.symbol
    const res = fetch(
      `https://stats.gmx.io/api/candles/${symbol}?preferableChainId=${queryParams.chain}&period=${intervalLabel}&from=${queryParams.from}&preferableSource=fast`,
    ).then(async (res) => {
      const parsed = await res.json()
      return parsed.prices.map((json: any) => ({
        c: parseFixed(json.c, 30),
        h: parseFixed(json.h, 30),
        l: parseFixed(json.l, 30),
        o: parseFixed(json.o, 30),
        timestamp: json.t,
      }))
    })
    return res
  }),
)

export const fetchTrades = async <T extends IRequestPagePositionApi & IChainParamApi, R>(
  params: T,
  getList: (res: T) => Promise<R[]>,
): Promise<R[]> => {
  const list = await getList(params)
  const nextOffset = params.offset + 1000

  if (nextOffset > 5000) {
    return list
  }

  if (list.length === 1000) {
    const newPage = await fetchTrades({ ...params, offset: nextOffset }, getList)

    return [...list, ...newPage]
  }

  return list
}

export const fetchHistoricTrades = async <
  T extends IRequestPagePositionApi & IChainParamApi & IRequestTimerangeApi,
  R,
>(
  params: T,
  getList: (res: T) => Promise<R[]>,
  splitSpan = intervalTimeMap.DAY7,
): Promise<R[]> => {
  const deltaTime = params.to - params.from

  // splits the queries because the-graph's result limit of 5k items
  if (deltaTime >= splitSpan) {
    const splitDelta = Math.floor(deltaTime / 2)
    const nowTime = unixTimestampNow()
    const to = Math.min(params.to - splitDelta, nowTime)

    const query0 = fetchHistoricTrades({ ...params, offset: 0, to }, getList)
    const query1 = fetchHistoricTrades(
      { ...params, from: params.to - splitDelta, offset: 0 },
      getList,
    )

    return (await Promise.all([query0, query1])).flatMap((res) => res)
  }

  return fetchTrades(params, getList)
}

async function querySubgraph<T extends IChainParamApi>(params: T, document: string): Promise<any> {
  const queryProvider = subgraphChainMap[params.chain]

  if (!queryProvider) {
    throw new Error(`Chain ${getChainName(params.chain) || params.chain} is not supported`)
  }

  return queryProvider(gql(document) as any, {})
}

async function querySubgraphV2<T extends IChainParamApi>(
  params: T,
  document: string,
): Promise<any> {
  const queryProvider = subgraphChainMap[params.chain]

  if (!queryProvider) {
    throw new Error(`Chain ${getChainName(params.chain) || params.chain} is not supported`)
  }

  return arbitrumGraphV2(gql(document) as any, {})
}
async function getPriceLatestMap(queryParams: IChainParamApi): Promise<IPriceLatest[]> {
  const res = await await querySubgraph(
    queryParams,
    `{
  priceLatests {
    id
    value
    timestamp
  }
}
`,
  )

  return res.priceLatests.map(fromJson.priceLatestJson) as IPriceLatest[]
}

export async function getPriceMap(
  time: number,
  queryParams: IChainParamApi,
): Promise<{ [x: string]: bigint }> {
  const dateNow = unixTimestampNow()

  const priceMap =
    dateNow < time
      ? await getPriceLatestMap(queryParams).then((res) => {
          const list = groupByKeyMap(
            res,
            (item) => '_' + item.id,
            (x) => x.value,
          )
          return list
        })
      : await querySubgraph(
          queryParams,
          `
      {
        pricefeeds(where: { timestamp: ${
          Math.floor(time / intervalTimeMap.MIN5) * intervalTimeMap.MIN5
        } }) {
          id
          timestamp
          tokenAddress
          c
          interval
        }
      }
    `,
        ).then((res) => {
          const list = groupByKeyMap(
            res.pricefeeds,
            (item: IPricefeed) => item.tokenAddress,
            (x) => x.c,
          )
          return list
        })

  return priceMap
}

export async function getPriceMapV2(
  time: number,
  queryParams: IChainParamApi,
): Promise<{ [x: string]: bigint }> {
  const priceMap = await querySubgraphV2(
    queryParams,
    `
      {
        priceCandles(where: { timestamp_lt: ${
          Math.floor(time / intervalTimeMap.MIN5) * intervalTimeMap.MIN5
        }}, first: 1000) {
          id
          timestamp
          token
          c
          interval
        }
      }
    `,
  ).then((res) => {
    const list = groupByKeyMap(
      res.priceCandles,
      (item: IPricefeedV2) => item.token,
      (x) => x.c,
    )
    return list
  })

  return priceMap
}

export async function getCompetitionTrades(
  queryParams: IRequestPageApi & { referralCode: string },
) {
  try {
    const positionsOpened = await fetchTrades(
      { ...queryParams, offset: 0, pageSize: 1000 },
      async (params) => {
        const res = await arbitrumGraphV2(
          gql(`
        query {
            positionOpens(first: 1000, skip: ${params.offset}, where: { referralAccount_: {code: "${queryParams.referralCode}"}, blockTimestamp_gte: ${params.from}, blockTimestamp_lt: ${params.to}}) {
              id
              key
              link {
                id
              }
              account
              market
              collateralToken
              indexToken
              sizeInUsd
              sizeInTokens
              collateralAmount
              realisedPnlUsd
              referralAccount {
                id
                code
              }
              referralMember
              cumulativeSizeUsd
              cumulativeSizeToken
              cumulativeCollateralUsd
              cumulativeCollateralToken
              maxSizeUsd
              maxSizeToken
              maxCollateralUsd
              maxCollateralToken
              isLong
              blockNumber
              blockTimestamp
              transactionHash
              logIndex
                }
            }
        `),
          {},
        )

        return res.positionOpens as ITradeV2[]
      },
    )

    const positionSettleds = await fetchTrades(
      { ...queryParams, offset: 0, pageSize: 1000 },
      async (params) => {
        const res = await arbitrumGraphV2(
          gql(`
        query {
            positionSettleds(first: 1000, skip: ${params.offset}, where: { referralAccount_: {code: "${queryParams.referralCode}"}, blockTimestamp_gte: ${params.from}, blockTimestamp_lt: ${params.to}}) {
             id
              key
              link {
                id
              }
              account
              market
              collateralToken
              indexToken
              sizeInUsd
              sizeInTokens
              collateralAmount
              realisedPnlUsd
              referralAccount {
                id
                code
              }
              cumulativeSizeUsd
              cumulativeSizeToken
              cumulativeCollateralUsd
              cumulativeCollateralToken
              maxSizeUsd
              maxSizeToken
              maxCollateralUsd
              maxCollateralToken
              isLong
              blockNumber
              blockTimestamp
              transactionHash
              logIndex
                }
            }
        `),
          {},
        )
        return res.positionSettleds as ITradeV2[]
      },
    )

    const positionsOpenedList: ITradeV2[] = positionsOpened
      .concat(positionSettleds)
      .map(fromJson.tradeJsonV2)

    return positionsOpenedList
  } catch (e) {
    console.log({ e })
  }
}
export async function getCompetitionTradeIncreases(
  queryParams: IRequestPageApi & { referralCode: string },
  accounts: string[],
) {
  const refIds = accounts.map((ref: any) => `"${ref}"`)
  const idsString = refIds.join(', ')
  try {
    const positionIncreases = await fetchTrades(
      { ...queryParams, offset: 0, pageSize: 1000 },
      async (params) => {
        const res = await arbitrumGraphV2(
          gql(`
        query {
            positionIncreases(first: 1000, skip: ${params.offset}, where: {account_in: [${idsString}], market: "0x70d95587d40a2caf56bd97485ab3eec10bee6336", blockTimestamp_gte: ${params.from}, blockTimestamp_lt: ${params.to}}) {
              id
              account
              market
              collateralToken
              sizeInUsd
              sizeInTokens
              sizeDeltaUsd
              collateralAmount
              collateralTokenPriceMax
              priceImpactUsd
              isLong
              blockNumber
              blockTimestamp
              transactionHash
              logIndex
              sizeDeltaUsd
              __typename
                }
            }
        `),
          {},
        )

        return res.positionIncreases as IPositionV2[]
      },
    )

    const positionDecreases = await fetchTrades(
      { ...queryParams, offset: 0, pageSize: 1000 },
      async (params) => {
        const res = await arbitrumGraphV2(
          gql(`
        query {
            positionDecreases(first: 1000, skip: ${params.offset}, where: {account_in: [${idsString}], market: "0x70d95587d40a2caf56bd97485ab3eec10bee6336", blockTimestamp_gte: ${params.from}, blockTimestamp_lt: ${params.to}}) {
              id
              account
              market
              collateralToken
              sizeInUsd
              sizeInTokens
              sizeDeltaUsd
              collateralAmount
              collateralTokenPriceMax
              priceImpactUsd
              isLong
              blockNumber
              blockTimestamp
              transactionHash
              logIndex
              sizeDeltaUsd
              __typename
                }
            }
        `),
          {},
        )

        return res.positionDecreases as IPositionV2[]
      },
    )

    //@ts-ignore
    return positionIncreases.concat(positionDecreases)
  } catch (e) {
    console.log({ e })
  }
}

export async function getGMXPositions(
  time: number,
  accounts: string[],
): Promise<
  {
    id: string
    closedCount: number
    cumsumCollateral: string
    cumsumSize: string
    losses: number
    maxCapital: string
    realizedPriceImpact: string
    sumMaxSize: string
    netCapital: string
    realizedFees: string
    realizedPnl: string
    volume: string
    wins: number
    startUnrealizedPnl: string
    startUnrealizedFees: string
    startUnrealizedPriceImpact: string
    __typename: string
  }[]
> {
  const positions = await gmxGraph(
    gql(`
      query PeriodAccountStats($requiredMaxCapital: String, $from: Int, $to: Int) {
  all: periodAccountStats(
    limit: 100000
    where: {maxCapital_gte: $requiredMaxCapital, from: $from, to: $to}
  ) {
    id
    closedCount
    cumsumCollateral
    cumsumSize
    losses
    maxCapital
    realizedPriceImpact
    sumMaxSize
    netCapital
    realizedFees
    realizedPnl
    volume
    wins
    startUnrealizedPnl
    startUnrealizedFees
    startUnrealizedPriceImpact
    __typename
  }
}
    `),
    {
      from: time,
      requiredMaxCapital: '500000000000000000000000000000000',
    },
  )

  return positions.all.filter((el) => accounts.includes(el.id.toLowerCase()))
}

const increasePositionFields = `
  id
  timestamp
  key
  collateralDelta
  sizeDelta
  fee
  price
`
const decreasePositionFields = `
  id
  timestamp
  key
  collateralDelta
  sizeDelta
  fee
  price
`
const updatePositionFields = `
  id
  timestamp
  key
  size
  markPrice
  collateral
  reserveAmount
  realisedPnl
  averagePrice
`
const closePositionFields = `
  id
  timestamp
  key
  size
  collateral
  reserveAmount
  realisedPnl
  averagePrice
  entryFundingRate
`
const liquidatePositionFields = `
  id
  timestamp
  key
  account
  collateralToken
  indexToken
  isLong
  size
  collateral
  reserveAmount
  realisedPnl
  markPrice
`

const tradeFields = `
  id
  timestamp
  account
  indexToken
  isLong
  key
  status

  increaseList(first: 1000) { ${increasePositionFields} }
  decreaseList(first: 1000) { ${decreasePositionFields} }
  updateList(first: 1000) { ${updatePositionFields} }
  fee
  collateral
  averagePrice
  realisedPnl
  closedPosition { ${closePositionFields} }
  liquidatedPosition { ${liquidatePositionFields} }
`

/*


query {
  trades(
      first: 1000
  skip: 0
  where: {
    entryReferralCode: "0x424c554542455252590000000000000000000000000000000000000000000000"
    timestamp_gte: 1714521600
    timestamp_lt: 1714570625
  }
) {
    id // +- (id from orderCreators)?
    timestamp
    account // ++
    indexToken
    isLong // ++
    key // ++
    status //+
    fee // +- executionFee (orderCreated)?
    collateral // there is something, but not relevant
    averagePrice +- acceptablePrice (orderCreated)
    realisedPnl // +- from positionOpen
    increaseList(first: 1000) {
      id // ++
      timestamp // ++ blockTimestamp
      account // ++
      collateralToken // ++
      indexToken //
      isLong
      key
      collateralDelta
      sizeDelta
      fee
      price
      __typename
    }
    decreaseList(first: 1000) {
      id
      timestamp
      account
      collateralToken
      indexToken
      isLong
      key
      collateralDelta
      sizeDelta
      fee
      price
      __typename
    }
    updateList(first: 1000) {
      id
      timestamp
      key
      size
      markPrice
      collateral
      reserveAmount
      realisedPnl
      averagePrice
      entryFundingRate
      __typename
    }
    closedPosition {
      id
      timestamp
      key
      size
      collateral
      reserveAmount
      realisedPnl
      averagePrice
      entryFundingRate
      __typename
    }
    liquidatedPosition {
      id
      timestamp
      key
      account
      collateralToken
      indexToken
      isLong
      size
      collateral
      reserveAmount
      realisedPnl
      markPrice
      __typename
    }
    entryReferralCode
    entryReferrer
    __typename
  }
}
*/
