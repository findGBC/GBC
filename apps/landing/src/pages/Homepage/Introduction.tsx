import React from 'react'

import kudai from '../../assets/img/kudaberi_fyw.svg'
import { Animate, Button } from '../../components/atoms'
import { MultiLines } from '../../components/mollecules'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import { useI18nContext } from '../../i18n/i18n-react'

const Introduction: React.FC = () => {
  const { LL } = useI18nContext()
  const colClassNames = 'md:w-1/2 p-8'

  return (
    <section>
      <Animate>
        <div className="md:px-24 md:mt-36 flex flex-wrap">
          <div className={`${colClassNames}`}>
            <div>
              <h1 className="text-secondary-content text-6xl">
                {LL.INTRO.TITLE()}
              </h1>
              <div className="md:text-2xl mt-6 space-y-6">
                {MultiLines({ text: LL.INTRO.TEXT() })}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              <Button
                btnType={ButtonType.Primary}
                className="w-[240px]"
                url={Constants.URL.GBC_DOC}
                key="Documentation"
              >
                {LL.SHARED.READ_DOC()}
              </Button>
              <Button
                btnType={ButtonType.Ghost}
                className="w-[240px] sm:ml-3"
                url={Constants.URL.GBC_OPENSEA}
                border={true}
                key="JoinClub"
              >
                {LL.SHARED.JOIN_CLUB()}
              </Button>
            </div>
          </div>

          <div className={`${colClassNames} mx-auto`}>
            <img src={kudai} alt="kudai" className="w-full mt-6 h-[28rem]" />
          </div>
        </div>
      </Animate>
    </section>
  )
}
export default Introduction
