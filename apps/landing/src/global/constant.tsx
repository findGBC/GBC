import {JobType} from './enum'
import type {TeamMemberProps} from './type'

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
    GBC_APP: 'https://app.findgbc.com/',
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
    PUPPET: '#puppet',
    RSS: {
      MEDIUM:
        'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@findgbc',
    },
    SNAPSHOT: {
      AVATAR: 'https://cdn.stamp.fyi/avatar/eth:',
      DAO: '',
    },

    SPOTIFY:
      'https://open.spotify.com/show/3GlhNSKDwwpUid4EBeQmlX?si=153bff92b20b4ba0',
    TWITTER: 'https://x.com/findGBC',
    GBC_API: import.meta.env.VITE_GBC_API,
    GBC_DAO: 'https://snapshot.box/#/s:gbc-nft.eth'
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
    img: 'feedthem',
    jobs: [JobType.COO],
    name: 'feedthem',
    socialLink: 'https://twitter.com/feedthemGBC',
  },
  {
    id: 3,
    img: 'vee',
    jobs: [JobType.CMO],
    name: 'Vee',
    socialLink: 'https://twitter.com/vee_GBC',
  },
  {
    id: 4,
    img: 'cloud',
    jobs: [JobType.Gif],
    name: 'Cloud',
    socialLink: 'https://twitter.com/cloud_artto',
  },
  {
    id: 5,
    img: 'itburnz',
    jobs: [JobType.CoFounder],
    name: 'itburnz',
    socialLink: 'https://twitter.com/itburnzz',
  },
  {
    id: 6,
    img: 'cowchain',
    jobs: [JobType.DevTeam],
    name: 'Cowchain',
    socialLink: 'https://cowchain.io/',
  },
  {
    id: 7,
    img: 'harry89pl',
    jobs: [JobType.Dev],
    name: 'Harry89PL',
    socialLink: 'https://x.com/LukaszHarry',
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
    img: 'feedthem',
    jobs: [JobType.COO],
    name: 'feedthem',
    socialLink: 'https://twitter.com/feedthemGBC',
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
