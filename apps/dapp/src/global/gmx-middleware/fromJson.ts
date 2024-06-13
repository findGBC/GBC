import { isTradeClosed, isTradeLiquidated } from './gmxUtils'
import type {
  IAbstractPositionAdjustment,
  IIdentifiableEntity,
  IPositionClose,
  IPositionDecrease,
  IPositionIncrease,
  IPositionLiquidated,
  IPositionUpdate,
  IPriceLatest,
  IPricefeed,
  IStake,
  ITokenPricefeed,
  ITrade,
  ITradeV2,
} from './types'

export function baseEntityJson<T extends IIdentifiableEntity>(json: T): T {
  return { ...json }
}

export function positonCloseJson(json: IPositionClose): IPositionClose {
  const realisedPnl = BigInt(json.realisedPnl)
  const collateral = BigInt(json.collateral)
  const averagePrice = BigInt(json.averagePrice)
  const size = BigInt(json.size)

  return { ...baseEntityJson(json), averagePrice, collateral, realisedPnl, size }
}

export function positionLiquidatedJson(json: IPositionLiquidated): IPositionLiquidated {
  const collateral = BigInt(json.collateral)
  const markPrice = BigInt(json.markPrice)
  const size = BigInt(json.size)
  const realisedPnl = BigInt(json.realisedPnl)
  const reserveAmount = BigInt(json.reserveAmount)

  return { ...baseEntityJson(json), collateral, markPrice, realisedPnl, reserveAmount, size }
}

export function pricefeedJson(json: IPricefeed): IPricefeed {
  const c = BigInt(json.c)
  const h = BigInt(json.h)
  const l = BigInt(json.l)
  const o = BigInt(json.o)
  const tokenAddress = json.tokenAddress.slice(1) as ITokenPricefeed

  return { ...json, c, h, l, o, tokenAddress }
}

export function priceLatestJson(json: IPriceLatest): IPriceLatest {
  const value = BigInt(json.value)

  return { ...json, value }
}

export function positionDeltaJson<T extends IAbstractPositionAdjustment>(json: T): T {
  const sizeDelta = BigInt(json.sizeDelta)
  const collateralDelta = BigInt(json.collateralDelta)

  return { ...json, collateralDelta, sizeDelta }
}

export function positionIncreaseJson(json: IPositionIncrease): IPositionIncrease {
  const price = BigInt(json.price)
  const fee = BigInt(json.fee)

  return { ...json, ...positionDeltaJson(json), fee, price }
}

export function positionDecreaseJson(json: IPositionDecrease): IPositionDecrease {
  const price = BigInt(json.price)
  const fee = BigInt(json.fee)

  return { ...json, ...positionDeltaJson(json), fee, price }
}

export function positionUpdateJson(json: IPositionUpdate): IPositionUpdate {
  const collateral = BigInt(json.collateral)
  const averagePrice = BigInt(json.averagePrice)
  const size = BigInt(json.size)
  const markPrice = BigInt(json.markPrice)
  const realisedPnl = BigInt(json.realisedPnl)
  const reserveAmount = BigInt(json.reserveAmount)

  return {
    ...json,
    averagePrice,
    collateral,
    markPrice,
    realisedPnl,
    reserveAmount,
    size,
  }
}

export function tradeJson<T extends ITrade>(json: T): T {
  const decreaseList = json.decreaseList
    .map(positionDecreaseJson)
    .sort((a, b) => a.timestamp - b.timestamp)
  const increaseList = json.increaseList
    .map(positionIncreaseJson)
    .sort((a, b) => a.timestamp - b.timestamp)
  const updateList = json.updateList
    .map(positionUpdateJson)
    .sort((a, b) => a.timestamp - b.timestamp)

  const realisedPnl = BigInt(json.realisedPnl)
  const averagePrice = BigInt(json.averagePrice)
  const collateral = BigInt(json.collateral)

  const closedPosition = isTradeClosed(json) ? positonCloseJson(json.closedPosition) : null
  const liquidatedPosition = isTradeLiquidated(json)
    ? positionLiquidatedJson(json.liquidatedPosition)
    : null

  return {
    ...json,
    averagePrice,
    closedPosition,
    collateral,

    decreaseList,
    fee: BigInt(json.fee),

    increaseList,

    liquidatedPosition,
    realisedPnl,
    //size: BigInt(json.size),
    updateList,
  }
}

export function tradeJsonV2<T extends ITradeV2>(json: T): T {
  const realisedPnlUsd = BigInt(json.realisedPnlUsd)
  const sizeInUsd = BigInt(json.sizeInUsd)
  const sizeInTokens = BigInt(json.sizeInTokens)
  const collateralAmount = BigInt(json.collateralAmount)
  const referralMember = BigInt(json.referralMember || 0)
  const cumulativeSizeUsd = BigInt(json.cumulativeSizeUsd)
  const cumulativeSizeToken = BigInt(json.cumulativeSizeToken)
  const cumulativeCollateralUsd = BigInt(json.cumulativeCollateralUsd)
  const cumulativeCollateralToken = BigInt(json.cumulativeCollateralToken)
  const maxSizeUsd = BigInt(json.maxSizeUsd)
  const maxSizeToken = BigInt(json.maxSizeToken)
  const maxCollateralUsd = BigInt(json.maxCollateralUsd)
  const maxCollateralToken = BigInt(json.maxCollateralToken)

  return {
    ...json,
    collateralAmount,
    cumulativeCollateralToken,
    cumulativeCollateralUsd,
    cumulativeSizeToken,
    cumulativeSizeUsd,
    maxCollateralToken,
    maxCollateralUsd,
    maxSizeToken,
    maxSizeUsd,
    realisedPnlUsd,
    referralMember,
    sizeInTokens,
    sizeInUsd,
  }
}

export function stakeJson<T extends IStake>(obj: T): T {
  return {
    ...obj,
    amount: BigInt(obj.amount),
    amountUsd: BigInt(obj.amountUsd),
    token: obj.token,
  }
}

export function toTradeSummary<T extends ITrade>(json: T): T {
  const size = BigInt(json.size)
  const collateral = BigInt(json.collateral)
  const fee = BigInt(json.fee)

  return { ...json, collateral, fee, size }
}

// export function accountSummaryJson(json: IAccountSummary): IAccountSummary {
//   const realisedPnl = BigInt(json.realisedPnl)
//   const realisedPnlPercentage = BigInt(json.realisedPnlPercentage)
//   const fee = BigInt(json.fee)
//   const collateral = BigInt(json.collateral)
//   const size = BigInt(json.size)

//   return { ...json, ...positionDeltaJson(json),  collateral, fee, size, realisedPnl, realisedPnlPercentage }
// }
