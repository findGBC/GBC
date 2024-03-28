import { JobType } from '../enum'
import type { TeamMemberProps } from '../type'

import type { IBerryDisplayTupleMap } from '.'
import {
  IAttributeBackground,
  IAttributeBody,
  IAttributeClothes,
  IAttributeExpression,
  IAttributeHat,
} from '.'

export const NansenRequestInfo: RequestInit = {
  body: null,
  credentials: 'omit',
  headers: {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'fr-FR,fr;q=0.7',
    'ape-secret':
      'U2FsdGVkX18iu3uKN6Gf6tsI2F2uCG8wq8J74z6qWdkOh0KbMwlpcqlB30ja+Z/Sbf9D3fA9ckfXCy7MjSp1YlxmhAr9oAP3Pl5hKHU9iZIDOcxYYVldvhjNDgg2CGIJLRGDxYmYXd614kHEhhl7fw==',
    'cache-control': 'no-cache',
    passcode: 'A63uGa8775Ne89wwqADwKYGeyceXAxmHL',
  },
  method: 'GET',
  mode: 'cors',
  referrer: 'https://portfolio.nansen.ai/',
  referrerPolicy: 'strict-origin-when-cross-origin',
}

export const Constants = {
  ADDRESS: {
    GBC_ARBITRUM: '0xDe2DBb7f1C893Cc5E2f51CbFd2A73C8a016183a0',
    GBC_AVAX: '0x753b4769154fd100ee763e927305d5b3131dbc8e',
  },
  NETWORK: {
    ARBITRUM: {
      EXPLORER: 'https://arbiscan.io/address/',
    },
    AVALANCHE: {
      EXPLORER: 'https://snowtrace.io/address/',
    },
  },
  SANITY: {
    PROJECT_ID: '25djj1sn',
  },
  STATUS: {
    CLOSED: 'closed',
  },
  SUBGRAPH: {
    SNAPSHOT: 'https://hub.snapshot.org/graphql',
  },
  URL: {
    DISCORD: 'https://discord.com/invite/7ZMmeU3z9j',
    GBC_DOC: 'https://docs.findgbc.com/',
    GBC_FORUM: 'https://docs.findgbc.com/web3-ecosystem/governance-forum',
    GBC_LAB: 'https://app.findgbc.com/lab',
    GBC_OPENSEA: 'https://opensea.io/fr/collection/findgbc',
    GBC_SNAPSHOT: 'https://snapshot.org/#/gbc-nft.eth/proposal/',
    GBC_TRADING: 'https://app.findgbc.com/trading',
    GITHUB: 'https://github.com/nissoh/blueberry-club',
    INSTAGRAM: 'https://www.instagram.com/findgbc',
    NANSEN: 'https://api-dev.nansen.ai/',
    PULSE: 'https://medium.com/@BlueberryPulse',
    PUPPET: 'https://puppet.finance/',
    RSS: {
      MEDIUM: 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@findgbc',
    },
    SNAPSHOT: {
      AVATAR: 'https://cdn.stamp.fyi/avatar/eth:',
      DAO: '',
    },

    SPOTIFY: 'https://open.spotify.com/show/3GlhNSKDwwpUid4EBeQmlX?si=153bff92b20b4ba0',
    TWITTER: 'https://x.com/findGBC',
  },
}

export const TeamMembers: TeamMemberProps[] = [
  {
    id: 1,
    img: 'xm',
    jobs: [JobType.CoFounder, JobType.CEO],
    name: 'XM',
    socialLink: 'https://twitter.com/xm92boi',
  },
  {
    id: 2,
    img: 'appodial',
    jobs: [JobType.CoFounder, JobType.Advisor],
    name: 'Appodial',
    socialLink: 'https://twitter.com/yoannykp',
  },
  {
    id: 3,
    img: 'itburnz',
    jobs: [JobType.CoFounder, JobType.Dev],
    name: 'itburnz',
    socialLink: 'https://twitter.com/itburnzz',
  },
  {
    id: 4,
    img: 'feedthem',
    jobs: [JobType.COO],
    name: 'feedthem',
    socialLink: 'https://twitter.com/feedthemGBC',
  },
  {
    id: 5,
    img: 'vee',
    jobs: [JobType.CMO],
    name: 'Vee',
    socialLink: 'https://twitter.com/vee_GBC',
  },
  {
    id: 6,
    img: 'monte',
    jobs: [JobType.CM],
    name: 'Monte',
    socialLink: 'https://twitter.com/monte_xyz',
  },
  {
    id: 7,
    img: 'oda',
    jobs: [JobType.Dev],
    name: 'Oda',
    socialLink: 'https://twitter.com/crypto_oda',
  },
]

export const SignerMembers: TeamMemberProps[] = [
  {
    id: 1,
    img: 'xm',
    jobs: [JobType.CoFounder, JobType.CEO],
    name: 'XM',
    socialLink: 'https://twitter.com/xm92boi',
  },
  {
    id: 2,
    img: 'appodial',
    jobs: [JobType.CoFounder, JobType.Advisor],
    name: 'Appodial',
    socialLink: 'https://twitter.com/yoannykp',
  },
  {
    id: 3,
    img: 'itburnz',
    jobs: [JobType.CoFounder, JobType.Dev],
    name: 'itburnz',
    socialLink: 'https://twitter.com/itburnzz',
  },
  {
    id: 4,
    img: 'x',
    jobs: [JobType.GMX],
    name: 'xdev',
    socialLink: 'https://twitter.com/xdev_10',
  },
  {
    id: 5,
    img: 'kingblockchain',
    jobs: [JobType.Advisor],
    name: 'KingBlockchain',
    socialLink: 'https://twitter.com/kingblockchain',
  },
  {
    id: 6,
    img: 'monte',
    jobs: [JobType.CM],
    name: 'Monte',
    socialLink: 'https://twitter.com/monte_xyz',
  },
  {
    id: 7,
    img: 'buffzer',
    jobs: [JobType.Advisor],
    name: 'B2F',
    socialLink: 'https://twitter.com/B2F_zer',
  },
]

export const AddressZero = '0x0000000000000000000000000000000000000000' as const

export const USD_DECIMALS = 30
export const USDG_DECIMALS = 18

export const BASIS_POINTS_DIVISOR = 10000n
export const DEPOSIT_FEE = 30n
export const LIMIT_LEVERAGE = 1000000n
export const MAX_LEVERAGE = 1000000n
export const MIN_LEVERAGE = 11000n
export const LEVERAGE_LIQUIDAITON = 1000000n
export const DEDUCT_USD_FOR_GAS = 10n ** 30n * 2n

export const LIQUIDATION_FEE = 10n ** 5n

export const TAX_BASIS_POINTS = 50n
export const STABLE_TAX_BASIS_POINTS = 5n
export const MINT_BURN_FEE_BASIS_POINTS = 25n
export const SWAP_FEE_BASIS_POINTS = 30n
export const STABLE_SWAP_FEE_BASIS_POINTS = 1n
export const MARGIN_FEE_BASIS_POINTS = 10n

export const FUNDING_RATE_PRECISION = 1000000n

export enum intervalTimeMap {
  SEC = 1,
  MIN = 60,
  MIN5 = 300,
  MIN15 = 900,
  MIN30 = 1800,
  MIN60 = 3600,
  HR2 = 7200,
  HR4 = 14400,
  HR8 = 28800,
  HR24 = 86400,
  DAY7 = 604800,
  MONTH = 2628000,
  MONTH2 = 5256000,
  YEAR = 31536000,
}

export const DefaultBerryAttributes: IBerryDisplayTupleMap = [
  IAttributeBackground.BLACK_AND_WHITE,
  IAttributeClothes.HOODIE_BLUE,
  IAttributeBody.WINNER,
  IAttributeExpression.HAPPY,
  undefined,
  IAttributeHat.NUDE,
  undefined,
]
