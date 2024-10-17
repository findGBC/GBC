import React from 'react'

import lab from '../../assets/img/homepage/lab.jpg'
import nfts from '../../assets/img/homepage/nfts.png'
import blueberrypulse from '../../assets/img/homepage/blueberrypulse.jpg'
import gbccamp from '../../assets/img/homepage/gbccamp.jpg'
import gbctrading from '../../assets/img/homepage/gbctrading.jpg'
import { Animate } from '../../components/atoms'
import PageTitle from '../../components/atoms/Title/PageTitle'
import { Card } from '../../components/organism'
import { Constants } from '../../global/constant'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { useI18nContext } from '../../i18n/i18n-react'

const Ecosystem: React.FC = () => {
  const { LL } = useI18nContext()
  useDocumentTitle(LL.ECOSYSTEM.TITLE())
  return (
    <>
      <div className="layout thin mb-32">
        <Animate>
          <PageTitle value={LL.ECOSYSTEM.TITLE()} />
          <div className="mt-6">
            <div className="flex flex-wrap">
              <Card
                title="GMX Blueberry Club NFTs"
                img={nfts}
                route={Constants.URL.GBC_OPENSEA}
              >
                {LL.ECOSYSTEM.NFT()}
              </Card>
              <Card
                title="Blueberry Lab"
                img={lab}
                route={Constants.URL.GBC_LAB}
              >
                {LL.ECOSYSTEM.LAB()}
              </Card>
              <Card
                title="GBC Trading"
                img={gbctrading}
                route={Constants.URL.GBC_TRADING}
              >
                {LL.ECOSYSTEM.TRADE()}
              </Card>
              <Card
                title="GBC Camp"
                img={gbccamp}
                route={'#'}
              >
                {LL.APPS.GBC_CAMP.TEXT()}
              </Card>
              <Card
                title="Blueberry Pulse"
                img={blueberrypulse}
                route={Constants.URL.PULSE}
              >
                {LL.ECOSYSTEM.PULSE()}
              </Card>
            </div>
          </div>
        </Animate>
      </div>
    </>
  )
}
export default Ecosystem
