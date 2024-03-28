import { disconnect } from '@wagmi/core'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { useAccount } from 'wagmi'

import disconnectIcon from '../../../assets/img/icons/disconnect_icon.svg'
import profileIcon from '../../../assets/img/icons/profile_icon.svg'
import settingIcon from '../../../assets/img/icons/settings_icon.svg'
import useOutsideClick from '../../../hooks/useOutsideClick'
import DisplayDefaultBerry from '../DisplayDefaultBerry/DisplayDefaultBerry'
import DisplayName from '../DisplayName/DisplayName'

type WalletButtonProps = {
  address: string
  ensName: string | undefined
}

const WalletButton = ({ address }: WalletButtonProps) => {
  const account = useAccount()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick(dropdownRef, () => setIsOpen(false))

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <div className="dropdown dropdown-end dropdown-open" ref={dropdownRef}>
      <div
        className="m-1"
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        aria-hidden="true"
      >
        <div className="flex gap-2">
          <div className="md:w-14">
            <DisplayDefaultBerry address={address} classes="w-11 rounded-xl"></DisplayDefaultBerry>
          </div>
          <div className="w-full hidden md:block">
            <div className="font-bold justify-start">
              <DisplayName address={address} />
            </div>
            <div className="font-light text-xs justify-start text-neutral">My account</div>
          </div>
        </div>
      </div>
      <ul
        className={
          'p-2 shadow menu dropdown-content z-1 bg-base-200 rounded-xl w-52 ' +
          (isOpen ? '' : 'hidden')
        }
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        <li>
          <Link to={`/profile/${account.address}`}>
            <ReactSVG src={profileIcon} />
            My profile
          </Link>
        </li>
        <li>
          <Link to="/settings">
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
          <button onClick={async () => await disconnect()}>
            <ReactSVG src={disconnectIcon} />
            Disconnect
          </button>
        </li>
      </ul>
    </div>
  )
}

export default WalletButton
