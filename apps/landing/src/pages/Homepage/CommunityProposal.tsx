import React from 'react'

import proposal from '../../assets/img/homepage/proposal.jpg'
import { Button } from '../../components/atoms'
import Animate from '../../components/atoms/Animate/Animate'
import Title from '../../components/atoms/Title/Title'
import MultiLines from '../../components/mollecules/MultiLines/MultiLines'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import { useI18nContext } from '../../i18n/i18n-react'

const CommunityProposal: React.FC = () => {
  const { LL } = useI18nContext()

  const colClassNames = 'md:w-1/2 p-6'
  return (
    <section>
      <Animate>
        <div className="md:px-40 flex flex-wrap">
          <div className={`${colClassNames} md:order-first`}>
            <img
              className="rounded-2xl w-full"
              src={proposal}
              alt="Community Treasury"
            />
          </div>

          <div className={`${colClassNames} grid content-center`}>
            <Title value={LL.COMMUNITY.TITLE()}></Title>
            <div className="space-y-4">
              {MultiLines({ text: LL.COMMUNITY.TEXT() })}
            </div>

            <div className="flex gap-2 my-4">
              <Button btnType={ButtonType.Primary} url={Constants.URL.GBC_DAO}>
                {LL.COMMUNITY.VIEW_PROPOSAL()}
              </Button>
            </div>
          </div>
        </div>
      </Animate>
    </section>
  )
}
export default CommunityProposal
