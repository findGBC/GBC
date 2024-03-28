import { GetLabItemId, getTupleFromToken } from '../../../global/logic/labs'
import type { IToken, IBerryDisplayTupleMap } from '../../../global/middleware'
import { getLabItemTupleIndex, tokenIdAttributeTuple } from '../../../global/middleware'
import { DefaultBerryAttributes } from '../../../global/middleware/constant'
import useBlueberryProfile from '../../../hooks/useBlueberryProfile'
import { useProfile } from '../../../hooks/useProfile'
import { Loader } from '../../mollecules'
import Avatar from '../Avatar/Avatar'

type DisplayDefaultBerryProps = {
  address: string
  classes: string | undefined
}

const DisplayDefaultBerry = ({ address, classes }: DisplayDefaultBerryProps) => {
  const { ownedTokens, isLoading } = useBlueberryProfile(address)
  const { userProfile, userProfileIsLoading } = useProfile(address as `0x${string}`)

  if (isLoading || userProfileIsLoading) {
    return <Loader />
  }

  if (!ownedTokens) {
    return <Avatar selectSvgKey={DefaultBerryAttributes} classes={classes}></Avatar>
  }

  try {
    let selectedBerry: IToken = ownedTokens.find((berry) => {
      if (!userProfile) return ownedTokens[0]
      return BigInt(berry.id) == userProfile[2]
    }) as IToken

    if (!selectedBerry) {
      selectedBerry = ownedTokens[0]
    }

    const tokenId = Number(selectedBerry.id)
    const tuple: Partial<IBerryDisplayTupleMap> = [...tokenIdAttributeTuple[tokenId - 1]]
    const items = selectedBerry.labItems.map((item) => GetLabItemId(item.id.toString()))

    items.forEach((element) => {
      const category = getLabItemTupleIndex(element) ?? undefined
      tuple[category] = element
    })

    return <Avatar selectSvgKey={getTupleFromToken(selectedBerry)} classes={classes}></Avatar>
  } catch (error) {
    return <Avatar selectSvgKey={DefaultBerryAttributes} classes={classes}></Avatar>
  }
}

export default DisplayDefaultBerry
