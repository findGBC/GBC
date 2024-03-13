import SanityClient from '../app/providers/sanityClient'
import { Constants } from '../global/constant'
import { GetThumbnailUrl } from '../global/helpers'
import type { Article } from '../global/type'

import { useQuery } from '@tanstack/react-query'


const useBlog = () => {
    const { data: articles, isLoading } = useQuery({
        queryFn: () =>
          SanityClient.fetch('*[_type == "post"]{title, slug, mainImage, body, _createdAt}'),
        queryKey: ['posts'],
        select: (data) => {
            return data.map((article: any) => {
                return {
                    content: article.body,
                    description: article.body[0].children[0].text,
                    link: `/blog/${article.slug.current}`,
                    thumbnail: GetThumbnailUrl(article.mainImage.asset._ref),
                    title: article.title,
                    pubDate: article._createdAt,
                } as Article
            }).sort((a: Article, b: Article) => {
                return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
              })
            }
      })

  return { articles: articles as Article[], isLoading }
}

export default useBlog
