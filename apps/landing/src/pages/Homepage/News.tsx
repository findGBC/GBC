import { Animate, Title, Button } from '../../components/atoms'
import { Articles } from '../../components/organism'
import { ButtonType } from '../../global/enum'
import useBlog from '../../hooks/useBlog'
import { useI18nContext } from '../../i18n/i18n-react'

const News: React.FC = () => {
  const { LL } = useI18nContext()
  const { articles, isLoading } = useBlog()

  if (isLoading && articles == null) return <div>Loading...</div>

  return (
    <Animate initiallyVisible={false}>
      <section className="thin">
        <Title value={LL.BLOG.TITLE()} />
        <Articles articles={articles.slice(0, 3)} />
        <div className="items-center mt-8 text-center">
          <Button
            btnType={ButtonType.Primary}
            className="w-[10rem]"
            url="/blog"
          >
            {LL.NEWS.READ()}
          </Button>
        </div>
      </section>
    </Animate>
  )
}

export default News
