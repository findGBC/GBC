import { disconnect } from '@wagmi/core'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import disconnectIcon from '../../../assets/img/icons/disconnect_icon.svg'
import profileIcon from '../../../assets/img/icons/profile_icon.svg'
import settingIcon from '../../../assets/img/icons/settings_icon.svg'
import { shortenAddress } from '../../../global/gmx-middleware/utils'
import DisplayBerry from '../DisplayBerry/DisplayBerry'

type WalletButtonProps = {
  address: string
  ensName: string | undefined
}

const WalletButton = ({ address, ensName }: WalletButtonProps) => {
  const disconnectAddress = async () => {
    await disconnect()
  }

  return (
    <div className="dropdown  dropdown-end">
      <div className="m-1" role="button" tabIndex="0">
        <div className="flex gap-2">
          <div className="w-14">
            <DisplayBerry address={address} classes="w-11 rounded-xl"></DisplayBerry>
          </div>
          <div className="w-full hidden md:block">
            <div className="font-bold justify-start">
              {ensName ? ensName.toLowerCase() : shortenAddress(address)}
            </div>
            <div className="font-light text-xs justify-start text-neutral">My account</div>
          </div>
        </div>
      </div>
      <ul className="p-2 shadow menu dropdown-content z-1 bg-base-200 rounded-xl w-52" tabIndex="0">
        <li>
          <Link to="/profile">
            <ReactSVG src={profileIcon} />
            My profile
          </Link>
        </li>
        <li>
          <Link to="/">
            <ReactSVG src={settingIcon} />
            Settings
          </Link>
        </li>
        {/* <li>
          <button onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
            <ReactSVG src={lightIcon} />
            {theme == 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </li> */}
        <li>
          <button onClick={disconnectAddress}>
            <ReactSVG src={disconnectIcon} />
            Disconnect
          </button>
        </li>
      </ul>
    </div>
  )
}

export default WalletButton
