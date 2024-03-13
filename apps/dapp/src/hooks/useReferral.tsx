// @ts-ignore
import { useContractRead } from 'wagmi'

import { ARBITRUM_ADDRESS } from '../global/gmx-middleware/address/arbitrum'
import { ReferralStorage } from '../global/gmx-middleware/referral/referralStorage'
import { decodeReferralCode } from '../global/gmx-middleware/utils'

const useReferral = (account: `0x${string}`) => {
  const { data, isError, isLoading } = useContractRead({
    abi: ReferralStorage,
    address: ARBITRUM_ADDRESS.ReferralStorage,
    args: [account],
    functionName: 'traderReferralCodes',
  })
  const isActivated = decodeReferralCode(data) === 'BLUEBERRY'

  return { isActivated, isError, isLoading }
}

export default useReferral
