import React from 'react'

import type { IBerryDisplayTupleMap } from '../../../global/middleware'
import { berryPartsToSvg } from '../../../global/middleware'

type AvatarProps = {
  selectSvgKey: Partial<IBerryDisplayTupleMap>
  svgTitle?: string
  classes?: string | undefined
}

const Avatar: React.FC<AvatarProps> = ({ selectSvgKey, svgTitle, classes }) => {
  const getSvgForCategory = () => {
    return selectSvgKey ? (
      <g
        dangerouslySetInnerHTML={{
          __html: berryPartsToSvg(selectSvgKey),
        }}
      />
    ) : null
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMin meet"
      fill="none"
      className={classes}
      viewBox="0 0 1500 1500"
      aria-label={svgTitle}
    >
      {getSvgForCategory()}
    </svg>
  )
}

export default Avatar
