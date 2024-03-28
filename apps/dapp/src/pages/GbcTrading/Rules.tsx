import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

import rulesIcon from '../../assets/img/icons/icon2_rules.svg'
import { Button } from '../../components/atoms'
import Title from '../../components/organism/Title/Title'
import { ButtonType } from '../../global/enum'
import { ARBITRUM_ADDRESS } from '../../global/gmx-middleware/address/arbitrum'
import { ReferralStorage } from '../../global/gmx-middleware/referral/referralStorage'
import { encodeReferralCode } from '../../global/gmx-middleware/utils'
import useReferral from '../../hooks/useReferral'

const Rules = () => {
  const { address, isConnected } = useAccount()
  const { isActivated } = useReferral(address!)

  const { config } = usePrepareContractWrite({
    abi: ReferralStorage,
    account: address,
    address: ARBITRUM_ADDRESS.ReferralStorage,
    args: [encodeReferralCode('BLUEBERRY') as `0x${string}`],
    functionName: 'setTraderReferralCodeByUser',
  })

  const { isLoading: contractSigning, write } = useContractWrite(config)

  return (
    <>
      <div className="flex mb-2">
        <Title icon={rulesIcon} title="Rules" />
      </div>
      <div className="bg-base-100 rounded-xl p-8  mb-2">
        <div className="grid gap-4 text-base mb-3 text-secondary-content">
          <div>
            To participate, trade on GMX with referral code BLUEBERRY. <br />
          </div>
          <div>
            The competition occurs every month from the 1st to the 26th. <br />
          </div>
          <div>Prizes are airdropped at the end of each competition.</div>
        </div>
        <div className="grid gap-3">
          <Button
            btnType={ButtonType.Ghost}
            className="w-full"
            border={true}
            url="https://docs.findgbc.com/ecosystem/gbc-trading"
          >
            Read more
          </Button>
          {!isActivated && isConnected ? (
            <Button btnType={ButtonType.Primary} className="w-full" onClick={() => write?.()}>
              {contractSigning ? 'Signing...' : 'Participate'}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default Rules
