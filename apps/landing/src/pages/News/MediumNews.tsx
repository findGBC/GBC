import React from 'react'

import PageTitle from '../../components/atoms/Title/PageTitle'
import { Articles } from '../../components/organism'
import useMediumArticles from '../../hooks/useMediumArticles'
import { useI18nContext } from '../../i18n/i18n-react'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const MediumNews: React.FC = () => {
  const { LL } = useI18nContext()
  const { articles, isLoading } = useMediumArticles()

  useDocumentTitle(LL.NEWS.TITLE())
  
  if (isLoading && articles == null) return <div>Loading...</div>

  return (
    <>
      <div className="layout thin mb-40">
        <PageTitle value={LL.NEWS.TITLE()} />
        <Articles articles={articles} />
      </div>
    </>
  )
}
export default MediumNews
