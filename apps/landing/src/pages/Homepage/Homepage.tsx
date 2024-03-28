import React from 'react'

import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useI18nContext } from '../../i18n/i18n-react'

import Apps from './Apps'
import BerriesSlider from './BerriesSlider'
import CommunityProposal from './CommunityProposal'
import CommunityTreasury from './CommunityTreasury'
import EcosystemProducts from './EcosystemProducts'
import Introduction from './Introduction'
import News from './News'
import Team from './Team'

const Homepage: React.FC = () => {
  const { LL } = useI18nContext()
  useDocumentTitle(LL.SHARED.HOME())
  return (
    <>
      <BerriesSlider></BerriesSlider>

      <div className="layout">
        <Introduction />
        <EcosystemProducts />
        <CommunityTreasury />
        <Apps />
        <CommunityProposal />
        <News />
        <Team />
      </div>
    </>
  )
}
export default Homepage
