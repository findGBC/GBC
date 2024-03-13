import type { RefetchOptions, QueryObserverResult } from '@tanstack/react-query'
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
        console.log(reason)
      })
  }

  useEffect(() => {
    // if (!isUpdated) return

    const unstackedItems = initialStackedLabItems.filter((item) => !stackedItems.includes(item))
    const addedItems = stackedItems.filter((item) => !initialStackedLabItems.includes(item))
    console.log(initialStackedLabItems)
    setupUpdateBerry(selectedBerry, addedItems, unstackedItems)
  }, [selectedBerry, stackedItems, isUpdated])

  const handleUpdate = async () => {
    const t = new Toast('Signing update...')

    await updateBerry?.()
      .then(() => {
        t.update('success', 'Update succeed!')
        // setupUpdateBerry(selectedBerry, [], [])
        refetchConnectedAddress()
        setInitialStackedLabItems(
          stackedItems.filter((item) => !initialStackedLabItems.includes(item)),
        )
        setIsUpdated(false)
      })
      .catch((reason: any) => {
        t.update('error', reason.message)
        console.log(reason)
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
