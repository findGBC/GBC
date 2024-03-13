import React from 'react'

import treasury from '../../assets/img/homepage/treasury.jpg'
import { Button } from '../../components/atoms'
import Animate from '../../components/atoms/Animate/Animate'
import Title from '../../components/atoms/Title/Title'
import MultiLines from '../../components/mollecules/MultiLines/MultiLines'
import { ButtonType } from '../../global/enum'
import { useI18nContext } from '../../i18n/i18n-react'

const CommunityTreasury: React.FC = () => {
  const { LL } = useI18nContext()

  const colClassNames = 'md:w-1/2 p-8'
  return (
    <section>
      <Animate>
        <div className="md:px-40 flex flex-wrap">
          <div className={`${colClassNames} grid content-center`}>
            <Title value={LL.TREASURY.TITLE()}></Title>
            <div className="space-y-6">
              {MultiLines({ text: LL.TREASURY.TEXT() })}
            </div>
            <Button
              btnType={ButtonType.Primary}
              className="mt-6 w-[240px]"
              url="/treasury"
            >
              {LL.SHARED.CHECK_TREASURY()}
            </Button>
          </div>
          <div className={colClassNames}>
            <img
              className="rounded-2xl"
              src={treasury}
              alt={LL.TREASURY.TITLE()}
            />
          </div>
        </div>
      </Animate>
    </section>
  )
}
export default CommunityTreasury
