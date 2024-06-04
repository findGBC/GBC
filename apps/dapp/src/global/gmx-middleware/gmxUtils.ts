import { zeroAddress } from 'viem'

import { TOKEN_ADDRESS_TO_SYMBOL, TOKEN_DESCRIPTION_MAP } from './address/token'
import { BASIS_POINTS_DIVISOR, MARGIN_FEE_BASIS_POINTS, USDG_DECIMALS } from './constant'
import type {
  IAccountSummary,
  IAccountSummaryV2,
  IPositionLiquidated,
  ITokenDescription,
  ITrade,
  ITradeClosed,
  ITradeLiquidated,
  ITradeV2,
} from './types'
import { TradeStatus } from './types'
import { easeInExpo, formatFixed, getSafeMappedValue, groupByMapMany } from './utils'

export function safeDiv(a: bigint, b: bigint): bigint {
  if (b === 0n) {
    return 0n
  }

  return a / b
}

export function div(a: bigint, b: bigint): bigint {
  return safeDiv(a * BASIS_POINTS_DIVISOR, b)
}

export function formatToBasis(a: bigint): number {
  return formatFixed(a, 4)
}

export function getPriceDelta(isLong: boolean, entryPrice: bigint, priceChange: bigint) {
  return isLong ? priceChange - entryPrice : entryPrice - priceChange
}

export function getPnL(isLong: boolean, entryPrice: bigint, priceChange: bigint, size: bigint) {
  if (size === 0n) {
    return 0n
  }

  const priceDelta = getPriceDelta(isLong, entryPrice, priceChange)
  return (size * priceDelta) / entryPrice
}

export function getMarginFees(size: bigint) {
  return (size * MARGIN_FEE_BASIS_POINTS) / BASIS_POINTS_DIVISOR
}

export function isTradeLiquidated(trade: ITrade): trade is ITradeLiquidated {
  return trade.status === TradeStatus.LIQUIDATED
}

function calculateAverage(data: Array<Record<string, any>>, key: string) {
  const arr = data.map((item) => BigInt(item[key]))
  const total = arr.reduce((sum, size) => sum + size, BigInt(0))
  const average = total / BigInt(arr.length)
  return average
}

export function isTradeClosed(trade: ITrade): trade is ITradeClosed {
  return trade.status === TradeStatus.CLOSED
}

export function toAccountSummaryListV2(
  list: ITradeV2[],
  tokenPrices: Record<string, string>,
  updatedPrices: Record<string, string>[],
) {
  const tradeListMap = groupByMapMany(list, (a) => a.account)

  const tradeListEntries = Object.entries(tradeListMap)

  const summaryList = tradeListEntries.map(([account, tradeList]) => {
    const seedAccountSummary: IAccountSummaryV2 = {
      account,
      avgCollateral: 0n,
      avgSize: 0n,
      cumCollateral: 0n,
      cumSize: 0n,
      lossCount: 0,
      maxCollateral: 0n,
      openPnl: 0n,
      pnl: 0n,
      realisedPnl: 0n,
      winCount: 0,
    }
    const maxUsedCollateral = tradeList
      .map((el) => el.maxCollateralUsd)
      .reduce((max, current) => (current > max ? current : max), BigInt(0))

    const sortedTradeList = tradeList.sort((a, b) => +a.blockTimestamp - +b.blockTimestamp)
    const avgSize = calculateAverage(sortedTradeList, 'sizeInUsd')
    // const avgSize = sortedTradeList.reduce((s, n) => (n.sizeInUsd > s ? n.sizeInUsd : s), 0n)
    const avgCollateral = calculateAverage(sortedTradeList, 'collateralAmount')

    const summary = sortedTradeList.reduce((seed, next): IAccountSummaryV2 => {
      const winCount = seed.winCount + (next.realisedPnlUsd > 0n ? 1 : 0)
      const lossCount = seed.lossCount + (next.realisedPnlUsd < 0n ? 1 : 0)
      const realisedPnlInUsd = seed.realisedPnl + next.realisedPnlUsd
      const usedMinProfit = maxUsedCollateral - realisedPnlInUsd > 0n ? realisedPnlInUsd : 0n
      const cumSize = seed.cumSize + next.cumulativeSizeUsd
      const maxCollateral = usedMinProfit > maxUsedCollateral ? usedMinProfit : maxUsedCollateral
      const cumCollateral = seed.cumCollateral + next.cumulativeCollateralUsd

      let indexTokenMarkPrice = BigInt(0)

      if (!tokenPrices[next.indexToken] || next.indexToken == zeroAddress) {
        const nativePrice = updatedPrices.find(
          (el) => el.tokenAddress.toLowerCase() === next.collateralToken.toLowerCase(),
        )

        indexTokenMarkPrice = BigInt(nativePrice?.maxPrice || 0)
      } else {
        indexTokenMarkPrice = BigInt(tokenPrices[next.indexToken])
      }

      const openDelta =
        next.realisedPnlUsd === 0n
          ? (indexTokenMarkPrice - next.maxCollateralUsd / next.maxCollateralToken) *
            next.maxCollateralToken
          : 0n
    
      const openPnl = seed.openPnl + openDelta

      const pnl = openPnl + realisedPnlInUsd

      return {
        account,
        avgCollateral: seed.avgCollateral,
        avgSize,
        cumCollateral,
        cumSize,
        lossCount,
        maxCollateral,
        openPnl,
        pnl,
        realisedPnl: realisedPnlInUsd,
        winCount,
      }
    }, seedAccountSummary)

    return { ...summary, avgCollateral, avgSize }
  })

  return summaryList
}
export function toAccountSummaryList(
  list: ITrade[],
  priceMap: { [k: string]: bigint },
  endDate: number,
): IAccountSummary[] {
  const tradeListMap = groupByMapMany(list, (a) => a.account)

  const tradeListEntries = Object.entries(tradeListMap)
  const summaryList = tradeListEntries.map(([account, tradeList]) => {
    const seedAccountSummary: IAccountSummary = {
      account,
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
      realisedPnl: 0n,
      winCount: 0,
    }

    const sortedTradeList = tradeList.sort((a, b) => +a.timestamp - +b.timestamp)

    const initSeed = {
      maxUsedCollateral: 0n,
      positions: {},
    } as { maxUsedCollateral: bigint; positions: { [k: string]: bigint } }

    const adjustmentsDuringTimerange = sortedTradeList
      .flatMap((next) => [
        ...next.updateList,
        ...(isTradeClosed(next)
          ? [next.closedPosition]
          : isTradeLiquidated(next)
            ? [next.liquidatedPosition as IPositionLiquidated & { key: string }]
            : []),
      ])
      // .filter(n => n.timestamp <= endDate)
      .sort((a, b) => a.timestamp - b.timestamp)

    const { maxUsedCollateral } = adjustmentsDuringTimerange.reduce((seed, next) => {
      const prevCollateral = seed.positions[next.key] || 0n

      seed.positions[next.key] =
        next.__typename === 'UpdatePosition'
          ? next.collateral > prevCollateral
            ? next.collateral
            : prevCollateral
          : 0n

      const nextUsedCollateral = Object.values(seed.positions).reduce((s, n) => s + n, 0n)

      if (nextUsedCollateral > seed.maxUsedCollateral) {
        seed.maxUsedCollateral = nextUsedCollateral
      }

      return seed
    }, initSeed)

    const summary = sortedTradeList.reduce((seed, next): IAccountSummary => {
      const filteredUpdates = [
        ...next.updateList,
        ...(isTradeClosed(next)
          ? [next.closedPosition]
          : isTradeLiquidated(next)
            ? [next.liquidatedPosition as IPositionLiquidated & { key: string }]
            : []),
      ].filter((update) => update.timestamp <= endDate)

      const lastUpdate = filteredUpdates[filteredUpdates.length - 1]
      const avgSize = filteredUpdates.reduce((s, n) => (n.size > s ? n.size : s), 0n)
      const avgCollateral = filteredUpdates.reduce(
        (s, n) => (n.collateral > s ? n.collateral : s),
        0n,
      )

      const cumSizeIncrease = next.increaseList
        .filter((update) => update.timestamp <= endDate)
        .reduce((s, n) => s + n.sizeDelta, 0n)
      const cumSizeDecrease = next.decreaseList
        .filter((update) => update.timestamp <= endDate)
        .reduce((s, n) => s + n.sizeDelta, 0n)

      const cumCollateralIncrease = next.increaseList
        .filter((update) => update.timestamp <= endDate)
        .reduce((s, n) => s + n.collateralDelta, 0n)
      const cumCollateralDecrease = next.decreaseList
        .filter((update) => update.timestamp <= endDate)
        .reduce((s, n) => s + n.collateralDelta, 0n)

      const indexTokenMarkPrice = BigInt(priceMap['_' + next.indexToken])
      const openDelta =
        lastUpdate.__typename === 'UpdatePosition'
          ? getPnL(next.isLong, lastUpdate.averagePrice, indexTokenMarkPrice, lastUpdate.size)
          : 0n

      const fee = seed.fee + next.fee
      const openPnl = seed.openPnl + openDelta
      const realisedPnl =
        seed.realisedPnl +
        (lastUpdate.__typename === 'UpdatePosition' ? lastUpdate.realisedPnl : next.realisedPnl)
      const pnl = openPnl + realisedPnl

      const usedMinProfit = maxUsedCollateral - pnl > 0n ? pnl : 0n
      const maxCollateral = usedMinProfit > maxUsedCollateral ? usedMinProfit : maxUsedCollateral

      const currentPnl = lastUpdate.realisedPnl + openDelta
      const winCount = seed.winCount + (currentPnl > 0n ? 1 : 0)
      const lossCount = seed.lossCount + (currentPnl < 0n ? 1 : 0)

      const cumulativeLeverage = seed.cumulativeLeverage + div(lastUpdate.size, maxCollateral)

      return {
        account,
        avgCollateral,
        avgLeverage: 0n,
        avgSize,
        cumCollateral: seed.cumCollateral + cumCollateralIncrease + cumCollateralDecrease,
        cumSize: seed.cumSize + cumSizeIncrease + cumSizeDecrease,
        cumulativeLeverage,
        fee,
        lossCount,
        maxCollateral,
        openPnl,
        pnl,
        realisedPnl,
        winCount,
      }
    }, seedAccountSummary)

    return summary
  })

  return summaryList
}

// export function toLadder(summaryList: IAccountSummary[]) {
// }

export function liquidationWeight(
  isLong: boolean,
  liquidationPriceUSD: bigint,
  markPriceUSD: bigint,
) {
  const weight = isLong
    ? div(liquidationPriceUSD, markPriceUSD)
    : div(markPriceUSD, liquidationPriceUSD)
  const newLocal = formatFixed(weight, 4)
  const value = easeInExpo(newLocal)
  return value > 1 ? 1 : value
}

export function validateIdentityName(name: string) {
  if (typeof name === 'string' && name.startsWith('@') && !/^@?(\w){1,15}$/.test(name)) {
    throw new Error('Invalid twitter handle')
  }

  if (typeof name !== 'string' || name.length > 15 || String(name).length < 4) {
    throw new Error('Invalid name')
  }
}

export function getTokenDescription(
  token: keyof typeof TOKEN_ADDRESS_TO_SYMBOL,
): ITokenDescription {
  return TOKEN_DESCRIPTION_MAP[getSafeMappedValue(TOKEN_ADDRESS_TO_SYMBOL, token, token)]
}
