import { Stats } from '../../components/mollecules'
import StatsItem from '../../components/mollecules/Stats/StatsItem'
import { useI18nContext } from '../../i18n/i18n-react'
import { useTreasuryDataProviderContext } from "../../providers/TreasuryDataProvider";

const TreasuryStats = () => {
  const { LL } = useI18nContext()
  const { data } = useTreasuryDataProviderContext()

  return (
    <div className="content-center w-full my-12">
      <Stats>
        <StatsItem
          title={LL.TREASURY.TOTAL_VALUE()}
          value={data?.totalValue ?? 0}
          valueSymbol="$"
        ></StatsItem>
      </Stats>
    </div>
  )
}
export default TreasuryStats
