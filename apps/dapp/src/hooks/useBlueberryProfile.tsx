import { useQuery, useQueryClient } from '@tanstack/react-query'

import type { ILabItemOwnership, IOwner, IToken } from '../global/middleware'
import { querySubgraph } from '../global/middleware/graph'

const getProfile = async (address: string) => {
  const res = await querySubgraph(
    `
  {
    owner(id: "${address.toLowerCase()}") {
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
  `,
    false,
  )
  return res
}
const useBlueberryProfile = (address: string | `0x${string}`) => {
  const key = ['profile', address]
  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
    status,
    refetch: reload,
  } = useQuery({
    enabled: !!address,
    queryFn: async () => {
      return await getProfile(address.toLowerCase())
    },
    queryKey: ['profile', address],
  })

  const refetch = async () => {
    queryClient.invalidateQueries({ queryKey: key })
    await reload()
  }

  return {
    isLoading,
    ownedLabItems: data?.owner?.ownedLabItems as ILabItemOwnership[] | undefined,
    ownedTokens: data?.owner?.ownedTokens as IToken[] | undefined,
    owner: data as IOwner,
    refetch,
    status,
  }
}

export default useBlueberryProfile
