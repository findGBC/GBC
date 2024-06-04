import { formatReadableUSD } from '../../../global/gmx-middleware/utils'

type DisplayTraderScoreProps = {
  score: bigint
  estFeePool: bigint
  totalScore: bigint
  currentMetric: string
}

const DisplayTraderScore = ({ score, estFeePool, totalScore }: DisplayTraderScoreProps) => {
  const reward = (estFeePool * score) / (totalScore || 1n)

  if (reward < 0) {
    return (
      <span className="p-2">
        0 $
      </span>
    )
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
