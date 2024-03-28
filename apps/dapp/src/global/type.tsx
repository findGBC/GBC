/* eslint-disable prettier/prettier */
import type { ReactNode, SelectHTMLAttributes } from 'react'
import type {
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseSortByInstanceProps,
} from 'react-table'

import type {
  ButtonType,
  CategoryIndex,
  JobType,
  LabItemGroupType,
  NavigationCaterogy,
} from './enum'
import type { IBlueberryLadder, ICompetitionPrize } from './middleware'

export type TabsType = {
  label: string
  index: number
  Component: React.FC<{}>
}[]

export type TableInstanceWithHooks<T extends object> = TableInstance<T> &
  UsePaginationInstanceProps<T> &
  UseSortByInstanceProps<T> & {
    state: UsePaginationState<T>
  }

export type TreasuryAsset = {
  address: string
  symbol: string
  logo: string
  decimals: number
  chain: string
  name: string
  isNative: boolean
  price: number
  source: string
  isBlacklisted: boolean
  isHidden: boolean
  reportCount: number
  createdAt: Date
  modifiedAt: Date
  balance: number
}

export type TreasuryDetailsProps = {
  assets: TreasuryAsset[]
}

export type AnimateProps = {
  children: any
  initiallyVisible?: boolean | undefined
}

export type MultiLinesProps = {
  text: string
}

export type IPropsComponent = {
  children?: React.ReactNode
  value?: string | number
  href?: string
  as?: 'navlink' | 'link' | 'newtab'
  className?: string | ((prop: { isActive: boolean }) => string)
  onClick?: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  min?: string
  max?: string
  step?: string
}
export type IListProp = {
  children: React.ReactNode
  className?: string
}
export type IMyLinkProps = {
  href: string
  children: React.ReactNode
  as?: 'navlink' | 'link' | 'newtab'
  className?: string | ((prop: { isActive: boolean }) => string)
  onClick?: () => void
}

export type INavItemProps = {
  children: ReactNode
  href?: string
  isMobile?: boolean
  className?: string
  name: string
  url?: string
  iconOnly?: boolean
}

export type IButtonProps = {
  children: any
  className?: string
  linkClasses?: string
  btnType: ButtonType
  onClick?: any
  url?: string
  border?: boolean
  disabled?: boolean
}

export type ICategoryIcon = {
  map?: any
  category: number
  id: number
  src: string
}

export type IGroupItem = {
  src: string
  name: string
  id: LabItemGroupType
}

export type PageTitleProps = {
  value: string
}

export type TitleProps = {
  value: string
}

export type StatsProps = {
  children: any
}

export type CardProps = {
  img: string
  children: any
  title: string
  route: string
}

export type CardContainerProps = {
  children: any
  className?: string
}

export type VotersProps = {
  ipfs: string[]
  total: number
}

export type Voter = {
  ipfs: string
  voter: string
  choice: number
  vp: number
  vp_by_strategy: number[]
  reason: string
  created: number
}

export type ProposalProps = {
  id: string
  title: string
  state: string
  created: number
  end: number
  scores_total: number
  scores: number[]
  proposal: string
}

export type DaoProposalsProps = {
  proposals: ProposalProps[] | undefined
}

export type StakingResponse = {
  staking: Staking[]
  perpetuals: any[]
}

export type Staking = {
  tokens: TreasuryAsset[]
  balance: number
  rewards: TreasuryAsset[]
}

export type TeamMemberProps = {
  name: string
  jobs: JobType[]
  img: string
  socialLink: string
  id: number
}

export type ArticlesProps = {
  articles: Article[]
}
export type Article = {
  title: string
  link: string
  guid: string
  thumbnail: string
  content: string
  description: string
  pubDate: string
}

export type PostProps = {
  title: string
  body: any
  mainImage: string
  pubDate: string
}

export type NavigationItemDetails = {
  href?: string | undefined	
  name: string
  url: string
}

export type NavigationItem = {
  category: NavigationCaterogy
  href: string
  hrefs?: NavigationItemDetails[]
  name: string
  url: string
}

export type IconProps = {
  className?: string
}

export type LeaderboardProps = {
  traders: IBlueberryLadder[] | undefined
  currentMetric: string
  metrics: ICompetitionPrize
  totalScore: bigint
}

export interface SelectListProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode
  selectClassName?: string
  defaultValue?: string
}

export interface SelectProps extends SelectListProps {
  options: SelectOptionProps[]
}

export type SelectOptionProps = {
  label: string
  value: string
}

export type CategoryByGroup = {
  [key: number]: CategoryIndex[]
}

export type ProfilesQueryResult = {
  profiles: {
    id: string
    username: string
  }[]
}