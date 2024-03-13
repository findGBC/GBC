import TeamMember from '../../components/organism/Team/TeamMember'
import { SignerMembers } from '../../global/constant'
import { useI18nContext } from '../../i18n/i18n-react'
import Team from '../Homepage/Team'

const TreasurySigners: React.FC = ({}) => {
  const { LL } = useI18nContext()

  return (
    <div className="content-center w-full my-12">
      <h2 className="mb-2 text-2xl">
        {LL.SHARED.SIGNER(SignerMembers.length)}
      </h2>
      <div>{LL.TREASURY.SIGNERS_TEXT()}</div>
      <div className="flex flex-wrap mt-6">
        {SignerMembers.map((member) => (
          <TeamMember {...member} />
        ))}
      </div>
    </div>
  )
}
export default TreasurySigners
