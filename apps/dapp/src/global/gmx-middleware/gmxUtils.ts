import { TOKEN_ADDRESS_TO_SYMBOL, TOKEN_DESCRIPTION_MAP } from './address/token'
import { BASIS_POINTS_DIVISOR, MARGIN_FEE_BASIS_POINTS } from './constant'
import type { ITokenDescription, ITrade, ITradeClosed, ITradeLiquidated } from './types'
import { TradeStatus } from './types'
import { easeInExpo, formatFixed, getSafeMappedValue } from './utils'

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

export function isTradeClosed(trade: ITrade): trade is ITradeClosed {
  return trade.status === TradeStatus.CLOSED
}

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
