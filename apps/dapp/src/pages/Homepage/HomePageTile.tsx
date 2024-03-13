import { Link } from 'react-router-dom'

import { isValidUrl } from '../../global/helpers'

type HomepageTileProps = {
  title: string
  href: string
  imageUrl: string
  text: string
}

const HomepageTile = ({ title, href, imageUrl, text }: HomepageTileProps) => {
  return (
    <Link
      to={href}
      target={isValidUrl(href) ? '_blank' : '_self'}
      className="card h-72 lg:w-1/2 rounded-xl image-full before:hidden grid duration-300 hover:cursor-pointer hover:filter hover:grayscale-[40%] "
    >
      <figure>
        <img src={imageUrl} alt={title} className="w-full" />
      </figure>

      <div className="card-body">
        <div className="absolute bottom-5 z-10 text-secondary-content">
          <h1 className="text-lg font-bold">{title}</h1>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </Link>
  )
}

export default HomepageTile
