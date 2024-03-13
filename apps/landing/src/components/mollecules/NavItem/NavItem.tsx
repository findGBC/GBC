import { ButtonType } from '../../../global/enum'
import type { INavItemProps } from '../../../global/type'
import { Button } from '../../atoms'

export default function NavItem({ children, href, name, url }: INavItemProps) {
  const item = (
    <div className="flex-none" key={name}>
      <Button
        btnType={ButtonType.Ghost}
        border={true}
        url={href}
        className="md:mr-2"
      >
        {url ? (
          <div>
            <img src={url} alt={name} className="md:w-5 mr-1"></img>
          </div>
        ) : (
          <></>
        )}
        <div>{children}</div>
      </Button>
    </div>
  )
  return item
}
