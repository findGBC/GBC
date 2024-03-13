import { useEffect, useState } from 'react'

import { Stats } from '../../components/mollecules'
import StatsItem from '../../components/mollecules/Stats/StatsItem'
import type { TreasuryDetailsProps } from '../../global/type'
import { useI18nContext } from '../../i18n/i18n-react'

const TreasuryStats: React.FC<TreasuryDetailsProps> = ({ assets }) => {
  const { LL } = useI18nContext()
  const [treasury, setTreasury] = useState<number>()

  useEffect(() => {
    let amount = 0
    assets.map((a) => {
      amount += a.balance * a.price
    })

    setTreasury(amount)
  }, [assets])
  return (
    <div className="content-center w-full my-12">
      <Stats>
        <StatsItem
          title={LL.TREASURY.TOTAL_VALUE()}
          value={treasury ?? 0}
          valueSymbol="$"
        ></StatsItem>
      </Stats>
    </div>
  )
}
export default TreasuryStats
