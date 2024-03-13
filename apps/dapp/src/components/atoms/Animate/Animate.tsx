import ScrollAnimation from 'react-animate-on-scroll'

import type { AnimateProps } from '../../../global/type'

const Animate = ({ children, initiallyVisible }: AnimateProps) => {
  return (
    <ScrollAnimation
      animateIn="fadeIn"
      duration={2}
      delay={1}
      initiallyVisible={initiallyVisible?.valueOf()}
    >
      {children}
    </ScrollAnimation>
  )
}

export default Animate
