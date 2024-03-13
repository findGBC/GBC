import type { CardContainerProps } from '../../../global/type'

const CardContainer = ({ children, className = '' }: CardContainerProps) => {
  return (
    <div
      className={`card bg-base-200 md:mr-5 sm:hover:bg-base-300 transition mt-5 border border-base-100 sm:hover:border-base-200 
         ${className}`}
    >
      {children}
    </div>
  )
}

export default CardContainer
