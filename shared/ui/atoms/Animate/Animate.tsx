import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

export type AnimateProps = {
  children: any
  initiallyVisible?: boolean | undefined
}

export const Animate = ({ children, initiallyVisible }: AnimateProps) => {
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
