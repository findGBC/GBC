import { ArrowRightIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

import type { ButtonType } from '../../../global/enum'
import { isValidUrl } from '../../../global/helpers'
import { useI18nContext } from '../../../i18n/i18n-react'
import { Button } from '../../atoms'

type AppItemProps = {
  img: string
  children: any
  title: string
  classNames: string
  route: string
  btnType: ButtonType
  btnText?: string
}

const AppItem = ({
  children,
  img,
  title,
  classNames,
  btnType,
  route,
  btnText,
}: AppItemProps) => {
  const { LL } = useI18nContext()
  return (
    <div className="md:w-1/2">
      <Link to={route} target={isValidUrl(route) ? '_blank' : undefined}>
        <div className={`card shadow-xl m-5 ${classNames}`}>
          <div className="card-body">
            <h2 className="card-title text-2xl md:min-h-[4rem]">{title}</h2>
            <div className=" md:min-h-[7rem]">{children}</div>
            <Button btnType={btnType} className="w-max flex space-x-4">
              <div>{btnText ?? LL.SHARED.LAUNCH_APP()}</div>
              <ArrowRightIcon width={10}></ArrowRightIcon>
            </Button>
          </div>
          <figure className="px-5">
            <img src={img} alt={title} className="rounded-t-xl max-h-[20rem]" />
          </figure>
        </div>
      </Link>
    </div>
  )
}

export default AppItem
