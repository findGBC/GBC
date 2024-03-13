
import { Animate } from '../../components/atoms'
import PageTitle from '../../components/atoms/Title/PageTitle'
import { Articles } from '../../components/organism'
import { useI18nContext } from '../../i18n/i18n-react'
import useBlog from '../../hooks/useBlog'

const Blog = () => {
  const { LL } = useI18nContext()
  const { articles, isLoading } = useBlog()

  if (isLoading && articles == null) return <div>Loading...</div>

  return (
    <div className="layout small thin my-6">
      <section>
        <Animate>
          <div>
            <PageTitle value={LL.BLOG.TITLE()} />
            <Articles
                articles={articles}
              />
          </div>
        </Animate>
      </section>
    </div>
  )
}

export default Blog
