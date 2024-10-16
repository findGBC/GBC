import { Link } from 'react-router-dom'

import Logo from '../../../assets/img/logo.png'
import { Constants } from '../../../global/constant'
import { ButtonType } from '../../../global/enum'
import { useI18nContext } from '../../../i18n/i18n-react'
import { Button } from '../../atoms'

const Footer = () => {
  const { LL } = useI18nContext()

  const svgClasses = 'h-8 text-base-content fill-current'
  return (
    <>
      <footer className="footer footer-center bg-base-100 h-30 md:grid md:grid-cols-3 border-base-200 p-4 border-t">
        <div className="md:place-self-center md:justify-self-start">
          <Link to={'/'}>
            <img src={Logo} alt="GBC" className="md:ml-12 w-10"></img>
          </Link>
        </div>
        <div className="md:place-self-center md:justify-self-center block">
          <Button btnType={ButtonType.Ghost} url="/ecosystem">
            {LL.SHARED.ECOSYSTEM()}
          </Button>
          <Button btnType={ButtonType.Ghost} url={Constants.URL.GBC_DOC}>
            {LL.SHARED.DOCUMENTATION()}
          </Button>
        </div>
        <div className="md:mr-12 md:place-self-center md:justify-self-end grid grid-flow-col gap-4">
          {/* <Link to="https://docs.blueberry.club/" target="_blank">
            <svg
              className={svgClasses}
              viewBox="0 0 32 32"
              fill="inherit"
              width={20}
            >
              <path d="M14.502 23.341c.484 0 .878.4.878.893a.886.886 0 01-.878.893.886.886 0 01-.877-.893c0-.492.393-.893.877-.893zm13.78-5.532a.886.886 0 01-.877-.892c0-.493.394-.894.878-.894.483 0 .877.401.877.894a.886.886 0 01-.877.892zm0-3.658c-1.498 0-2.717 1.24-2.717 2.766 0 .296.049.592.144.88l-8.976 4.863a2.693 2.693 0 00-2.231-1.192c-1.036 0-1.98.604-2.437 1.547l-8.064-4.328c-.852-.456-1.49-1.884-1.422-3.184.035-.678.265-1.204.615-1.408.223-.128.49-.117.775.034l.054.03c2.136 1.145 9.13 4.894 9.424 5.033.455.214.707.301 1.481-.072l14.457-7.653c.211-.081.459-.288.459-.601 0-.436-.443-.607-.444-.607-.822-.402-2.086-1.004-3.319-1.591-2.634-1.256-5.62-2.679-6.932-3.378-1.132-.603-2.044-.095-2.206.008l-.316.16c-5.902 2.97-13.802 6.952-14.251 7.23-.806.499-1.304 1.492-1.369 2.726-.1 1.955.88 3.994 2.28 4.742l8.528 4.476C12.007 25.986 13.152 27 14.502 27c1.485 0 2.695-1.218 2.717-2.724l9.392-5.18a2.69 2.69 0 001.672.586c1.498 0 2.717-1.24 2.717-2.765 0-1.526-1.22-2.766-2.717-2.766z"></path>
            </svg>
          </Link> */}
          <Button
            url={Constants.URL.DISCORD}
            btnType={ButtonType.Ghost}
            border={true}
          >
            <svg
              className={svgClasses}
              viewBox="0 0 32 32"
              fill="inherit"
              width={20}
            >
              <path d="M27.605 7.728A12.798 12.798 0 0020.3 5l-.359.418a17.08 17.08 0 016.472 3.291 22.112 22.112 0 00-19.415-.75c-.836.39-1.386.68-1.501.736a17.699 17.699 0 016.806-3.392L12.05 5a12.793 12.793 0 00-7.295 2.728A34.726 34.726 0 001 22.87a9.418 9.418 0 007.925 3.956s.968-1.17 1.748-2.166a8.08 8.08 0 01-4.548-3.06c.376.26 1.01.62 1.055.65a18.93 18.93 0 0016.224.909c1.05-.396 2.053-.91 2.988-1.53a8.29 8.29 0 01-4.705 3.09c.78.981 1.717 2.107 1.717 2.107a9.497 9.497 0 007.94-3.956 34.51 34.51 0 00-3.74-15.142v-.001zm-13.641 9.846a2.754 2.754 0 01-2.643 2.887 2.895 2.895 0 010-5.774h.043a2.739 2.739 0 012.6 2.728v.159zm6.609 2.424a2.661 2.661 0 01.23-5.311 2.755 2.755 0 012.642 2.887 2.647 2.647 0 01-2.872 2.424z"></path>
            </svg>
          </Button>
          <Button
            url={Constants.URL.TWITTER}
            btnType={ButtonType.Ghost}
            border={true}
          >
            <svg
              className={svgClasses}
              viewBox="0 0 24 24"
              fill="inherit"
              width={20}
            >
              <path d="M23 5.129a8.85 8.85 0 01-2.59.714 4.565 4.565 0 001.984-2.514c-.872.52-1.838.9-2.865 1.103A4.498 4.498 0 0016.234 3c-2.492 0-4.511 2.034-4.511 4.543 0 .355.039.701.116 1.034-3.75-.19-7.076-1.999-9.301-4.75a4.57 4.57 0 00-.61 2.284c0 1.575.795 2.968 2.006 3.782a4.493 4.493 0 01-2.045-.567v.056a4.537 4.537 0 003.622 4.457 4.488 4.488 0 01-2.04.078c.575 1.804 2.242 3.12 4.214 3.159A9.01 9.01 0 011 18.958 12.699 12.699 0 007.92 21c8.3 0 12.842-6.927 12.842-12.933 0-.2-.005-.394-.013-.589A9.119 9.119 0 0023 5.128z"></path>
            </svg>
          </Button>
          <Button
            url={Constants.URL.INSTAGRAM}
            btnType={ButtonType.Ghost}
            border={true}
          >
            <svg
              className={svgClasses}
              viewBox="0 0 32 32"
              fill="inherit"
              width={20}
            >
              <path d="M20.8 16a4.8 4.8 0 11-9.6 0 4.8 4.8 0 019.6 0zM31 9.4v13.2a8.41 8.41 0 01-8.4 8.4H9.4A8.41 8.41 0 011 22.6V9.4A8.41 8.41 0 019.4 1h13.2A8.41 8.41 0 0131 9.4zM23.2 16a7.2 7.2 0 10-7.2 7.2 7.208 7.208 0 007.2-7.2zm2.4-7.8a1.8 1.8 0 10-3.6 0 1.8 1.8 0 003.6 0z"></path>
            </svg>
          </Button>
          {/* <Link to="https://github.com/nissoh/blueberry-club" target="_blank">
            <svg
              className={svgClasses}
              viewBox="0 0 32 32"
              fill="inherit"
              width={20}
            >
              <path d="M22.278 30.963c-.475-.126-.657-.556-.657-.937 0-.64.02-2.742.02-5.349 0-1.82-.606-3.01-1.284-3.616C24.576 20.58 29 18.929 29 11.44c0-2.128-.733-3.873-1.946-5.235.192-.492.845-2.473-.189-5.16 0 0-1.586-.525-5.202 2.002a17.661 17.661 0 00-4.738-.66c-1.612.008-3.231.223-4.738.66C8.571.524 6.98 1.045 6.98 1.045c-1.03 2.687-.38 4.668-.184 5.16C5.586 7.567 4.85 9.308 4.85 11.44c0 7.472 4.42 9.146 8.622 9.638-.54.487-1.03 1.345-1.201 2.607-1.08.496-3.822 1.358-5.508-1.623 0 0-1-1.872-2.901-2.01 0 0-1.85-.026-.13 1.185 0 0 1.243.598 2.101 2.851 0 0 1.114 3.793 6.38 2.616.007 1.627.024 2.855.024 3.317 0 .386-.19.818-.68.938l10.721.004z"></path>
            </svg>
          </Link> */}
        </div>
      </footer>
    </>
  )
}

export default Footer
