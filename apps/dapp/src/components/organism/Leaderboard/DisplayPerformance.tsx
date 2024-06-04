import { formatToBasis } from '../../../global/gmx-middleware/gmxUtils'
import { formatReadableUSD, readableNumber } from '../../../global/gmx-middleware/utils'

type DisplayPnlPerformanceProps = {
  score: number
}

export const DisplayPerformance = ({ score }: DisplayPnlPerformanceProps) => {
  const className = score > 0 ? 'text-success-content' : 'text-error-content'

  return (
    <div className="leading-3">
      <div className={className}>
        {score > 0 ? '+' : null}
        {formatReadableUSD(score, false, false)} $
      </div>
    </div>
  )
}

type DisplayRoiPerformanceProps = {
  roi: bigint
}

export const DisplayRoiPerformance = ({ roi }: DisplayRoiPerformanceProps) => {
  const newLocal = readableNumber(formatToBasis(roi) * 100)
  const className = roi > 0 ? 'text-success-content' : 'text-error-content'

  return (
    <div className="leading-3">
      <div className={className}>
        {roi > 0 ? '+' : null}
        {`${Number(newLocal.split(',').join(''))} %`}
      </div>
    </div>
  )
}
