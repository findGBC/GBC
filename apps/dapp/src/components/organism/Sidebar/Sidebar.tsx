/* eslint-disable prettier/prettier */
import { useState } from 'react'
import { Link } from 'react-router-dom'

import community from '../../../assets/img/nav/community.svg'
import socialX from '../../../assets/img/nav/socialX.svg'
import { isValidUrl } from '../../../global/helpers'
import type { NavigationItem } from '../../../global/type'
import { NavItem } from '../../mollecules'

type SidebarProps = {
  navigation: NavigationItem[]
}

function navItems(
  navigation: NavigationItem[],
  isOpen = false,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  return navigation?.map((item: NavigationItem, index: number) => (
    <>
      {item.hrefs && item.hrefs.length > 0 ? (
        <div className="collapse collapse-arrow bg-base-200">
          <input
            type="checkbox"
            className="peer"
            onClick={() =>
              setIsOpen((prev) => {
                if (isOpen) return prev
                return !prev
              })
            }
          />
          <div className="rounded-t-xl leading-0 collapse-title !min-h-0 bg-base-100 peer-checked:bg-base-300 peer-checked:text-secondary-content">
            <div className="flex flex-row">
              <img src={item.url} alt={item.name} className="w-4 mr-4 ml-1 mt-1"></img>
              {isOpen ? <div className="font-semibold mt-1">{item.name}</div> : null}
              <div></div>
            </div>
          </div>
          <div
            className={
              isOpen
                ? 'collapse-content flex flex-col bg-base-100 text-primary-content peer-checked:bg-base-300 peer-checked:text-secondary-content'
                : 'hidden'
            }
          >
            {item.hrefs.map((sublink) => {
              if (sublink.href){
                return (
                  <Link
                    to={sublink.href}
                    target={isValidUrl(sublink.href) ? '_blank' : '_self'}
                    className="pl-9 my-1"
                  >
                    {sublink.name}
                  </Link>
                )
              }else{
                return <div className="pl-9 my-1">{sublink.name}</div>
              }
            })}
          </div>
        </div>
      ) : (
        <div>
          <NavItem
            name={item.name}
            href={item.href}
            url={item.url}
            key={item.name}
            iconOnly={!isOpen}
          >
            {item.name}
          </NavItem>
          {index === 2 && <div className="divider my-2"></div>}
        </div>
      )}
    </>
  ))
}

const Sidebar = ({ navigation }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const sidebarClass = `hidden md:block fixed top-24 mx-4 p-4 rounded-xl bg-base-200 transition-all duration-300  h-5/6 ${
    isOpen ? 'w-[265px] isOpen ' : 'w-[86px] isClosed '
  }`

  return (
    <aside className={sidebarClass}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-40 -right-2 display top "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          className={`transition-transform duration-200 ${isOpen ? '' : 'transform rotate-180'}`}
        >
          <circle cx="11" cy="11" r="11" fill="#435361" />
          <path
            d="M12.4671 14.6666L8.80041 11L12.4671 7.33329"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="flex menu-vertical gap-2 h-full  relative">
        <div className="flex menu-vertical gap-2">{navItems(navigation, isOpen, setIsOpen)}</div>
        <div className="flex menu-vertical gap-2 h-full justify-end z-0">
          <NavItem
            name="Contact 1"
            href="/contact1"
            isMobile={false}
            url={socialX}
            iconOnly={!isOpen}
          >
            Follow us
          </NavItem>
          <NavItem
            name="Contact 2"
            href="/contact2"
            isMobile={false}
            url={community}
            iconOnly={!isOpen}
          >
            Join the community
          </NavItem>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
