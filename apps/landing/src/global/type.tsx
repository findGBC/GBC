import type { ReactNode } from 'react'
import type {
  TableInstance,
  UsePaginationInstanceProps,
  UsePaginationState,
  UseSortByInstanceProps,
} from 'react-table'

import type { ButtonType, JobType } from './enum'

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
  createdAt: Date
  updatedAt: Date
  balance: number
}

export type TreasuryDetailsProps = {
  totalValue: number;
  arbitrumBalances: TreasuryAsset[];
  avalancheBalances: TreasuryAsset[];
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
  href: string
  isMobile?: boolean
  className?: string
  name: string
  url?: string
}

export type IButtonProps = {
  children: any
  className?: string
  btnType: ButtonType
  onClick?: any
  url?: string
  border?: boolean
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
