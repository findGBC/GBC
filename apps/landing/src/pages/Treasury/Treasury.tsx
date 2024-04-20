import useDocumentTitle from '../../hooks/useDocumentTitle'
import useNansen from '../../hooks/useNansen'
import { useI18nContext } from '../../i18n/i18n-react'

import TreasuryDetails from './TreasuryDetails'
import TreasurySigners from './TreasurySigners'
import TreasuryStats from './TreasuryStats'
import useTreasury from "../../hooks/useTreasury";
import {TreasuryDetailsProps} from "../../global/type";

const Treasury: React.FC = ({}) => {
  const { LL } = useI18nContext()
  const { treasury } = useTreasury();

  useDocumentTitle(LL.TREASURY.DAO())
  return (
    <div className="layout small thin my-6">
      <section>
        <div className="">
          <div className="text-secondary-content mb-6 text-6xl font-bold">
            {LL.TREASURY.DAO()}
          </div>
          <div>{LL.TREASURY.TEXT()}</div>
          <TreasuryStats totalValue={treasury?.totalValue ?? 0} />
          <TreasuryDetails props={treasury} />
          <TreasurySigners />
        </div>
      </section>
    </div>
  )
}

export default Treasury
