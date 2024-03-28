import { TOKEN_ADDRESS_TO_SYMBOL, TOKEN_DESCRIPTION_MAP } from './address/token'
import {
  BASIS_POINTS_DIVISOR,
  FUNDING_RATE_PRECISION,
  LIQUIDATION_FEE,
  MARGIN_FEE_BASIS_POINTS,
  MAX_LEVERAGE,
} from './constant'
import type {
  ITrade,
  ITradeSettled,
  ITradeClosed,
  ITradeLiquidated,
  ITradeOpen,
  IAccountSummary as IAccountSummary,
  IPositionLiquidated,
  ITokenDescription,
} from './types'
import { TradeStatus } from './types'
import {
  easeInExpo,
  formatFixed,
  getDenominator,
  getSafeMappedValue,
  groupByMapMany,
} from './utils'

export function safeDiv(a: bigint, b: bigint): bigint {
  if (b === 0n) {
    return 0n
  }

  return a / b
}

export function div(a: bigint, b: bigint): bigint {
  return safeDiv(a * BASIS_POINTS_DIVISOR, b)
}

export function min(a: bigint, b: bigint): bigint {
  return a < b ? a : b
}

export function abs(a: bigint): bigint {
  return a < 0n ? -a : a
}

export function bnDiv(a: bigint, b: bigint): number {
  return formatToBasis(div(a, b))
}

export function formatToBasis(a: bigint): number {
  return formatFixed(a, 4)
}

export function getAdjustedDelta(size: bigint, sizeDeltaUsd: bigint, pnl: bigint) {
  if (size === 0n) {
    return 0n
  }

  return (sizeDeltaUsd * pnl) / size
}

export function getPriceDeltaPercentage(positionPrice: bigint, price: bigint) {
  const priceDelta = price - positionPrice

  return priceDelta / positionPrice
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

export function getDeltaPercentage(delta: bigint, collateral: bigint) {
  return div(delta, collateral)
}

export function getNextAveragePrice(
  islong: boolean,
  size: bigint,
  nextPrice: bigint,
  pnl: bigint,
  sizeDelta: bigint,
) {
  const nextSize = size + sizeDelta
  const divisor = islong ? nextSize + pnl : nextSize + -pnl

  return (nextPrice * nextSize) / divisor
}

export function getTokenAmount(amountUsd: bigint, price: bigint, decimals: number) {
  return (amountUsd * getDenominator(decimals)) / price
}

export function getTokenUsd(amount: bigint, price: bigint, decimals: number) {
  return (amount * price) / getDenominator(decimals)
}

export function getMarginFees(size: bigint) {
  return (size * MARGIN_FEE_BASIS_POINTS) / BASIS_POINTS_DIVISOR
}

export function getLiquidationPrice(
  isLong: boolean,
  collateral: bigint,
  size: bigint,
  averagePrice: bigint,
) {
  const liquidationAmount = div(size, MAX_LEVERAGE)
  const liquidationDelta = collateral - liquidationAmount
  const priceDelta = (liquidationDelta * averagePrice) / size

  return isLong ? averagePrice - priceDelta : averagePrice + priceDelta
}

export function getLiquidationPriceFromDelta(
  isLong: boolean,
  size: bigint,
  collateral: bigint,
  averagePrice: bigint,
  liquidationAmount: bigint,
) {
  if (liquidationAmount > collateral) {
    const liquidationDelta = liquidationAmount - collateral
    const priceDeltaToLiquidate = (liquidationDelta * averagePrice) / size
    return isLong ? averagePrice + priceDeltaToLiquidate : averagePrice - priceDeltaToLiquidate
  }

  const liquidationDelta = collateral - liquidationAmount
  const priceDelta = (liquidationDelta * averagePrice) / size

  return isLong ? averagePrice - priceDelta : averagePrice + priceDelta
}

export function getNextLiquidationPrice(
  isLong: boolean,
  size: bigint,
  collateralUsd: bigint,
  averagePriceUsd: bigint,

  entryFundingRate = 0n,
  cumulativeFundingRate = 0n,
  pnl = 0n,

  sizeDeltaUsd = 0n,
  collateralDeltaUsd = 0n,
) {
  const nextSize = size + sizeDeltaUsd

  if (nextSize === 0n) {
    return 0n
  }

  const adjustedLossAmount = pnl < 0n ? (sizeDeltaUsd * pnl) / size : 0n
  const nextCollateral = collateralUsd + collateralDeltaUsd - adjustedLossAmount // deduct loss off collateral

  const fundingFee = getFundingFee(entryFundingRate, cumulativeFundingRate, size)
  const positionFee = getMarginFees(size) + LIQUIDATION_FEE + fundingFee

  const liquidationPriceForFees = getLiquidationPriceFromDelta(
    isLong,
    nextSize,
    nextCollateral,
    averagePriceUsd,
    positionFee,
  )

  const liquidationPriceForMaxLeverage = getLiquidationPriceFromDelta(
    isLong,
    nextSize,
    nextCollateral,
    averagePriceUsd,
    div(nextSize, MAX_LEVERAGE),
  )

  if (isLong) {
    // return the higher price
    return liquidationPriceForFees > liquidationPriceForMaxLeverage
      ? liquidationPriceForFees
      : liquidationPriceForMaxLeverage
  }

  // return the lower price
  return liquidationPriceForMaxLeverage > liquidationPriceForFees
    ? liquidationPriceForFees
    : liquidationPriceForMaxLeverage
}

export function isTradeSettled(trade: ITrade): trade is ITradeSettled {
  return trade.status !== TradeStatus.OPEN
}

export function isTradeOpen(trade: ITrade): trade is ITradeOpen {
  return trade.status === TradeStatus.OPEN
}

export function isTradeLiquidated(trade: ITrade): trade is ITradeLiquidated {
  return trade.status === TradeStatus.LIQUIDATED
}

export function isTradeClosed(trade: ITrade): trade is ITradeClosed {
  return trade.status === TradeStatus.CLOSED
}

export function getFundingFee(
  entryFundingRate: bigint,
  cumulativeFundingRate: bigint,
  size: bigint,
) {
  if (size === 0n) {
    return 0n
  }

  const fundingRate = cumulativeFundingRate - entryFundingRate
  return (size * fundingRate) / FUNDING_RATE_PRECISION
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

    const sortedTradeList = tradeList.sort((a, b) => a.timestamp - b.timestamp)

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
