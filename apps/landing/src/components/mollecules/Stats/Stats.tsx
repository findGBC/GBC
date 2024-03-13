import type { StatsProps } from '../../../global/type'

const Stats = ({ children }: StatsProps) => {
  return (
    <div className="content-center w-full my-12">
      <div className="stats stats-vertical md:stats-horizontal rounded-3xl border-base-200 md:h-40 w-full border">
        {children}
      </div>
    </div>
  )
}
export default Stats
