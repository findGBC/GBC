import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import SanityClient from '../../app/providers/sanityClient'
import { Post } from '../../components/organism'
import type { PostProps } from '../../global/type'

const BlogPost = () => {
  const { slug } = useParams()
  const { data: articles, isLoading } = useQuery({
    enabled: slug != null,
    queryFn: () =>
      SanityClient.fetch(
        `*[_type == "post" && slug.current == "${slug}"]`
      ).then((data) => {
        return data.map((article: any) => {
          return {
            body: article.body,
            mainImage: article.mainImage.asset._ref,
            pubDate: article._createdAt,
            title: article.title,
          } as PostProps
        })
      }),
    queryKey: ['posts', slug],
  })

  if (isLoading && articles == null) {
    return <div>Loading...</div>
  }

  return (
    <div className="layout blog md:px-auto px-5">
      <Post {...articles[0]} />
    </div>
  )
}

export default BlogPost
