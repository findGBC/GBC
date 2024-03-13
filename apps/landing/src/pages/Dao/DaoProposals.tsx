import Proposal from '../../components/organism/Proposal/Proposal'
import type { DaoProposalsProps, ProposalProps } from '../../global/type'
import { useI18nContext } from '../../i18n/i18n-react'

const DaoProposals: React.FC<DaoProposalsProps> = ({ proposals }) => {
  const { LL } = useI18nContext()
  return (
    <>
      <h2 className="text-3xl font-bold">{LL.COMMUNITY.DAO.PROPOSALS()}</h2>
      <div className="flex flex-wrap">
        {proposals ? (
          proposals.map((p: ProposalProps, i: number) => (
            <div className="md:w-1/2 w-full" key={i}>
              <Proposal
                id={(proposals.length - i).toString()}
                title={p.title}
                state={p.state}
                created={p.created}
                end={p.end}
                scores_total={p.scores_total}
                scores={p.scores}
                proposal={p.id}
                key={p.proposal}
              ></Proposal>
            </div>
          ))
        ) : (
          <div className="w-full text-center">
            {LL.COMMUNITY.DAO.NO_PROPOSAL()}
          </div>
        )}
      </div>
    </>
  )
}

export default DaoProposals
