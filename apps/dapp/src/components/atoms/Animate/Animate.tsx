import ScrollAnimation from 'react-animate-on-scroll'

import type { AnimateProps } from '../../../global/type'

const Animate = ({ children }: AnimateProps) => {
  return (
    <ScrollAnimation
      animateIn="fadeIn"
      duration={1}
      initiallyVisible={true}
      animateOnce={true}
      delay={3}
    >
      {children}
    </ScrollAnimation>
  )
}

export default Animate
