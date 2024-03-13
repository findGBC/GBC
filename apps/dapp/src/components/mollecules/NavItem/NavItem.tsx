import { useLocation } from 'react-router-dom'

import { ButtonType } from '../../../global/enum'
import type { INavItemProps } from '../../../global/type'
import { Button } from '../../atoms'

const NavItem = ({ children, href, name, url, iconOnly }: INavItemProps) => {
  const location = useLocation()
  const disabled = href?.length === 0

  return (
    <div className="w-full" key={name}>
      <Button
        btnType={href == location.pathname ? ButtonType.Accent : ButtonType.Ghost}
        url={href}
        className={
          'justify-start w-full px-auto z-10 ' + (disabled ? ' opacity-50 cursor-wait' : '')
        }
        linkClasses="w-full"
      >
        {url ? (
          <div>
            <img src={url} alt={name} className="w-5 md:mr-2"></img>
          </div>
        ) : (
          <></>
        )}
        {iconOnly ? null : <div>{children}</div>}
      </Button>
    </div>
  )
}

export default NavItem
