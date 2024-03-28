import { shortenAddress } from '../../../global/gmx-middleware/utils'
import { useProfile } from '../../../hooks/useProfile'

const DisplayName = ({ address }: { address: string }) => {
  const { currentProfile } = useProfile(address as `0x${string}`)
  return (
    <>
      {currentProfile && currentProfile.username.length > 0
        ? currentProfile.username
        : shortenAddress(address)}
    </>
  )
}

export default DisplayName
