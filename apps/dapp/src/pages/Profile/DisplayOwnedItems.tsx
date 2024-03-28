import { Loader } from '../../components/mollecules'
import { Avatar } from '../../components/organism'
import { GetOwnedItems } from '../../global/logic/labs'
import {
  labAttributeTuple,
  type IBerryDisplayTupleMap,
  type ILabItemOwnership,
  type LabItemSale,
  getLabItemTupleIndex,
} from '../../global/middleware'

type DisplayOwnedBerriesProps = {
  ownedItems: ILabItemOwnership[] | undefined
  isLoading: boolean
}

const DisplayOwnedItems = ({ ownedItems, isLoading }: DisplayOwnedBerriesProps) => {
  if (isLoading) {
    return <Loader />
  }

  if (!ownedItems || ownedItems.length === 0) {
    return <div>No items owned</div>
  }

  const labItems = GetOwnedItems(ownedItems.filter((item) => item.balance > 0))

  const getSvg = (item: LabItemSale) => {
    const category = getLabItemTupleIndex(item.id)
    const localTuple = Array(labAttributeTuple.length).fill(undefined) as IBerryDisplayTupleMap
    localTuple[category] = item.id

    return localTuple
  }

  return (
    <div className="grid gap-4 justify-center text-left grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3">
      {/* GBC */}
      {labItems.map((item: LabItemSale) => (
        <div className="p-4 bg-base-100 rounded-xl animated fadeIn">
          <div className="rounded-xl">
            <Avatar selectSvgKey={getSvg(item)} classes="rounded-xl"></Avatar>
          </div>
          <div className="mt-4 text-secondary-content font-bold text-sm">{item.name}</div>
        </div>
      ))}
    </div>
  )
}

export default DisplayOwnedItems
