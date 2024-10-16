import React from 'react'

import gbctrading from '../../assets/img/homepage/gbctrading.jpg'
import { Button } from '../../components/atoms'
import Animate from '../../components/atoms/Animate/Animate'
import Title from '../../components/atoms/Title/Title'
import { MultiLines } from '../../components/mollecules'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import { useI18nContext } from '../../i18n/i18n-react'

const Apps: React.FC = () => {
  const { LL } = useI18nContext()

  const colClassNames = 'md:w-1/2 p-8'
  return (
    <section>
      <Animate>
        <div className="md:px-40 flex flex-wrap">
          <div className={colClassNames}>
            <img
              className="rounded-2xl"
              src={gbctrading}
              alt={LL.APPS.TRADING.TITLE()}
            />
          </div>
          <div className={`${colClassNames} grid content-center`}>
            <Title value={LL.APPS.TRADING.TITLE()}></Title>
            <div className="space-y-6">
              {MultiLines({text: LL.APPS.TRADING.TEXT()})}
            </div>
            <Button
              btnType={ButtonType.Primary}
              className="mt-6 w-[240px]"
              url={Constants.URL.GBC_TRADING}
            >
              {LL.SHARED.LAUNCH_APP()}
            </Button>
          </div>
        </div>
      </Animate>
    </section>
  )
}
export default Apps
