import { formatReadableUSD } from '../../../global/gmx-middleware/utils'

type DisplayTraderScoreProps = {
  score: bigint
  estFeePool: bigint
  totalScore: bigint
  currentMetric: string
}

const DisplayTraderScore = ({ score, estFeePool, totalScore }: DisplayTraderScoreProps) => {
  const reward = (estFeePool * score) / totalScore

  if (reward < 0) {
    return null
  }

  return (
    <div className="flex justify-end">
      <div className="bg-success rounded-xl bg-opacity-10 leading-10">
        <span className="p-2 text-success-content">
          + {formatReadableUSD(reward, false, false)} $
        </span>
      </div>
    </div>
  )
}

export default DisplayTraderScore
