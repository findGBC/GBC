import { useEffect } from 'react'

import { ButtonType } from '../../../global/enum'
import useLabs from '../../../hooks/useLabs'
import { Button, Toast } from '../../atoms'

type UpdateBerryButtonProps = {
  isUpdated: boolean
  setIsUpdated: (updated: boolean) => void
  address: `0x${string}` | undefined
  selectedBerry: string
  stackedItems: number[]
  initialStackedLabItems: number[]
  refetchConnectedAddress: () => void
  setInitialStackedLabItems: React.Dispatch<React.SetStateAction<number[]>>
}

const UpdateBerryButton = ({
  isUpdated,
  setIsUpdated,
  address,
  selectedBerry,
  stackedItems,
  initialStackedLabItems,
  refetchConnectedAddress,
  setInitialStackedLabItems,
}: UpdateBerryButtonProps) => {
  const {
    isApproved,
    approvalSigning,
    approveAllContract,
    refetchApproval,
    setupUpdateBerry,
    updateSigning,
    updateBerry,
  } = useLabs(address!)

  const handleApproval = async () => {
    const t = new Toast('Signing approval...')
    approveAllContract?.()
      .then(() => {
        t.update('success', 'Contract approved!')
        refetchApproval()
        setIsUpdated(false)
      })
      .catch((reason: any) => {
        t.update('error', reason.message)
      })
  }

  useEffect(() => {
    const unstackedItems = initialStackedLabItems.filter((item) => !stackedItems.includes(item))
    const addedItems = stackedItems.filter((item) => !initialStackedLabItems.includes(item))
    setupUpdateBerry(selectedBerry, addedItems, unstackedItems)
  }, [selectedBerry, stackedItems, isUpdated])

  const handleUpdate = async () => {
    const t = new Toast('Signing update...')

    await updateBerry?.()
      .then(() => {
        t.update('success', 'Update succeed!')
        refetchConnectedAddress()
        setInitialStackedLabItems(
          stackedItems.filter((item) => !initialStackedLabItems.includes(item)),
        )
        setIsUpdated(false)
      })
      .catch((reason: any) => {
        t.update('error', reason.message)
      })
  }

  if (!isApproved) {
    return (
      <Button
        btnType={approvalSigning || !isUpdated ? ButtonType.Accent : ButtonType.Primary}
        onClick={handleApproval}
        className="w-3/5 md:w-auto"
        disabled={!isUpdated}
      >
        {approvalSigning ? 'Signing...' : 'Approve'}
      </Button>
    )
  } else {
    return (
      <Button
        btnType={updateSigning || !isUpdated ? ButtonType.Accent : ButtonType.Primary}
        onClick={handleUpdate}
        className="w-3/5 md:w-auto"
        disabled={!isUpdated}
      >
        {updateSigning ? 'Signing...' : 'Update'}
      </Button>
    )
  }
}

export default UpdateBerryButton
