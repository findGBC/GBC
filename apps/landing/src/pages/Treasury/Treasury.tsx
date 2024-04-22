import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useI18nContext } from '../../i18n/i18n-react'

import TreasuryDetails from './TreasuryDetails'
import TreasurySigners from './TreasurySigners'
import TreasuryStats from './TreasuryStats'
import {useTreasuryDataProviderContext} from "../../providers/TreasuryDataProvider";

const Treasury: React.FC = ({}) => {
  const { LL } = useI18nContext()
  const { data } = useTreasuryDataProviderContext()

  useDocumentTitle(LL.TREASURY.DAO())
  return (
    <div className="layout small thin my-6">
      <section>
        <div className="">
          <div className="text-secondary-content mb-6 text-6xl font-bold">
            {LL.TREASURY.DAO()}
          </div>
          <div>{LL.TREASURY.TEXT()}</div>
          <TreasuryStats/>
          <TreasuryDetails/>
          <TreasurySigners />
        </div>
      </section>
    </div>
  )
}

export default Treasury
