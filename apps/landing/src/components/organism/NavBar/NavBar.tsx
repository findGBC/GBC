import { MenuIcon, XIcon } from '@heroicons/react/outline'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import daoIcon from '../../../assets/img/nav/dao_icon.svg'
import docsIcon from '../../../assets/img/nav/doc_icon.svg'
import forumIcom from '../../../assets/img/nav/forum_icon.svg'
import ecosystemIcon from '../../../assets/img/nav/GBC_icon.svg'
import newsIcon from '../../../assets/img/nav/hub_icon.svg'
import clubIcon from '../../../assets/img/nav/opensea_icon.svg'
import { Constants } from '../../../global/constant'
import { ButtonType } from '../../../global/enum'
import { Button } from '../../atoms'
import { LightToggle, Logo, NavItem } from '../../mollecules'
import TreasuryButton from '../TreasuryButton/TreasuryButton'

const navigation = [
  { href: '/ecosystem', name: 'GBC Hub', url: ecosystemIcon },
  { href: '/dao', name: 'Dao', url: daoIcon },
  { href: Constants.URL.GBC_FORUM, name: 'Forum', url: forumIcom },
  { href: Constants.URL.GBC_DOC, name: 'Docs', url: docsIcon },
  {
    href: '/blog',
    name: 'Blog',
    url: newsIcon,
  },
  {
    href: Constants.URL.GBC_OPENSEA,
    name: 'Join the club',
    url: clubIcon,
  },
 
]

function navItems(isMobile = false) {
  return navigation.map((item) => (
    <NavItem
      name={item.name}
      href={item.href}
      isMobile={isMobile}
      url={item.url}
      key={item.name}
    >
      {item.name}
    </NavItem>
  ))
}

function PrimaryNavbar() {
  return (
    <div className="flex">
      <Logo></Logo>
      <div className="md:flex items-center hidden space-x-1">{navItems()}</div>
    </div>
  )
}

type LaunchAppProps = {
  className?: string | undefined
}

const LaunchApp = ({ className }: LaunchAppProps) => {
  return (
    <Button
      btnType={ButtonType.Primary}
      className={className}
      url={Constants.URL.GBC_LAB}
    >
      Launch app
    </Button>
  )
}

export function SecondaryNavbar() {
  return (
    <div className="md:flex md:mr-12 items-center hidden space-x-3">
      <TreasuryButton></TreasuryButton>
      <LaunchApp />
      <LightToggle />
    </div>
  )
}

type MobileMenuButtonProps = {
  onClick: VoidFunction
  isMenuOpen: boolean
}

function MobileMenuButton({ onClick, isMenuOpen }: MobileMenuButtonProps) {
  const location = useLocation()

  useEffect(() => {
    if (isMenuOpen) {
      onClick()
    }
  }, [location])

  return (
    <div className="md:hidden flex items-center">
      <div>
        <LightToggle />
      </div>
      <div className="md:ml-auto ml-3">
        <TreasuryButton></TreasuryButton>
      </div>
      <Button
        btnType={ButtonType.Ghost}
        className="mobile-menu-button ml-3 outline-none"
        onClick={onClick}
        border={true}
      >
        {isMenuOpen ? (
          <XIcon width={25} className="text-accent hover:text-primary"></XIcon>
        ) : (
          <MenuIcon
            width={25}
            className="text-base-content hover:text-accent"
          ></MenuIcon>
        )}
      </Button>
    </div>
  )
}
type MobileMenuProps = {
  isOpen: boolean
}

function MobileMenu({ isOpen }: MobileMenuProps) {
  return (
    <div
      className={
        isOpen
          ? 'mobile-menu flex flex-nowrap bg-base-100 border-b-2 rounded-b-xl shadow-2xl border-base-100'
          : 'hidden mobile-menu'
      }
    >
      <div className="p-5">
        <div className="flex flex-wrap content-around gap-3">
          {navItems(true)}
          <NavItem
            key={'LaunchApp'}
            href={Constants.URL.GBC_LAB}
            isMobile={true}
            className="btn-primary text-primary-content"
            name={'LaunchApp'}
          >
            Launch App
          </NavItem>
        </div>
      </div>
    </div>
  )
}
type NavContainerProps = {
  children: ReactNode
  isMenuOpen: boolean
}

function NavContainer({ children, isMenuOpen }: NavContainerProps) {
  return (
    <nav className="bg-base-100 justify-self-center sticky w-full top-0 z-30">
      <div className="px-4">
        <div className="flex justify-between h-20">{children}</div>
      </div>

      <MobileMenu isOpen={isMenuOpen} />
    </nav>
  )
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <NavContainer isMenuOpen={isMenuOpen}>
      <PrimaryNavbar />
      <SecondaryNavbar />
      <MobileMenuButton
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
    </NavContainer>
  )
}
