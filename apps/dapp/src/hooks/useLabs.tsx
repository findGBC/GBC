import { toBigInt } from 'ethers'
import { useState } from 'react'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

import { GBC_ADDRESS } from '../global/enum'
import { ClosetContract } from '../global/middleware/contracts/Closet'
import { GbcLabContract } from '../global/middleware/contracts/GbcLab'

const useLabs = (address: `0x${string}`) => {
  const { data: isApproved, refetch: refetchApproval } = useContractRead({
    abi: GbcLabContract,
    address: GBC_ADDRESS.LAB,
    args: [address, GBC_ADDRESS.CLOSET],
    functionName: 'isApprovedForAll',
  })

  const { config: approvalContractConfig } = usePrepareContractWrite({
    abi: GbcLabContract,
    account: address,
    address: GBC_ADDRESS.LAB,
    args: [GBC_ADDRESS.CLOSET, true],
    functionName: 'setApprovalForAll',
  })

  const { isLoading: approvalSigning, writeAsync: approveAllContract } =
    useContractWrite(approvalContractConfig)

  const [updatedBerry, setUpdatedBerry] = useState<bigint>(BigInt(0))
  const [addedItems, setAddedItems] = useState<bigint[]>([])
  const [removedItems, setRemovedItems] = useState<bigint[]>([])

  const { config: updateBerryConfig, refetch: refetchUpdateBerry } = usePrepareContractWrite({
    abi: ClosetContract,
    account: address,
    address: GBC_ADDRESS.CLOSET,
    args: [updatedBerry, addedItems, removedItems, address],
    functionName: 'set',
  })

  const { isLoading: updateSigning, writeAsync: updateBerry } = useContractWrite(updateBerryConfig)

  const setupUpdateBerry = (
    selectedBerry: string,
    stackedItems: number[],
    unstackedItems: number[],
  ) => {
    setUpdatedBerry(BigInt(selectedBerry))
    setAddedItems(stackedItems.map((item) => toBigInt(item)))
    setRemovedItems(unstackedItems.map((item) => toBigInt(item)))
    refetchUpdateBerry()
  }

  return {
    approvalSigning: approvalSigning,
    approveAllContract: approveAllContract,
    isApproved: isApproved as boolean,
    refetchApproval: refetchApproval,
    setupUpdateBerry: setupUpdateBerry,
    updateBerry: updateBerry,
    updateSigning: updateSigning,
  }
}

export default useLabs
