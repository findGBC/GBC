import InformationCircleIcon from '@heroicons/react/solid/InformationCircleIcon'
import CountUp from 'react-countup'

type StatsItemProps = {
  title: string
  value: number
  valueIndex?: string
  info?: string
  valueSymbol?: string
}
const StatsItem = ({
  title,
  value,
  valueIndex,
  info,
  valueSymbol,
}: StatsItemProps) => {
  return (
    <div className="stat">
      <div className="flex">
        <div className="stat-title grid content-center">{title}</div>
        {info ? (
          <div className="stat-title ml-2">
            <div className="tooltip inline" data-tip={info}>
              <InformationCircleIcon width={10}></InformationCircleIcon>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex align-bottom">
        <div className="stat-value text-secondary-content">
          {valueSymbol?.length ? valueSymbol + ' ' : ''}
          <CountUp end={value} duration={3}></CountUp>
        </div>
        {valueIndex ? (
          <div className="text-xs align-text-bottom">{valueIndex}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default StatsItem
