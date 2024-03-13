import { XIcon } from '@heroicons/react/outline'

import { Banner } from '../../components/atoms'
import CheckIcon from '../../components/atoms/Icons/Check'
import { BannerStatus } from '../../global/enum'
import useReferral from '../../hooks/useReferral'

type ReferralBannerProps = {
  account: `0x${string}`
}

const ReferralBanner = ({ account }: ReferralBannerProps) => {
  const { isActivated, isError, isLoading } = useReferral(account)

  if (isLoading || isError) {
    return null
  }

  if (isActivated) {
    return (
      <Banner status={BannerStatus.Success}>
        <CheckIcon className="w-6 h-6 mr-5" />
        Referral Activated - You are participating in the competition
      </Banner>
    )
  } else {
    return (
      <Banner status={BannerStatus.Error}>
        <XIcon className="w-6 h-6 mr-5" />
        Referral Not Activated - You're not participating in the competition!
      </Banner>
    )
  }
}

export default ReferralBanner
