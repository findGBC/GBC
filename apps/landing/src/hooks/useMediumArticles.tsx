import { useQuery } from '@tanstack/react-query'

import { Constants } from '../global/constant'
import type { Article } from '../global/type'

const useMediumArticles = () => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      fetch(Constants.URL.RSS.MEDIUM).then((res) => {
        return res.json()
      }),
    queryKey: ['articles'],
  })

  return { articles: data?.items as Article[], isLoading }
}

export default useMediumArticles
