import type { ClientOptions, OperationContext, TypedDocumentNode } from '@urql/core'
import { createClient, gql, cacheExchange, fetchExchange } from '@urql/core'

import { fromJson, type IRequestPageApi, type ITrade } from '../gmx-middleware'
import { fetchHistoricTrades, subgraphChainMap } from '../gmx-middleware/graph'

import type { ILabItem, ILabItemOwnership, IOwner, IToken } from './types'
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

export const blueberrySubgraph = (v2: boolean = false) =>
  createSubgraphClient({
    exchanges: [cacheExchange, fetchExchange],
    fetch: fetch,
    url: v2
      ? 'https://api.studio.thegraph.com/proxy/67817/findgbc/v0.0.3'
      : 'https://api.thegraph.com/subgraphs/name/nissoh/blueberry-club-arbitrum',
  })

export async function querySubgraph(document: string, v2: boolean): Promise<any> {
  const subgraph = blueberrySubgraph(v2)
  return subgraph(gql(document) as any, {})
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
  const tradeFields = ''
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
