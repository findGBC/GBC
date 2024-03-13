import type { FunctionComponent } from 'react'

import type { TitleProps } from '../../../global/type'

const Title: FunctionComponent<TitleProps> = (props: TitleProps) => {
  return (
    <h1 className="text-secondary-content mb-6 text-4xl font-bold">
      {props.value}
    </h1>
  )
}
export default Title
