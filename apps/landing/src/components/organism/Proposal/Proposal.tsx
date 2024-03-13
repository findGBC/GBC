import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { CalendarIcon, StopIcon } from '@heroicons/react/outline'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Constants } from '../../../global/constant'
import { ButtonType } from '../../../global/enum'
import type { ProposalProps, Voter } from '../../../global/type'
import { useI18nContext } from '../../../i18n/i18n-react'
import { Button } from '../../atoms'
import CardContainer from '../CardContainer/CardContainer'
import Voters from '../Voters/Voters'

const getType = function (status: string, approvalRate: number): ButtonType {
  if (status == 'closed') {
    if (approvalRate > 50) {
      return ButtonType.Success
    } else {
      return ButtonType.Error
    }
  } else {
    return ButtonType.Success
  }
}

const getStatus = function (status: string, approvalRate: number): string {
  if (status == 'closed') {
    if (approvalRate > 50) {
      return 'passed'
    } else {
      return 'defeated'
    }
  } else {
    return 'active'
  }
}

const GET_VOTERS = gql`
  query Votes(
    $id: String!
    $first: Int
    $skip: Int
    $orderBy: String
    $orderDirection: OrderDirection
    $reason_not: String
    $voter: String
    $space: String
    $created_gte: Int
  ) {
    votes(
      first: $first
      skip: $skip
      where: {
        proposal: $id
        vp_gt: 0
        voter: $voter
        space: $space
        reason_not: $reason_not
        created_gte: $created_gte
      }
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ipfs
      voter
      choice
      vp
      vp_by_strategy
      reason
      created
    }
  }
`

const Proposal = ({
  id,
  title,
  state,
  created,
  end,
  scores_total,
  scores,
  proposal,
}: ProposalProps) => {
  const { LL } = useI18nContext()

  const approvalRate = (scores[0] * 100) / scores_total
  const [voters, setVoters] = useState<Voter[]>()

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: Constants.SUBGRAPH.SNAPSHOT,
  })

  useEffect(() => {
    client
      .query({
        query: GET_VOTERS,
        variables: {
          first: 6,
          id: proposal,
          orderBy: 'vp',
          orderDirection: 'desc',
          skip: 0,
        },
      })
      .then((res) => {
        setVoters(res.data.votes)
      })
  }, [])

  return (
    <Link to={Constants.URL.GBC_SNAPSHOT + proposal} target="_blank">
      <CardContainer>
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className="text-secondary-content text-2xl text-center">
              #{id}
            </div>
            <div className="">
              <Button btnType={getType(state, approvalRate)}>
                {LL.COMMUNITY.STATUS({
                  status: getStatus(state, approvalRate),
                })}
              </Button>
            </div>
          </div>
          <h2 className="card-title min-h-[4rem] text-secondary-content">
            {title}
          </h2>
          <div className="text-base-content gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div>
                <CalendarIcon width={20} />
              </div>
              <div>{LL.SHARED.START()}:</div>
              <div className="font-bold">
                {moment.unix(created).format('MMM DD')}
              </div>
              <div>|</div>
              <div>
                <StopIcon width={20} />
              </div>
              <div>{LL.SHARED.END()}:</div>
              <div className="font-bold">
                {moment.unix(end).format('MMM DD')}
              </div>
            </div>
            <div className="mt-4">
              <progress
                className="progress progress-success bg-error h-2"
                value={approvalRate}
                max="100"
              ></progress>
            </div>
            <div className="flex items-center justify-between gap-3 mt-4">
              {/* <div className="flex items-center justify-between gap-3 mt-4">
                <div>{LL.COMMUNITY.DAO.PROPOSED_BY()}</div>
                <span>
                  <img
                    src={'https://cdn.stamp.fyi/avatar/eth:' + author + '?s=40'}
                    alt=""
                    className="w-10 rounded-full"
                  ></img>
                </span>
              </div> */}
              <div className="flex items-center justify-between gap-3 mt-4">
                <div className="w-40">
                  <Voters
                    total={scores_total}
                    ipfs={voters?.map((v) => v.voter) ?? []}
                  ></Voters>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>
    </Link>
  )
}
export default Proposal
