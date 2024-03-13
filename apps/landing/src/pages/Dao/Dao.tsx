import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useEffect, useState } from 'react'

import { Button } from '../../components/atoms'
import Animate from '../../components/atoms/Animate/Animate'
import PageTitle from '../../components/atoms/Title/PageTitle'
import { MultiLines } from '../../components/mollecules'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import type { ProposalProps } from '../../global/type'
import { useI18nContext } from '../../i18n/i18n-react'

import DaoProposals from './DaoProposals'
import DaoSummary from './DaoSummary'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const GET_PROPOSALS = gql`
  query Proposals(
    $first: Int!
    $skip: Int!
    $state: String!
    $space: String
    $space_in: [String]
    $author_in: [String]
    $title_contains: String
    $space_verified: Boolean
  ) {
    proposals(
      first: $first
      skip: $skip
      where: {
        space: $space
        state: $state
        space_in: $space_in
        author_in: $author_in
        title_contains: $title_contains
        space_verified: $space_verified
      }
    ) {
      id
      ipfs
      title
      body
      start
      end
      state
      author
      created
      choices
      space {
        id
        name
        members
        avatar
        symbol
        verified
        plugins
      }
      scores_state
      scores_total
      scores
      votes
      quorum
      symbol
      flagged
    }
  }
`

const Treasury: React.FC = ({}) => {
  const { LL } = useI18nContext()
  const [proposals, setProposals] = useState<ProposalProps[]>()
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: Constants.SUBGRAPH.SNAPSHOT,
  })

  useDocumentTitle(LL.COMMUNITY.DAO.NAME())

  useEffect(() => {
    client
      .query({
        query: GET_PROPOSALS,
        variables: {
          author_in: [],
          first: 6,
          skip: 0,
          space_in: ['gbc-nft.eth'],
          state: 'all',
          title_contains: '',
        },
      })
      .then((res) => {
        setProposals(res.data.proposals)
      })
  }, [])

  return (
    <div className="layout small thin my-6">
      <section>
        <Animate>
          <div>
            <PageTitle value={LL.COMMUNITY.DAO.NAME()} />
            {MultiLines({ text: LL.COMMUNITY.DAO.TEXT() })}
            <br />
            <div>
               Want in on the GBC DAO? Own a GBC NFT, hop onto our <a className='underline font-bold' href={Constants.URL.DISCORD} target='_blank'>Discord</a>, and dive into the 'Gov-Forum' channel to engage !
            </div>
            <DaoSummary proposals={proposals} />
            <DaoProposals proposals={proposals} />
          </div>
        </Animate>
      </section>
    </div>
  )
}

export default Treasury
