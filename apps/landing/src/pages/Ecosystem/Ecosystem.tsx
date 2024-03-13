import React from 'react'

import lab from '../../assets/img/homepage/lab.png'
import nfts from '../../assets/img/homepage/nfts.png'
import podcast from '../../assets/img/homepage/podcast.png'
import pulse from '../../assets/img/homepage/pulse.png'
import puppet from '../../assets/img/homepage/puppet.png'
import trading from '../../assets/img/homepage/trading.png'
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
                img={trading}
                route={Constants.URL.GBC_TRADING}
              >
                {LL.ECOSYSTEM.TRADE()}
              </Card>
              <Card
                title="Puppet Mirror Trading"
                img={puppet}
                route={Constants.URL.PUPPET}
              >
                {LL.APPS.PUPPET.TEXT()}
              </Card>
              <Card
                title="Blueberry Pulse"
                img={pulse}
                route={Constants.URL.PULSE}
              >
                {LL.ECOSYSTEM.PULSE()}
              </Card>
              <Card
                title="The Blueberry Podcast"
                img={podcast}
                route={Constants.URL.SPOTIFY}
              >
                {LL.ECOSYSTEM.PODCAST()}
              </Card>
            </div>
          </div>
        </Animate>
      </div>
    </>
  )
}
export default Ecosystem
