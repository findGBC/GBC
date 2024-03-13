import { Link } from 'react-router-dom'

import { ButtonType } from '../../../global/enum'
import { isValidUrl } from '../../../global/helpers'
import type { IButtonProps } from '../../../global/type'

const buttonApperanceType = {
  accent: 'btn-accent',
  error: 'btn-error',
  ghost: 'btn-ghost',
  link: 'btn-link',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
}

const Button = ({
  children,
  className = '',
  btnType = ButtonType.Primary,
  url = '',
  border = false,
  ...props
}: IButtonProps) => {
  let buttonClasses: string[] | string = []
  if (btnType) buttonClasses.push(buttonApperanceType[btnType])

  if (btnType != ButtonType.Ghost) {
    buttonClasses.push('hover:border-base-content')
  }

  if (border) {
    buttonClasses.push('border hover:border-base-content border-base-200')
  }

  buttonClasses.push('rounded-[10px]')
  buttonClasses.push('capitalize')
  buttonClasses.push('hover:bg-base-100')
  buttonClasses.push('hover:text-base-content')
  buttonClasses.push('hover:scale-105')
  buttonClasses.push('ease-in-out')
  buttonClasses.push('transition')
  buttonClasses.push('duration-300')
  buttonClasses = buttonClasses.join(' ')

  return (
    <>
      {url?.length > 0 ? (
        <Link to={url} target={isValidUrl(url) ? '_blank' : undefined}>
          <button className={`btn ${buttonClasses}  ${className}`} {...props}>
            {children}
          </button>
        </Link>
      ) : (
        <button className={`btn ${buttonClasses}  ${className}`} {...props}>
          {children}
        </button>
      )}
    </>
  )
}

export default Button
