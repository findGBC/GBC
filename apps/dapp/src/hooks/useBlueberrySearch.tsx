import { useQuery } from '@tanstack/react-query'

import { GBC_ADDRESS } from '../global/enum'
import { querySubgraph } from '../global/middleware/graph'
import type { ProfilesQueryResult } from '../global/type'

import { useProfile } from './useProfile'

const getProfilesByUserName = async (input: string) => {
  const res = await querySubgraph(
    `{
    profiles(where: { username_contains: "${input}" }) {
      id
      username
    }}
`,
    true,
  )
  return res
}

const useBlueberrySearch = (input: string | `0x${string}`) => {
  const key = ['search', input]
  const { currentProfile } = useProfile(input as `0x${string}`)

  const { data, isLoading } = useQuery({
    enabled: !!input,
    queryFn: async () => {
      if (input.startsWith('0x') && GBC_ADDRESS.ZERO.length === input.length) {
        return { profiles: [{ id: input, username: currentProfile?.username }] }
      } else {
        return await getProfilesByUserName(input)
      }
    },
    queryKey: key,
  })

  return {
    isLoading,
    profiles: data as ProfilesQueryResult,
  }
}

export default useBlueberrySearch
