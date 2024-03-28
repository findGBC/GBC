import React from 'react'
import { ReactSVG } from 'react-svg'

import removeIcon from '../../../assets/img/icons/lab/nftItem/129.svg'
import { GetLabItemId, GetStoreItemList } from '../../../global/logic/labs'
import type { IBerryDisplayTupleMap, ILabItemOwnership } from '../../../global/middleware'
import { getLabItemTupleIndex, labAttributeTuple } from '../../../global/middleware'
import type { IGroupItem } from '../../../global/type'
import Avatar from '../Avatar/Avatar'

type AvatarItemsProps = {
  selectedGroup: IGroupItem
  selectedItem: {
    svgKey: Partial<IBerryDisplayTupleMap>
  }
  onSelectedItem: (svgKey: number, selectedGroup: number) => void
  setDefault: () => void
  ownedLabItems: ILabItemOwnership[]
  initialStackedLabItems: number[]
}

const AvatarItems: React.FC<AvatarItemsProps> = ({
  selectedGroup,
  selectedItem,
  onSelectedItem,
  setDefault,
  ownedLabItems,
  initialStackedLabItems,
}) => {
  const shopItems = GetStoreItemList(ownedLabItems, selectedGroup)
  return (
    <div className={`grid gap-4 justify-center mt-4 text-left grid-cols-2 sm:grid-cols-4`}>
      <div className="flex flex-col h-full ">
        <button
          key="Delete"
          className={`md:max-h-36 lg:max-h-max border border-base-200 text-center rounded-xl h-full flex flex-col justify-center items-center`}
          onClick={() => setDefault()}
        >
          <ReactSVG src={removeIcon} />
        </button>
        <div className="flex justify-center font-bold">Nothing</div>
      </div>

      {shopItems.map((item) => {
        const category = getLabItemTupleIndex(item.id)
        const localTuple = Array(labAttributeTuple.length).fill(undefined) as IBerryDisplayTupleMap
        localTuple[category] = item.id
        const isSelected = selectedItem.svgKey[category] === item.id

        const itemBalance =
          ownedLabItems.filter((ownedItem) => {
            return GetLabItemId(ownedItem.id) == item.id
          })[0]?.balance ?? '0'

        const isUnstacked = initialStackedLabItems.includes(item.id)
        const isDisabled =
          itemBalance + (isUnstacked ? BigInt(1) : BigInt(0)) < BigInt(1) && !isSelected

        return (
          <>
            <div className="flex flex-col h-full">
              <button
                key={item.id}
                className={
                  `md:max-h-36 lg:max-h-max border border-base-200 rounded-xl ` +
                  (isSelected ? 'border-success  border-4 ' : '') +
                  (isDisabled ? ' filter grayscale opacity-50 ' : '')
                }
                onClick={() => onSelectedItem(item.id, selectedGroup.id)}
                disabled={isDisabled}
              >
                <Avatar selectSvgKey={localTuple} svgTitle={item.name} classes="rounded-xl" />
              </button>
              <span className="flex justify-center mt-1">{item.name}</span>
            </div>
          </>
        )
      })}
    </div>
  )
}

export default AvatarItems
