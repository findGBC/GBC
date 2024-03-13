import React from 'react'

import Slider from '../../components/mollecules/Slider/Slider'

function GetBerriesImg() {
  const berries: string[] = []
  for (let b = 1; b < 42; b++) {
    berries.push(b.toString())
  }
  berries.sort(() => Math.random() - 0.5)
  return berries
}

const BerriesSlider: React.FC = () => {
  return (
    <>
      <Slider urls={GetBerriesImg()} reverse={false}></Slider>
      <Slider urls={GetBerriesImg()} reverse={true}></Slider>
      <Slider urls={GetBerriesImg()} reverse={false}></Slider>
    </>
  )
}
export default BerriesSlider
