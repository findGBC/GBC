import { Link } from 'react-router-dom'

const Logo = (logoUrl: string) => {
  return (
    <Link to={'/'}>
      <img
        src={logoUrl}
        className="App-logo md:ml-12 w-8 mx-5 mt-6"
        alt="logo"
      />
    </Link>
  )
}

export default Logo
