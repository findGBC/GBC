/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom'

import { ButtonType } from '../../../global/enum'
import { isValidUrl } from '../../../global/helpers'
import type { IButtonProps } from '../../../global/type'

const buttonApperanceType = {
  accent: 'bg-accent',
  error: 'btn-error',
  ghost: 'bg-base-100',
  link: 'btn-link',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  success: 'btn-success',
}

const Button = ({
  children,
  className = '',
  linkClasses = '',
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

  buttonClasses.push('rounded-xl')
  buttonClasses.push('capitalize')

  // buttonClasses.push('ease-in-out')
  buttonClasses.push('transition')
  buttonClasses.push('duration-300')

  buttonClasses.push('hover:bg-accent-focus')
  buttonClasses.push('hover:text-base-content')

  if (border) {
    buttonClasses.push('border hover:border-base-content border-neutral')
  }

  buttonClasses = buttonClasses.join(' ')

  return (
    <>
      {url?.length > 0 ? (
        <Link to={url} target={isValidUrl(url) ? '_blank' : undefined} className={linkClasses}>
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
