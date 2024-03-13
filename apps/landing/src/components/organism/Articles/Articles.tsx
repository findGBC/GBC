import { ArrowRightIcon } from '@heroicons/react/outline'
import moment from 'moment'
import { Link } from 'react-router-dom'

import type { ArticlesProps } from '../../../global/type'
import { useI18nContext } from '../../../i18n/i18n-react'
import CardContainer from '../CardContainer/CardContainer'

function getDescription(html: string) {
  const match = html.match(/<p>(.*?)<\/p>/)
  if (match) {
    return match[1].slice(0, 140)
  }else{
    return html
  }
}

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const { LL } = useI18nContext()
  return (
    <div className="flex flex-wrap">
      {articles ? (
        articles.map((article, index) => (
          <div className="md:w-1/3" key={index}>
            <Link to={article.link}>
              <CardContainer className="md:min-h-[25rem]">
                <figure className="px-5 pt-5">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body pb-0">
                  <h3 className="card-title md:truncate text-xs">
                    {moment(article.pubDate).fromNow()}
                  </h3>
                  <h2 className="card-title md:truncate">{article.title}</h2>
                  <div className="text-base-content md:h-16 text-sm">
                    {getDescription(article.description)}
                    ...
                  </div>
                  <div className="card-actions my-5">
                    <div className="text-xs">{LL.NEWS.READ()}</div>
                    <ArrowRightIcon width={10}></ArrowRightIcon>
                  </div>
                </div>
              </CardContainer>
            </Link>
          </div>
        ))
      ) : (
        <div className="my-20 text-center">{LL.NEWS.NONE()}</div>
      )}
    </div>
  )
}

export default Articles
