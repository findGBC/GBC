import type { FunctionComponent } from 'react'

import type { PageTitleProps } from '../../../global/type'

const PageTitle: FunctionComponent<PageTitleProps> = (props: PageTitleProps) => {
  return <h1 className="text-secondary-content mb-6 text-6xl font-bold">{props.value}</h1>
}
export default PageTitle
