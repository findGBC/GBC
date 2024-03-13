import React from 'react'
import { ReactSVG } from 'react-svg'

import { ButtonType } from '../../../global/enum'
import type { ICategoryIcon } from '../../../global/type'
import { Button } from '../../atoms'

type INavItemCategoryLabProps = {
  onClick: (category: number) => void
  selectedCategory: number
  categoriesIcons: ICategoryIcon[]
  selectClassName?: string
}

export default function NavItemCategoryLab({
  selectedCategory,
  onClick,
  categoriesIcons,
}: INavItemCategoryLabProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categoriesIcons.map((item) => (
        <Button
          key={item.id}
          btnType={ButtonType.Ghost}
          className={`px-0 h-full rounded-xl ${
            selectedCategory === item.category ? 'selected border border-secondary-content ' : ''
          }`}
          disabled={item.category === undefined}
          onClick={() => onClick && onClick(item.category)}
        >
          <ReactSVG src={item.src} className="" />
        </Button>
      ))}
    </div>
  )
}
