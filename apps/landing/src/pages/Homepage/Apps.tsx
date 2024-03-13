import React from 'react'

import gbctrading from '../../assets/img/homepage/gbctrading.png'
import puppet from '../../assets/img/homepage/puppet.png'
import Animate from '../../components/atoms/Animate/Animate'
import { MultiLines } from '../../components/mollecules'
import { AppItem } from '../../components/organism'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import { useI18nContext } from '../../i18n/i18n-react'

const Apps: React.FC = () => {
  const { LL } = useI18nContext()

  return (
    <section>
      <Animate>
        <div className="flex flex-wrap">
          <AppItem
            img={gbctrading}
            title={LL.APPS.TRADING.TITLE()}
            classNames="bg-base-200"
            route={Constants.URL.GBC_TRADING}
            btnType={ButtonType.Primary}
          >
            <div className="my-4 space-y-4">
              {MultiLines({ text: LL.APPS.TRADING.TEXT() })}
            </div>
          </AppItem>
          <AppItem
            img={puppet}
            title={LL.APPS.PUPPET.TITLE()}
            classNames="bg-indigo-900 text-white"
            route={Constants.URL.PUPPET}
            btnType={ButtonType.Accent}
            btnText={LL.SHARED.SOON()}
          >
            <div className="my-4 space-y-4">
              {MultiLines({ text: LL.APPS.PUPPET.TEXT() })}
            </div>
          </AppItem>
        </div>
      </Animate>
    </section>
  )
}
export default Apps
