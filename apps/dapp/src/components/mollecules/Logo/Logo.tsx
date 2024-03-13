import { Link } from 'react-router-dom'

import LogoIcon from '../../../assets/img/logo.png'
const Logo = () => {
  return (
    <Link to={'/'}>
      <img
        src={LogoIcon}
        className="App-logo md:ml-12 w-8 mx-5 mt-6"
        alt="logo"
      />
    </Link>
  )
}

export default Logo
