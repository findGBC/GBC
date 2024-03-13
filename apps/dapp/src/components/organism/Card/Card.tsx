import { ArrowRightIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'

import { isValidUrl } from '../../../global/helpers'
import type { CardProps } from '../../../global/type'
import { useI18nContext } from '../../../i18n/i18n-react'
import CardContainer from '../CardContainer/CardContainer'

const Card = ({ children, img, title, route }: CardProps) => {
  const { LL } = useI18nContext()

  return (
    <>
      <div className="md:w-1/3">
        <Link to={route} target={isValidUrl(route) ? '_blank' : undefined}>
          <CardContainer>
            <figure className="px-5 pt-5">
              <img src={img} alt={title} className="rounded-xl max-h-[13rem]" />
            </figure>
            <div className="card-body">
              <h2 className="card-title md:truncate text-secondary-content items-start">{title}</h2>
              <div className="text-base-content h-20">{children}</div>
              <div className="card-actions mt-4">
                <div className="flex space-x-4 font-bold">
                  <h2>{LL.SHARED.DISCOVER()}</h2>
                  <ArrowRightIcon width={10}></ArrowRightIcon>
                </div>
              </div>
            </div>
          </CardContainer>
        </Link>
      </div>
    </>
  )
}

export default Card
