import type {
  ARBITRUM_ADDRESS,
  ARBITRUM_ADDRESS_INDEX,
  ARBITRUM_ADDRESS_STABLE,
} from './address/arbitrum'
import type { TOKEN_SYMBOL } from './address/symbol'
import type { CHAIN } from './config'

export type IPrice = {
  priceUsd: bigint
}

export type IAsset = {
  balance: bigint
  balanceUsd: bigint
}

export type LabItemOwnership = {
  owner: IOwner
  item: ILabItem
  balance: bigint
}

export interface ILabItem {
  id: number
  uri: string
  supply: bigint
  owners?: ILabItemOwnership[]
  transfers?: ITransfer[]
}

export interface IToken {
  id: number
  operator: string
  owner: IOwner
  transfers: ITransfer[]
  contract: IContract
  labItems: ILabItem[]
}

export interface IContract {
  id: string
  name: string
  symbol: string
  totalSupply: bigint
  mintedTokens: IToken[]
}

export interface ITransfer {
  id: string
  from: IOwner
  to: IOwner
  transaction: ITransaction
  block: bigint
  timestamp: bigint
}

export type ITransaction = {
  id: string
  blockNumber: number
  timestamp: number
  from: string
  to: string
}

export type IBerryLabItems = {
  background: number
  badge: number
  custom: number
}

export type ILabItemOwnership = {
  id: string
  owner: IOwner
  item: ILabItem
  balance: bigint
}

export interface IOwner {
  id: string
  balance: bigint

  ownedTokens: IToken[]
  ownedLabItems: ILabItemOwnership[]

  profile: IToken | null

  ens?: IEnsRegistration
}

export interface ITreasuryStore {
  startedStakingGlpTimestamp: null | number
  startedStakingGmxTimestamp: null | number
}

export interface IAccountStakingStore {
  [key: string]: null | number
}

export interface IPriceInterval {
  o: bigint // open
  h: bigint // high
  l: bigint // low
  c: bigint // close

  timestamp: number
}

export interface IYieldInterval extends IAsset {
  time: number

  feed: string
  price: IPriceInterval
}

export interface IBlueberryLadder extends IAccountSummary {
  profile: IOwner | null
  rank: number
  score: bigint
}

export interface ICompetitionSchedule {
  date: Date
  duration: number
  start: number
  end: number
  elapsed: number
  ended: boolean
  next: number
  previous: number
  epoch: number
}

export interface ICompetitionPrize {
  estSize: bigint
  feePool: bigint
  estFeePool: bigint
  feeMultiplier: bigint
}

export interface ILadderSummary {
  size: bigint
  totalScore: bigint
  averageMaxCollateral: bigint

  metrics: ICompetitionPrize
}

export interface IProfileTradingResult extends ILadderSummary {
  list: IResponsePageApi<IBlueberryLadder>
  profile: IBlueberryLadder | null
}

export enum IAttributeMappings {
  'Afro Green' = 78,
  'Afro Multicolor' = 42,
  'Afro Pink' = 34,
  Angry = 59,
  'Army Green' = 116,
  'Army Helmet' = 95,
  'Army Pink' = 128,
  Arrow = 138,
  Basket = 142,
  'Basketball Green' = 50,
  'Basketball Red' = 112,
  'Bathrobe Grey' = 119,
  'Bathrobe Orange' = 103,
  'Beanie Grey' = 65,
  'Beanie Red' = 67,
  'Bear Cap' = 126,
  'Bear Fur' = 127,
  'Beard Green' = 102,
  'Beard Multicolor' = 98,
  'Beard Pink' = 64,
  'Black and White' = 145,
  Blind = 44,
  Blue = 16,
  Blueberry = 5,
  Bone = 84,
  Bored = 6,
  'Bowtie Green' = 83,
  'Bowtie Pink' = 131,
  Brain = 136,
  Bubblegum = 33,
  'Bucket Hat Green' = 45,
  'Bucket Hat Purple' = 68,
  'Bucket Hat Red' = 108,
  Bull = 77,
  'Bull Horns' = 61,
  'Cap Blue' = 47,
  'Cap Pink' = 121,
  'Cap Yellow' = 8,
  Chain = 133,
  Chef = 35,
  Cigarette = 75,
  Clown = 130,
  Crying = 139,
  Cute = 89,
  'Damaged Shirt Grey' = 132,
  'Damaged Shirt Purple' = 96,
  Dead = 92,
  Devil = 141,
  'Devil Horns' = 97,
  Dizzy = 63,
  'Double Bun Blue' = 111,
  'Double Bun Purple' = 76,
  Dumb = 53,
  'Durag Blue' = 70,
  'Durag Grey' = 80,
  'Durag Orange' = 105,
  Eyepatch = 54,
  Fear = 26,
  'Flower Blue' = 71,
  'Flower Green' = 115,
  'Flower Sunglasses Blue' = 90,
  'Flower Sunglasses Green' = 14,
  Gold = 146,
  Green = 39,
  'Green Candle' = 143,
  Grey = 3,
  'Grillz Gold' = 124,
  'Grillz Multicolor' = 41,
  'Grillz Silver' = 94,
  Halo = 137,
  Happy = 17,
  'Hawaiian Shirt Orange' = 87,
  'Hawaiian Shirt Yellow' = 85,
  'Headband Purple' = 91,
  'Headband Yellow' = 122,
  'Heart Glasses' = 114,
  'Hoodie Blue' = 52,
  'Hoodie Multicolor' = 40,
  'Hoodie Pink' = 25,
  King = 23,
  'King Robe' = 123,
  Laughing = 107,
  Looser = 2,
  'Medical Mask' = 62,
  'Mohawk Green' = 99,
  'Mohawk Red' = 101,
  Neird = 56,
  Ninja = 10,
  Nude = 144,
  Orange = 24,
  'Overalls Green' = 48,
  'Overalls Red' = 81,
  Pink = 20,
  Pipe = 82,
  Pirate = 88,
  'Pixel Glasses' = 100,
  Police = 117,
  'Puffer Multicolor' = 21,
  'Puffer Purple' = 140,
  'Puffer Yellow' = 125,
  Purple = 12,
  Red = 46,
  'Red Laser' = 60,
  Rich = 73,
  Rugpull = 15,
  Sad = 86,
  'Sexy Doctor' = 79,
  'Shirt Blue' = 58,
  'Shirt Yellow' = 66,
  'Ski Sunglasses Blue' = 37,
  'Ski Sunglasses Pink' = 49,
  Sleeping = 32,
  'Soccer Jersey' = 72,
  Sombrero = 134,
  Stitches = 93,
  'Straw Hat' = 51,
  'Suit Black' = 4,
  'Suit Pink' = 110,
  'Sunglasses Green' = 7,
  'Sunglasses Red' = 29,
  Surprised = 36,
  'Sweater Grey' = 113,
  'Sweater Red' = 31,
  'Tank Top Black' = 55,
  'Tank Top White' = 104,
  Thinking = 22,
  'Top Hat' = 129,
  'Tshirt Green' = 43,
  'Tshirt Grey' = 106,
  'Tshirt Orange' = 28,
  'Tshirt Purple' = 57,
  'Tshirt Red' = 69,
  Unicorn = 118,
  Vietnamese = 109,
  Viking = 38,
  'Visor Green' = 74,
  'Visor Red' = 11,
  Wings = 120,
  Wink = 13,
  Winner = 1,
  Wizard = 27,
  Work = 135,
  'X Bucket Hat' = 19,
  'X Face Tattoo' = 18,
  'X Hoodie' = 9,
  Yellow = 30,

  'Lab Head' = 199,
  'Avalanche Hoodie' = 200,
  'Fast Food Cap' = 201,
  'Builder' = 202,
  'Christmas Hat' = 203,
  'Beard White' = 204,
  'Camo Background' = 205,
  'Lab Flask' = 207,
  'GLP Shirt' = 208,
  'GBC x Giorgio Balbi' = 209,
  'GBC x Wine Bottle Club' = 210,
  'Summer Buoy' = 211,
  Noodles = 212,
  High = 213,
  'Juice Head' = 214,
  'Ultra Sound BLAT' = 215,
  'Holographic Background' = 216,
  xMithical = 217,
  'Scary Night' = 218,
  Skeleton = 219,
  Birthday = 220,
  'Marine Shirt' = 221,
  'Giving Love' = 222,
  'Pepe Face' = 223,
  'Arbitrum Swag' = 224,
  'Holographic Badge' = 225,
  'Degen Ape' = 226,
  'NFT Paris Bandana' = 227,
  'Blueberry Fly' = 228,
  'Blueberry Saint' = 229,
}

export enum IAttributeBody {
  BLUEBERRY = IAttributeMappings.Blueberry,
  GOLD = IAttributeMappings.Gold,
  BLACK_AND_WHITE = IAttributeMappings['Black and White'],
  LOSER = IAttributeMappings.Looser,
  WINNER = IAttributeMappings.Winner,
  NUDE = IAttributeMappings.Nude,
}

export enum IAttributeExpression {
  ANGRY = IAttributeMappings.Angry,
  BORED = IAttributeMappings.Bored,
  CRYING = IAttributeMappings.Crying,
  CUTE = IAttributeMappings.Cute,
  DEAD = IAttributeMappings.Dead,
  DIZZY = IAttributeMappings.Dizzy,
  DUMB = IAttributeMappings.Dumb,
  FEAR = IAttributeMappings.Fear,
  HAPPY = IAttributeMappings.Happy,
  LAUGHING = IAttributeMappings.Laughing,
  SAD = IAttributeMappings.Sad,
  SLEEPING = IAttributeMappings.Sleeping,
  SUPRISED = IAttributeMappings.Surprised,
  THINKING = IAttributeMappings.Thinking,
  WINK = IAttributeMappings.Wink,
  GOLD = IAttributeMappings.Gold,
  BLACK_AND_WHITE = IAttributeMappings['Black and White'],
  LOSER = IAttributeMappings.Looser,
  WINNER = IAttributeMappings.Winner,
  NUDE = IAttributeMappings.Nude,

  HIGH = IAttributeMappings.High,
}

export enum IAttributeClothes {
  ARMY_GREEN = IAttributeMappings['Army Green'],
  ARMY_PINK = IAttributeMappings['Army Pink'],
  BASKET = IAttributeMappings.Basket,
  BASKETBALL_GREEN = IAttributeMappings['Basketball Green'],
  BASKETBALL_RED = IAttributeMappings['Basketball Red'],
  BATHROBE_GREY = IAttributeMappings['Bathrobe Grey'],
  BATHROBE_ORANGE = IAttributeMappings['Bathrobe Orange'],
  BEAR_FUR = IAttributeMappings['Bear Fur'],
  BULL = IAttributeMappings.Bull,
  CHAIN = IAttributeMappings.Chain,
  CHEF = IAttributeMappings.Chef,
  DAMAGED_SHIRT_GREY = IAttributeMappings['Damaged Shirt Grey'],
  DAMAGED_SHIRT_PURPLE = IAttributeMappings['Damaged Shirt Purple'],
  DEVIL = IAttributeMappings.Devil,
  HAWAIIAN_SHIRT_ORANGE = IAttributeMappings['Hawaiian Shirt Orange'],
  HAWAIIAN_SHIRT_YELLOW = IAttributeMappings['Hawaiian Shirt Yellow'],
  HOODIE_BLUE = IAttributeMappings['Hoodie Blue'],
  HOODIE_MULTICOLOR = IAttributeMappings['Hoodie Multicolor'],
  HOODIE_PINK = IAttributeMappings['Hoodie Pink'],
  KING_ROBE = IAttributeMappings['King Robe'],
  NINJA = IAttributeMappings.Ninja,
  OVERALLS_GREEN = IAttributeMappings['Overalls Green'],
  OVERALLS_RED = IAttributeMappings['Overalls Red'],
  PIRATE = IAttributeMappings.Pirate,
  POLICE = IAttributeMappings.Police,
  PUFFER_MULTICOLOR = IAttributeMappings['Puffer Multicolor'],
  PUFFER_PURPLE = IAttributeMappings['Puffer Purple'],
  PUFFER_YELLOW = IAttributeMappings['Puffer Yellow'],
  SEXY_DOCTOR = IAttributeMappings['Sexy Doctor'],
  SHIRT_BLUE = IAttributeMappings['Shirt Blue'],
  SHIRT_YELLOW = IAttributeMappings['Shirt Yellow'],
  SOCCER_JERSEY = IAttributeMappings['Soccer Jersey'],
  SUIT_BLACK = IAttributeMappings['Suit Black'],
  SUIT_PINK = IAttributeMappings['Suit Pink'],
  SWEATER_GREY = IAttributeMappings['Sweater Grey'],
  SWEATER_RED = IAttributeMappings['Sweater Red'],
  TANKTOP_BLACK = IAttributeMappings['Tank Top Black'],
  TANKTOP_WHITE = IAttributeMappings['Tank Top White'],
  TSHIRT_GREEN = IAttributeMappings['Tshirt Green'],
  TSHIRT_GREY = IAttributeMappings['Tshirt Grey'],
  TSHIRT_ORANGE = IAttributeMappings['Tshirt Orange'],
  TSHIRT_PURPLE = IAttributeMappings['Tshirt Purple'],
  TSHIRT_RED = IAttributeMappings['Tshirt Red'],
  WINGS = IAttributeMappings.Wings,
  WIZARD = IAttributeMappings.Wizard,
  WORK = IAttributeMappings.Work,
  X_HOODIE = IAttributeMappings['X Hoodie'],
  GOLD = IAttributeMappings.Gold,
  BLACK_AND_WHITE = IAttributeMappings['Black and White'],
  LOSER = IAttributeMappings.Looser,
  WINNER = IAttributeMappings.Winner,
  NUDE = IAttributeMappings.Nude,

  // lab
  BUILDER = IAttributeMappings.Builder,
  AVALANCHE_HOODIE = IAttributeMappings['Avalanche Hoodie'],
  GLP_SHIRT = IAttributeMappings['GLP Shirt'],
  SUMMER_BUOY = IAttributeMappings['Summer Buoy'],
  ULTRASOUND_BAT = IAttributeMappings['Ultra Sound BLAT'],
  SKELETON = IAttributeMappings.Skeleton,
  MARINE_SHIRT = IAttributeMappings['Marine Shirt'],
  GIVING_LOVE = IAttributeMappings['Giving Love'],
  ARBITRUM_SWAG = IAttributeMappings['Arbitrum Swag'],
  BLUEBERRY_SAINT = IAttributeMappings['Blueberry Saint'],
}

export enum IAttributeFaceAccessory {
  BEARD_GREEN = IAttributeMappings['Beard Green'],
  BEARD_MULTICOLOR = IAttributeMappings['Beard Multicolor'],
  BEARD_PINK = IAttributeMappings['Beard Pink'],
  BLIND = IAttributeMappings.Blind,
  BUBBLEGUM = IAttributeMappings.Bubblegum,
  CIGARETTE = IAttributeMappings.Cigarette,
  CLOWN = IAttributeMappings.Clown,
  EYEPATCH = IAttributeMappings.Eyepatch,
  FLOWER_SUNGLASSES_BLUE = IAttributeMappings['Flower Sunglasses Blue'],
  FLOWER_SUNGLASSES_GREEN = IAttributeMappings['Flower Sunglasses Green'],
  GRILLZ_GOLD = IAttributeMappings['Grillz Gold'],
  GRILLZ_MULTICOLOR = IAttributeMappings['Grillz Multicolor'],
  GRILLZ_SILVER = IAttributeMappings['Grillz Silver'],
  HEART_GLASSES = IAttributeMappings['Heart Glasses'],
  MEDICAL_MASK = IAttributeMappings['Medical Mask'],
  NEIRD = IAttributeMappings.Neird,
  NINJA = IAttributeMappings.Ninja,
  PIPE = IAttributeMappings.Pipe,
  PIXEL_GLASSES = IAttributeMappings['Pixel Glasses'],
  RED_LASER = IAttributeMappings['Red Laser'],
  RICH = IAttributeMappings.Rich,
  SKI_SUNGLASSES_BLUE = IAttributeMappings['Ski Sunglasses Blue'],
  SKI_SUNGLASSES_PINK = IAttributeMappings['Ski Sunglasses Pink'],
  SUNGLASSES_GREEN = IAttributeMappings['Sunglasses Green'],
  SUNGLASSES_RED = IAttributeMappings['Sunglasses Red'],
  X_FACE_TATTOO = IAttributeMappings['X Face Tattoo'],
  GOLD = IAttributeMappings.Gold,
  BLACK_AND_WHITE = IAttributeMappings['Black and White'],
  LOSER = IAttributeMappings.Looser,
  WINNER = IAttributeMappings.Winner,
  NUDE = IAttributeMappings.Nude,

  // lab
  BEARD_WHITE = IAttributeMappings['Beard White'],
  NOODLES = IAttributeMappings.Noodles,
  PEPE_FACE = IAttributeMappings['Pepe Face'],
  NFT_PARIS_BANDANA = IAttributeMappings['NFT Paris Bandana'],
}

export enum IAttributeHat {
  AFRO_GREEN = IAttributeMappings['Afro Green'],
  AFRO_MULTICOLOR = IAttributeMappings['Afro Multicolor'],
  AFRO_PINK = IAttributeMappings['Afro Pink'],
  ARMY_HELMET = IAttributeMappings['Army Helmet'],
  ARROW = IAttributeMappings.Arrow,
  BEANIE_GREY = IAttributeMappings['Beanie Grey'],
  BEANIE_RED = IAttributeMappings['Beanie Red'],
  BEAR_CAP = IAttributeMappings['Bear Cap'],
  BONE = IAttributeMappings.Bone,
  BOWTIE_GREEN = IAttributeMappings['Bowtie Green'],
  BOWTIE_PINK = IAttributeMappings['Bowtie Pink'],
  BRAIN = IAttributeMappings.Brain,
  BUCKET_HAT_GREEN = IAttributeMappings['Bucket Hat Green'],
  BUCKET_HAT_PURPLE = IAttributeMappings['Bucket Hat Purple'],
  BUCKET_HAT_RED = IAttributeMappings['Bucket Hat Red'],
  BULL_HORNS = IAttributeMappings['Bull Horns'],
  CAP_BLUE = IAttributeMappings['Cap Blue'],
  CAP_PINK = IAttributeMappings['Cap Pink'],
  CAP_YELLOW = IAttributeMappings['Cap Yellow'],
  CHEF = IAttributeMappings.Chef,
  DEVIL_HORNS = IAttributeMappings['Devil Horns'],
  DOUBLE_BUN_BLUE = IAttributeMappings['Double Bun Blue'],
  DOUBLE_BUN_PURPLE = IAttributeMappings['Double Bun Purple'],
  DURAG_BLUE = IAttributeMappings['Durag Blue'],
  DURAG_GREY = IAttributeMappings['Durag Grey'],
  DURAG_ORANGE = IAttributeMappings['Durag Orange'],
  FLOWER_BLUE = IAttributeMappings['Flower Blue'],
  FLOWER_GREEN = IAttributeMappings['Flower Green'],
  GREEN_CANDLE = IAttributeMappings['Green Candle'],
  HALO = IAttributeMappings.Halo,
  HEADBAND_PURPLE = IAttributeMappings['Headband Purple'],
  HEADBAND_YELLOW = IAttributeMappings['Headband Yellow'],
  KING = IAttributeMappings.King,
  MOHAWK_GREEN = IAttributeMappings['Mohawk Green'],
  MOHAWK_RED = IAttributeMappings['Mohawk Red'],
  NINJA = IAttributeMappings.Ninja,
  PIRATE = IAttributeMappings.Pirate,
  POLICE = IAttributeMappings.Police,
  RUGPULL = IAttributeMappings.Rugpull,
  SOMBRERO = IAttributeMappings.Sombrero,
  STITCHES = IAttributeMappings.Stitches,
  STRAW_HAT = IAttributeMappings['Straw Hat'],
  TOP_HAT = IAttributeMappings['Top Hat'],
  UNICORN = IAttributeMappings.Unicorn,
  VIETNAMESE = IAttributeMappings.Vietnamese,
  VIKING = IAttributeMappings.Viking,
  VISOR_GREEN = IAttributeMappings['Visor Green'],
  VISOR_RED = IAttributeMappings['Visor Red'],
  WIZARD = IAttributeMappings.Wizard,
  X_BUCKET_HAT = IAttributeMappings['X Bucket Hat'],
  GOLD = IAttributeMappings.Gold,
  BLACK_AND_WHITE = IAttributeMappings['Black and White'],
  LOSER = IAttributeMappings.Looser,
  WINNER = IAttributeMappings.Winner,
  NUDE = IAttributeMappings.Nude,

  // lab
  LAB_HEAD = IAttributeMappings['Lab Head'],
  CHRISTMAS_HAT = IAttributeMappings['Christmas Hat'],
  FAST_FOOD_CAP = IAttributeMappings['Fast Food Cap'],
  LAB_FLASK = IAttributeMappings['Lab Flask'],
  GBC_WINE_BOTTLE_CLUB = IAttributeMappings['GBC x Wine Bottle Club'],
  JUICE_HEAD = IAttributeMappings['Juice Head'],
  // UZUMAKI = IAttributeMappings.Uzumaki,
  XMITHICAL = IAttributeMappings.xMithical,
  BIRTHDAY = IAttributeMappings.Birthday,
  DEGEN_APE = IAttributeMappings['Degen Ape'],
}

export enum IAttributeBackground {
  RED = IAttributeMappings.Red,
  BLUE = IAttributeMappings.Blue,
  GREEN = IAttributeMappings.Green,
  GREY = IAttributeMappings.Grey,
  ORANGE = IAttributeMappings.Orange,
  PINK = IAttributeMappings.Pink,
  PURPLE = IAttributeMappings.Purple,
  YELLOW = IAttributeMappings.Yellow,
  GOLD = IAttributeMappings.Gold,
  BLACK_AND_WHITE = IAttributeMappings['Black and White'],
  LOSER = IAttributeMappings.Looser,
  WINNER = IAttributeMappings.Winner,
  NUDE = IAttributeMappings.Nude,

  CAMO = IAttributeMappings['Camo Background'],
  GIORGIO_BALBI_BG = IAttributeMappings['GBC x Giorgio Balbi'],
  HOLOGRAPHIC_BG = IAttributeMappings['Holographic Background'],
  SCARY_NIGHT = IAttributeMappings['Scary Night'],
}

export enum IAttributeBadge {
  HOLOGRAPHIC_BADGE = IAttributeMappings['Holographic Badge'],
  BLUEBERRY_FLY = IAttributeMappings['Blueberry Fly'],
}

export enum SaleType {
  Public,
  holder,
  Whitelist,
  Lottery,
}

export type IBerryDisplayTupleMap = [
  IAttributeBackground,
  IAttributeClothes,
  IAttributeBody,
  IAttributeExpression,
  IAttributeFaceAccessory,
  IAttributeHat,
  IAttributeBadge,
]

export type ILabAttributeOptions =
  | typeof IAttributeBackground
  | typeof IAttributeClothes
  | typeof IAttributeHat
  | typeof IAttributeFaceAccessory
  | typeof IAttributeBadge

export type SvgPartsMap = [
  { [p in IAttributeBackground]: string },
  { [p in IAttributeClothes]: string },
  { [p in IAttributeBody]: string },
  { [p in IAttributeExpression]: string },
  { [p in IAttributeFaceAccessory]: string },
  { [p in IAttributeHat]: string },
  { [p in IAttributeBadge]: string },
]

export interface MintAccountRule {
  supply: number // uint120
  cost: bigint // uint208
  accountLimit: number // uint120
  start: number // uint64
  finish: number // uint64
}

export type TraitAppearanceValue =
  | 'Background'
  | 'Clothes'
  | 'Body'
  | 'Expression'
  | 'Face Accessory'
  | 'Hat'
export type TraitType = {
  trait_type: TraitAppearanceValue | 'Slot'
  value: string
}

export interface LabItemSale {
  id: number // mapped to global unique ID
  name: string // displays in UI
  description: string // dispolays in UI

  externalLinks?: {
    name: string
    link: string
  }[]

  mintRuleList: MintRule[]
}

export interface MintRuleConfig extends MintAccountRule {
  contractAddress: string
}

export interface MintPublic extends MintRuleConfig {
  type: SaleType.Public
}

export interface MintHolder extends MintRuleConfig {
  type: SaleType.holder
}

export interface MintPrivate extends MintRuleConfig {
  type: SaleType.Whitelist

  nonce: number // uint120
  addressList: string[]
  signatureList: string[][]
}

export type MintRule = MintPublic | MintHolder | MintPrivate

export interface IRequestLeaderboardApi
  extends IRequestPagePositionApi,
    IChainParamApi,
    IRequestSortApi<keyof IBlueberryLadder> {
  timeInterval: intervalTimeMap.HR24 | intervalTimeMap.DAY7 | intervalTimeMap.MONTH
}
export interface IRequestCompetitionLadderApi
  extends IChainParamApi,
    IRequestSortApi<IBlueberryLadder>,
    IRequestPagePositionApi,
    IRequestTimerangeApi {
  schedule: ICompetitionSchedule
  referralCode: string
  maxCollateral: bigint
  account: string | null
  metric: 'roi' | 'pnl'
}

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

export type Address = string
export type ITokenTrade = ITokenIndex | ITokenStable

export type ITokenInput = ITokenTrade | '0x0000000000000000000000000000000000000000'
export type ITokenIndex = ARBITRUM_ADDRESS_INDEX
export type ITokenStable = ARBITRUM_ADDRESS_STABLE

export type ITokenPricefeed = ITokenTrade | ARBITRUM_ADDRESS.GLP | ARBITRUM_ADDRESS.GMX

export interface IGmxContractAddress {
  NATIVE_TOKEN: string

  Vault: string
  VaultPriceFeed: string
  Router: string
  Reader: string
  GlpManager: string
  RewardRouter: string
  RewardReader: string

  GLP: string
  GMX: string
  ES_GMX: string
  BN_GMX: string
  USDG: string

  StakedGmxTracker: string
  BonusGmxTracker: string
  FeeGmxTracker: string
  StakedGlpTracker: string
  FeeGlpTracker: string
  StakedGmxDistributor: string
  StakedGlpDistributor: string

  GmxVester: string
  GlpVester: string

  OrderBook: string
  OrderBookReader: string

  FastPriceFeed: string
  PositionRouter: string
  PositionManager: string
}

export interface ITokenDescription {
  name: string
  symbol: TOKEN_SYMBOL
  isStable: boolean
  decimals: number
}

export interface IEnsRegistration {
  id: string
  labelName: string
  expiryDate: number
  domain: {
    resolvedAddress: {
      id: string
    }
    resolver: {
      texts: string[]
    }
  }
}

export interface IIdentifiableEntity {
  id: string
}
export interface IEntityIndexed extends IIdentifiableEntity {
  timestamp: number
}

export type TypeName<T extends string> = { __typename: T }
export type IndexedType<T extends string> = TypeName<T> & IEntityIndexed

export interface IAbstractPositionIdentity {
  indexToken: ITokenIndex
  collateralToken: ITokenIndex
  account: Address
  isLong: boolean
}

export type IAbstractPositionKey = {
  key: string
}

export type IAbstractPositionAdjustment = {
  collateralDelta: bigint
  sizeDelta: bigint
}

export type IAbstractPositionStake = {
  collateral: bigint
  size: bigint
  realisedPnl: bigint
  averagePrice: bigint
}

export type IAbstractPosition = IAbstractPositionStake & IAbstractPositionIdentity

export interface IVaultPosition extends IAbstractPositionStake {
  entryFundingRate: bigint
  reserveAmount: bigint
  lastIncreasedTime: bigint
}

export interface IPositionIncrease
  extends IAbstractPositionIdentity,
    IAbstractPositionAdjustment,
    IndexedType<'IncreasePosition'> {
  price: bigint
  fee: bigint
  key: string
}
export interface IPositionDecrease
  extends IAbstractPositionIdentity,
    IAbstractPositionAdjustment,
    IndexedType<'DecreasePosition'> {
  price: bigint
  fee: bigint
  key: string
}

export interface IPositionUpdate
  extends IAbstractPositionStake,
    IAbstractPositionKey,
    IndexedType<'UpdatePosition'> {
  markPrice: bigint
  averagePrice: bigint
  entryFundingRate: bigint
  reserveAmount: bigint
  key: string
}

export interface IPositionLiquidated extends IAbstractPosition, IndexedType<'LiquidatePosition'> {
  markPrice: bigint
  reserveAmount: bigint
  key: string
}

export interface IPositionClose extends IAbstractPosition, IndexedType<'ClosePosition'> {
  entryFundingRate: bigint
  averagePrice: bigint
  reserveAmount: bigint
  key: string
}

export interface KeeperIncreaseRequest {
  account: string
  path: string[]
  indexToken: string
  amountIn: bigint
  minOut: bigint
  sizeDelta: bigint
  isLong: boolean
  acceptablePrice: bigint
  executionFee: bigint
  blockGap: bigint
  timeGap: bigint
  // key: string
}

export interface KeeperDecreaseRequest {
  account: string
  path: string[]
  indexToken: string
  collateralDelta: bigint
  sizeDelta: bigint
  isLong: boolean
  receiver: string
  acceptablePrice: bigint
  minOut: bigint
  executionFee: bigint
  blockGap: bigint
  timeGap: bigint
  // key: string
}

export interface IMappedEvent {
  __event: Event
}

export enum TradeStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  LIQUIDATED = 'liquidated',
}

export type IAbstractTrade = IAbstractPositionAdjustment & IAbstractPositionStake

interface ITradeAbstract<T extends TradeStatus = TradeStatus>
  extends IEntityIndexed,
    IVaultPosition,
    IAbstractPositionIdentity {
  account: Address
  status: T
  averagePrice: bigint
  fee: bigint
  key: string

  increaseList: IPositionIncrease[]
  decreaseList: IPositionDecrease[]
  updateList: IPositionUpdate[]
}

export type ITradeOpen = ITradeAbstract<TradeStatus.OPEN>
export type ITradeClosed = ITradeAbstract<TradeStatus.CLOSED> & {
  settledTimestamp: number
  closedPosition: IPositionClose
}
export type ITradeLiquidated = ITradeAbstract<TradeStatus.LIQUIDATED> & {
  settledTimestamp: number
  liquidatedPosition: IPositionLiquidated
}
export type ITradeSettled = ITradeClosed | ITradeLiquidated
export type ITrade = ITradeSettled | ITradeOpen

export interface IStake extends IndexedType<'Stake'> {
  id: string
  account: string
  contract: string
  token: string
  amount: bigint
  amountUsd: bigint
  timestamp: number
}

export interface IAccountSummary {
  realisedPnl: bigint
  cumSize: bigint
  cumCollateral: bigint
  avgCollateral: bigint
  avgSize: bigint
  account: string
  fee: bigint
  winCount: number
  lossCount: number
  maxCollateral: bigint
  avgLeverage: bigint
  openPnl: bigint
  pnl: bigint
  cumulativeLeverage: bigint
}

export interface IPriceTimeline {
  id: string
  value: bigint
  tokenAddress: ITokenIndex
  timestamp: string
}

export interface IPricefeed extends IndexedType<'Pricefeed'> {
  timestamp: number
  o: bigint
  h: bigint
  l: bigint
  c: bigint
  tokenAddress: ITokenPricefeed
}

export interface IPriceLatest extends IndexedType<'PriceLatest'> {
  value: bigint
  id: ITokenPricefeed
  timestamp: number
}

export type IPriceLatestMap = {
  [P in ITokenPricefeed]: IPriceLatest
}

export interface IChainParamApi {
  chain: CHAIN
}

export interface IRequestTimerangeApi {
  from: number
  to: number
}

export interface IRequestPagePositionApi {
  offset: number
  pageSize: number
}

export interface IRequestSortApi<T> {
  selector: keyof T
  direction: 'desc' | 'asc'
}

export type IRequestAccountTradeListApi = IChainParamApi &
  IRequestPagePositionApi &
  IRequestAccountApi & { status: TradeStatus }
export type IRequestPageApi = IRequestPagePositionApi & IChainParamApi & IRequestTimerangeApi

export type IRequestAccountApi = IChainParamApi & { account: string }

export type IRequestPriceTimelineApi = IChainParamApi &
  IRequestTimerangeApi & { tokenAddress: ITokenPricefeed }
export type IRequestAccountHistoricalDataApi = IChainParamApi &
  IRequestAccountApi &
  IRequestTimerangeApi
export type IRequestPricefeedApi = IChainParamApi &
  IRequestTimerangeApi & {
    interval: intervalTimeMap
    tokenAddress: ITokenPricefeed
  }
export type IRequestTradeListApi = IChainParamApi &
  IRequestPagePositionApi &
  IRequestSortApi<keyof ITradeAbstract> & { status: TradeStatus }

export interface IRequestGraphEntityApi extends IChainParamApi, IIdentifiableEntity {}

export interface IResponsePageApi<T> extends IRequestPagePositionApi {
  page: T[]
}
