import { MenuIcon, XIcon } from '@heroicons/react/outline'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { ButtonType } from '../../../global/enum'
import { isValidUrl } from '../../../global/helpers'
import type { NavigationItem } from '../../../global/type'
import useOutsideClick from '../../../hooks/useOutsideClick'
import { Button } from '../../atoms'
import { Logo, NavItem, Search } from '../../mollecules'
// eslint-disable-next-line import/no-named-as-default
import WalletConnect from '../WalletConnect/WalletConnect'

import NotificationButton from './Buttons/NotificationButton'
import SearchButton from './Buttons/SearchButton'

function navItems(navigation: NavigationItem[], isMobile = false) {
  return navigation?.map((item: NavigationItem) => {
    return item.hrefs && item.hrefs.length > 0 ? (
      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" className="peer" />
        <div className="rounded-t-xl leading-0 collapse-title !min-h-0 bg-base-100 peer-checked:bg-base-300 peer-checked:text-secondary-content">
          <div className="flex flex-row">
            <img src={item.url} alt={item.name} className="w-4 mr-4 ml-1 mt-1"></img>
            <div className="font-semibold mt-1">{item.name}</div>
            <div></div>
          </div>
        </div>
        <div className="collapse-content flex flex-col bg-base-100 text-primary-content peer-checked:bg-base-300 peer-checked:text-secondary-content">
          {item.hrefs.map((sublink) => {
            if (sublink.href) {
              return (
                <Link
                  to={sublink.href}
                  target={isValidUrl(sublink.href) ? '_blank' : '_self'}
                  className="pl-9 my-1"
                >
                  {sublink.name}
                </Link>
              )
            } else {
              return <div className="pl-9 my-1 hover:cursor-wait">{sublink.name}</div>
            }
          })}
        </div>
      </div>
    ) : (
      <NavItem name={item.name} href={item.href} url={item.url} isMobile={isMobile} key={item.name}>
        {item.name}
      </NavItem>
    )
  })
}

function PrimaryNavbar() {
  return (
    <div className="flex">
      <Logo></Logo>
    </div>
  )
}

const SecondaryNavbar = () => {
  return (
    <div className="md:flex md:mr-12 items-center hidden space-x-3">
      <Search isMobile={false}></Search>
      <NotificationButton />
      <WalletConnect />
    </div>
  )
}

type MobileMenuButtonProps = {
  onMenuClick: VoidFunction
  onSearchClick: VoidFunction
  isMenuOpen: boolean
  isSearchBarOpen: boolean
}

function MobileMenuButton({
  onMenuClick,
  onSearchClick,
  isMenuOpen,
  isSearchBarOpen,
}: MobileMenuButtonProps) {
  const location = useLocation()

  useEffect(() => {
    if (isMenuOpen) {
      onMenuClick()
    }

    if (isSearchBarOpen) {
      onSearchClick()
    }
  }, [location])

  return (
    <div className="md:hidden flex items-center gap-2">
      <SearchButton isOpen={isSearchBarOpen} onClick={onSearchClick}></SearchButton>
      <NotificationButton />
      <WalletConnect />
      <Button
        btnType={ButtonType.Ghost}
        className="mobile-menu-button outline-none px-3 md:px-4"
        onClick={onMenuClick}
        border={isMenuOpen}
      >
        {isMenuOpen ? (
          <XIcon width={25} className="text-base-content"></XIcon>
        ) : (
          <MenuIcon width={25} className="text-base-content hover:text-accent"></MenuIcon>
        )}
      </Button>
    </div>
  )
}
type MobileMenuProps = {
  isOpen: boolean
  navigation: NavigationItem[]
}

function MobileSearchBar({ isOpen }: MobileMenuProps) {
  return (
    <div
      className={
        isOpen
          ? 'mobile-menu w-full bg-base-300 border-b-2 rounded-b-xl shadow-2xl border-base-100'
          : 'hidden mobile-menu'
      }
    >
      <div className="p-5">
        <Search isMobile={true}></Search>
      </div>
    </div>
  )
}

function MobileMenu({ isOpen, navigation }: MobileMenuProps) {
  return (
    <div
      className={
        isOpen
          ? 'mobile-menu flex flex-nowrap bg-base-300 border-b-2  shadow-2xl border-base-100'
          : 'hidden mobile-menu'
      }
    >
      <div className="p-5">
        <div className="flex flex-wrap content-around gap-3">{navItems(navigation, true)}</div>
      </div>
    </div>
  )
}
type NavContainerProps = {
  children: ReactNode
  isMenuOpen: boolean
  isSearchBarOpen: boolean
  navigation: NavigationItem[]
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function NavContainer({
  children,
  isMenuOpen,
  isSearchBarOpen,
  navigation,
  setIsMenuOpen,
  setSearchBarOpen,
}: NavContainerProps) {
  const navRef = useRef<HTMLDivElement>(null)
  useOutsideClick(navRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
    if (isSearchBarOpen) {
      setSearchBarOpen(false)
    }
  })

  return (
    <nav ref={navRef} className="bg-base-300 justify-self-center fixed w-full top-0 z-30">
      <div className="px-4 border-b-2 border-base-200">
        <div className="flex justify-between h-20">{children}</div>
      </div>

      <MobileMenu isOpen={isMenuOpen} navigation={navigation} />
      <MobileSearchBar isOpen={isSearchBarOpen} navigation={navigation} />
    </nav>
  )
}

type NavBarProps = {
  navigation: NavigationItem[]
}

const NavBar = ({ navigation }: NavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isSearchBarOpen, setSearchBarOpen] = useState<boolean>(false)

  return (
    <NavContainer
      isMenuOpen={isMenuOpen}
      isSearchBarOpen={isSearchBarOpen}
      navigation={navigation}
      setIsMenuOpen={setIsMenuOpen}
      setSearchBarOpen={setSearchBarOpen}
    >
      <PrimaryNavbar />
      <SecondaryNavbar />
      <MobileMenuButton
        onMenuClick={() => {
          setIsMenuOpen(!isMenuOpen)
          if (isSearchBarOpen) {
            setSearchBarOpen(false)
          }
        }}
        onSearchClick={() => {
          setSearchBarOpen(!isSearchBarOpen)
          if (isMenuOpen) {
            setIsMenuOpen(false)
          }
        }}
        isMenuOpen={isMenuOpen}
        isSearchBarOpen={isSearchBarOpen}
      />
    </NavContainer>
  )
}

export default NavBar
