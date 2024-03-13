import { O } from '@aelea/core'
import { hexValue } from '@ethersproject/bytes'
import { map } from '@most/core'
import type { ClientOptions, OperationContext, TypedDocumentNode } from '@urql/core'
import { createClient, gql, cacheExchange, fetchExchange } from '@urql/core'

import type { IRequestPageApi, ITrade } from '../gmx-middleware'
import { fetchHistoricTrades, subgraphChainMap } from '../gmx-middleware/graph'
import { cacheMap } from '../gmx-middleware/utils'

import type {
  IIdentifiableEntity,
  ILabItem,
  ILabItemOwnership,
  IOwner,
  IRequestPagePositionApi,
  IToken,
} from './types'
import { intervalTimeMap } from './types'

export const createSubgraphClient = (opts: ClientOptions) => {
  const client = createClient(opts)

  return async <Data, Variables extends object = {}>(
    document: TypedDocumentNode<Data, Variables>,
    params: Variables,
    context?: Partial<OperationContext>,
  ): Promise<Data> => {
    const result = await client.query(document, params, context).toPromise()

    if (result.error) {
      throw new Error(result.error.message)
    }

    return result.data!
  }
}

export const blueberrySubgraph = createSubgraphClient({
  exchanges: [cacheExchange, fetchExchange],
  fetch: fetch,
  url: 'https://api.thegraph.com/subgraphs/name/nissoh/blueberry-club-arbitrum',
})

// const cache = cacheMap({})

export async function querySubgraph(document: string): Promise<any> {
  return blueberrySubgraph(gql(document) as any, {})
}

export const ownerList = O(
  map(async (queryParams: Partial<IRequestPagePositionApi>) => {
    const res = await await querySubgraph(`
{
  owners(first: ${queryParams.pageSize || 1000}, skip: ${
    queryParams.offset || 0
  }, orderDirection: asc) {
    id
    balance
    ownedLabItems(first: 1000) {
      balance
      id
    }
    ownedTokens(first: 1000) {
      id
      labItems {
        id
      }
    }
    profile {
      id
      labItems {
        id
      }
    }
  }
}
`)

    return res.owners.map(ownerJson) as IOwner[]
  }),
)

export const getBlueberryOwner = O(
  map(async (queryParams: IIdentifiableEntity) => {
    const res = await await querySubgraph(`
{
  owner(id: "${queryParams.id.toLowerCase()}") {
    id
    balance
    ownedLabItems(first: 1000) {
      balance
      id
    }
    ownedTokens(first: 1000) {
      id
      labItems {
        id
      }
    }
    profile {
      id
      labItems {
        id
      }
    }
  }
}
`)

    return res.owner ? ownerJson(res.owner) : null
  }),
)

export const token = O(
  map(async (queryParams: IIdentifiableEntity) => {
    const res = await await querySubgraph(`
{
  token(id: "${hexValue(Number(queryParams.id))}") {
    id
    owner {
      id
      balance
      ownedLabItems(first: 1000) {
        balance
        id
      }
      rewardClaimedCumulative
      ownedTokens(first: 1000) {
        id
        labItems {
          id
        }
      }
      profile {
        id
        labItems {
          id
        }
      }
    }
    transfers {
      id
      token
      from {
        id
      }
      to {
        id
      }
      timestamp
      transaction {
        id
      }
    }
    labItems {
      id
    }
  }
}
`)

    return tokenJson(res.token)
  }),
)

export const tokenListPick = O(
  map(async (tokenList: number[]) => {
    const newLocal = `
{
  ${tokenList
    .map(
      (id) => `
_${id}: token(id: "${hexValue(id)}") {
  id
  labItems {
    id
  }
}
  `,
    )
    .join('')}
}
`
    const res = await querySubgraph(newLocal)
    const rawList: IToken[] = Object.values(res)

    return rawList.map((token) => tokenJson(token))
  }),
)

export const profilePickList = O(map(getProfilePickList))

async function getProfilePickList(idList: string[]): Promise<IOwner[]> {
  if (idList.length === 0) {
    return []
  }

  const doc = `
{
  ${idList
    .map(
      (id) => `
_${id}: owner(id: "${id}") {
    id
    ownedLabItems {
      balance
      item {
        id
      }
      id
    }
    ownedTokens {
      id
      labItems {
        id
      }
    }
    profile {
      id
      labItems {
        id
      }
    }

}
  `,
    )
    .join('')}
}
`
  const res = await querySubgraph(doc)
  const rawList: IOwner[] = Object.values(res)

  return rawList.filter((x) => x !== null).map((token) => ownerJson(token))
}

function labItemJson(obj: ILabItem): ILabItem {
  return {
    ...obj,
  }
}

function tokenJson(obj: IToken): IToken {
  return {
    ...obj,
    id: Number(obj.id),
    labItems: obj.labItems.map(labItemJson),
    owner: obj.owner ? ownerJson(obj.owner) : obj.owner,
  }
}

function ownerJson(obj: IOwner): IOwner {
  const ownedTokens = obj.ownedTokens.map((t) => tokenJson(t))

  const newLocal = obj.ownedLabItems.map((json): ILabItemOwnership => {
    return {
      ...json,
      balance: BigInt(json.balance),
      item: { ...json.item, id: Number(json.id) },
    }
  })

  return {
    ...obj,
    ownedLabItems: newLocal,
    ownedTokens,
    profile: obj.profile ? tokenJson(obj.profile) : null,
  }
}

export async function getCompetitionTrades(
  queryParams: IRequestPageApi & { referralCode: string },
) {
  const newLocal = intervalTimeMap.HR24 * 3
  const competitionAccountListQuery = fetchHistoricTrades(
    { ...queryParams, offset: 0, pageSize: 1000 },
    async (params) => {
      const res = await subgraphChainMap[queryParams.chain](
        gql(`

query {
  trades(first: 1000, skip: ${params.offset}, where: { entryReferralCode: "${queryParams.referralCode}", timestamp_gte: ${params.from}, timestamp_lt: ${params.to}}) {
  # trades(first: 1000, skip: ${params.offset}, where: { timestamp_gte: ${params.from}, timestamp_lt: ${params.to}}) {
      ${tradeFields}
      entryReferralCode
      entryReferrer
  }
}
`),
        {},
      )

      return res.trades as ITrade[]
    },
    newLocal,
  )

  const historicTradeList = await competitionAccountListQuery
  const tradeList: ITrade[] = historicTradeList.map(fromJson.tradeJson)
  return tradeList
}
