import Stats from '../../components/mollecules/Stats/Stats'
import StatsItem from '../../components/mollecules/Stats/StatsItem'
import { Constants } from '../../global/constant'
import type { DaoProposalsProps, ProposalProps } from '../../global/type'
import { useI18nContext } from '../../i18n/i18n-react'

const DaoSummary: React.FC<DaoProposalsProps> = ({ proposals }) => {
  const { LL } = useI18nContext()
  const totalProposal = proposals?.length ?? 0
  const activeProposal =
    proposals?.filter((p: ProposalProps) => p.state != Constants.STATUS.CLOSED)
      .length ?? 0
  const totalVotes =
    proposals?.reduce(
      (acc: number, curr: ProposalProps) => acc + curr.scores_total,
      0
    ) ?? 0

  return (
    <Stats>
      <StatsItem
        title={LL.COMMUNITY.DAO.TOTAL_PROPOSAL()}
        value={totalProposal}
        // info={'All proposals'}
      ></StatsItem>
      <StatsItem
        title={LL.COMMUNITY.DAO.ACTIVE_PROPOSAL(activeProposal)}
        value={activeProposal}
        // info={'This showing all the proposal made by the community'}
      ></StatsItem>
      <StatsItem
        title={LL.COMMUNITY.DAO.TOTAL_VOTES()}
        value={totalVotes}
        // info={'This showing all the proposal made by the community'}
      ></StatsItem>
    </Stats>
  )
}

export default DaoSummary
