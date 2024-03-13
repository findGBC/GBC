import { groupByKey } from '../common'
import { CHAIN } from '../config'
import type { ITokenDescription } from '../types'

import { ARBITRUM_ADDRESS } from './arbitrum'
import { TOKEN_SYMBOL } from './symbol'

export const TOKEN_DESCRIPTION_LIST = [
  {
    decimals: 18,
    isStable: false,
    name: 'GLP',
    symbol: TOKEN_SYMBOL.GLP,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'GMX',
    symbol: TOKEN_SYMBOL.GMX,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'Escrow GMX',
    symbol: TOKEN_SYMBOL.ESGMX,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'Avalanche',
    symbol: TOKEN_SYMBOL.AVAX,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'Wrapped AVAX',
    symbol: TOKEN_SYMBOL.WAVAX,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'Chainlink',
    symbol: TOKEN_SYMBOL.LINK,
  },
  {
    decimals: 8,
    isStable: false,
    name: 'Bitcoin (WBTC.e)',
    symbol: TOKEN_SYMBOL.WBTCE,
  },
  {
    decimals: 8,
    isStable: false,
    name: 'Wrapped Bitcoin',
    symbol: TOKEN_SYMBOL.WBTC,
  },
  {
    decimals: 8,
    isStable: false,
    name: 'Bitcoin (BTC.b)',
    symbol: TOKEN_SYMBOL.BTCB,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'Ethereum',
    symbol: TOKEN_SYMBOL.ETH,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'Wrapped Ethereum',
    symbol: TOKEN_SYMBOL.WETH,
  },
  {
    decimals: 18,
    isStable: false,
    name: 'Uniswap',
    symbol: TOKEN_SYMBOL.UNI,
  },
  {
    decimals: 6,
    isStable: true,
    name: 'USD Coin',
    symbol: TOKEN_SYMBOL.USDC,
  },
  {
    decimals: 6,
    isStable: true,
    name: 'USD Coin (USDC.e)',
    symbol: TOKEN_SYMBOL.USDCE,
  },
  {
    decimals: 6,
    isStable: true,
    name: 'Tether',
    symbol: TOKEN_SYMBOL.USDT,
  },
  {
    decimals: 18,
    isStable: true,
    name: 'Dai',
    symbol: TOKEN_SYMBOL.DAI,
  },
  {
    decimals: 18,
    isStable: true,
    name: 'Frax',
    symbol: TOKEN_SYMBOL.FRAX,
  },
  {
    decimals: 18,
    isStable: true,
    name: 'Magic Internet Money',
    symbol: TOKEN_SYMBOL.MIM,
  },
] as ITokenDescription[]

export const TOKEN_DESCRIPTION_MAP = groupByKey(TOKEN_DESCRIPTION_LIST, (token) => token.symbol)

export const CHAIN_NATIVE_TO_SYMBOL = {
  [CHAIN.AVALANCHE]: TOKEN_SYMBOL.AVAX,
  [CHAIN.ARBITRUM]: TOKEN_SYMBOL.ETH,
} as const

export const CHAIN_ADDRESS_MAP = {
  [CHAIN.ARBITRUM]: ARBITRUM_ADDRESS,
}

export const TOKEN_ADDRESS_TO_SYMBOL = {
  [ARBITRUM_ADDRESS.NATIVE_TOKEN]: TOKEN_SYMBOL.WETH,

  [ARBITRUM_ADDRESS.GLP]: TOKEN_SYMBOL.GLP,
  [ARBITRUM_ADDRESS.GMX]: TOKEN_SYMBOL.GMX,
  [ARBITRUM_ADDRESS.ES_GMX]: TOKEN_SYMBOL.ESGMX,

  [ARBITRUM_ADDRESS.LINK]: TOKEN_SYMBOL.LINK,
  [ARBITRUM_ADDRESS.UNI]: TOKEN_SYMBOL.UNI,
  [ARBITRUM_ADDRESS.WBTC]: TOKEN_SYMBOL.WBTC,

  [ARBITRUM_ADDRESS.DAI]: TOKEN_SYMBOL.DAI,
  [ARBITRUM_ADDRESS.FRAX]: TOKEN_SYMBOL.FRAX,
  [ARBITRUM_ADDRESS.MIM]: TOKEN_SYMBOL.MIM,
  [ARBITRUM_ADDRESS.USDC]: TOKEN_SYMBOL.USDC,
  [ARBITRUM_ADDRESS.USDT]: TOKEN_SYMBOL.USDT,
}
