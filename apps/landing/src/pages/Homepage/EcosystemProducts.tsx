import React from 'react'

import lab from '../../assets/img/homepage/lab.jpg'
import nfts from '../../assets/img/homepage/nfts.png'
import gbctrading from '../../assets/img/homepage/gbctrading.jpg'
import { Button, Title } from '../../components/atoms'
import Animate from '../../components/atoms/Animate/Animate'
import { Card } from '../../components/organism'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import { useI18nContext } from '../../i18n/i18n-react'

const EcosystemProducts: React.FC = () => {
  const { LL } = useI18nContext()

  return (
    <section className="thin">
      <Animate>
        <Title value={LL.ECOSYSTEM.TITLE()}></Title>
        <div className="md:w-auto w-full mt-6">
          <div className="flex flex-wrap">
            <Card title="GBC NFTs" img={nfts} route={Constants.URL.GBC_OPENSEA}>
              {LL.ECOSYSTEM.NFT()}
            </Card>
            <Card title="Blueberry Lab" img={lab} route={Constants.URL.GBC_LAB}>
              {LL.ECOSYSTEM.LAB()}
            </Card>
            <Card
              title="GBC Trading"
              img={gbctrading}
              route={Constants.URL.GBC_TRADING}
            >
              {LL.ECOSYSTEM.TRADE()}
            </Card>
          </div>

          <div className="items-center mt-8 text-center">
            <Button btnType={ButtonType.Primary} url="/ecosystem">
              {LL.SHARED.EXPLORE()}
            </Button>
          </div>
        </div>
      </Animate>
    </section>
  )
}
export default EcosystemProducts
