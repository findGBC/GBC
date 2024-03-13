import React from 'react'

import { Animate, Title } from '../../components/atoms'
import { MultiLines } from '../../components/mollecules'
import TeamMember from '../../components/organism/Team/TeamMember'
import { TeamMembers } from '../../global/constant'
import { useI18nContext } from '../../i18n/i18n-react'

const Team: React.FC = () => {
  const { LL } = useI18nContext()

  return (
    <section>
      <Animate>
        <div className="md:px-24 md:mt-36">
          <div>
            <div className="text-center">
              <Title value={LL.TEAM.TITLE()} />
            </div>
            <div className="mt-6 space-y-6 text-base text-center">
              {MultiLines({ text: LL.TEAM.TEXT() })}
            </div>
          </div>
          <div className="flex flex-wrap mt-6">
            {TeamMembers.map((member, index) => (
              <TeamMember {...member} key={index.toString()} />
            ))}
          </div>
        </div>
      </Animate>
    </section>
  )
}
export default Team
