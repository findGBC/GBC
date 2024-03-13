import { GetLabItemId } from '../../../global/logic/labs'
import type { IToken, IBerryDisplayTupleMap } from '../../../global/middleware'
import { getLabItemTupleIndex, tokenIdAttributeTuple } from '../../../global/middleware'
import { DefaultBerryAttributes } from '../../../global/middleware/constant'
import useBlueberryProfile from '../../../hooks/useBlueberryProfile'
import { Loader } from '../../mollecules'
import Avatar from '../Avatar/Avatar'

type DisplayBerryProps = {
  address: string
  classes: string | undefined
}

const DisplayBerry = ({ address, classes }: DisplayBerryProps) => {
  const { ownedTokens, isLoading, owner } = useBlueberryProfile(address)

  if (isLoading) {
    return <Loader />
  }

  if (!ownedTokens) {
    return <Avatar selectSvgKey={DefaultBerryAttributes} classes={classes}></Avatar>
  }

  try {
    const selectedBerry: IToken = owner.profile ?? ownedTokens[0]

    const tokenId = Number(selectedBerry.id)
    const tuple: Partial<IBerryDisplayTupleMap> = [...tokenIdAttributeTuple[tokenId - 1]]
    const items = selectedBerry.labItems.map((item) => GetLabItemId(item.id.toString()))

    items.forEach((element) => {
      const category = getLabItemTupleIndex(element) ?? undefined
      tuple[category] = element
    })

    return <Avatar selectSvgKey={tuple} classes={classes}></Avatar>
  } catch (error) {
    return <Avatar selectSvgKey={DefaultBerryAttributes} classes={classes}></Avatar>
  }
}

export default DisplayBerry
