import { useState, useEffect } from 'react'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'

// Contracts
import { GBC_ADDRESS } from '../global/enum'
import { GbcProfile } from '../global/middleware/contracts/GbcProfile'

// Types
export type ProfileType = {
  username: string
  avatarAddress: `0x${string}`
  avatarId: string
  infoKeys: string[]
  infoValues: string[]
  creation: string
}

// Hook
export const useProfile = (_address: `0x${string}`) => {
  // State
  const [currentProfile, setCurrentProfile] = useState<ProfileType>()

  // Hooks
  // Get Profile
  const {
    isLoading: userProfileIsLoading,
    data: userProfile,
    isError: userProfileIsError,
  } = useContractRead({
    abi: GbcProfile,
    address: GBC_ADDRESS.PROFILE,
    args: [_address],
    functionName: 'getProfile',
  })

  useEffect(() => {
    if (!userProfileIsLoading && userProfile) {
      setCurrentProfile({
        avatarAddress: userProfile[1],
        avatarId: userProfile[2].toString(),
        creation: userProfile[5].toString(),
        infoKeys: userProfile[3] as string[],
        infoValues: userProfile[4] as string[],
        username: userProfile[0],
      } as ProfileType)
    }
  }, [userProfile])

  // Create Profile
  const {
    config: createProfileConfig,
    refetch: refetchCreateProfileConfig,
    error: createProfileError,
  } = usePrepareContractWrite({
    abi: GbcProfile,
    account: _address,
    address: GBC_ADDRESS.PROFILE,
    args: [
      currentProfile?.username ?? '',
      GBC_ADDRESS.GBC,
      BigInt(currentProfile?.avatarId ?? ''),
      currentProfile?.infoKeys ?? [],
      currentProfile?.infoValues ?? [],
    ],
    functionName: 'createProfile',
  })

  const { isLoading: createProfileLoading, writeAsync: createProfile } =
    useContractWrite(createProfileConfig)

  const setupCreateProfile = (profile: ProfileType) => {
    setCurrentProfile(profile)
    refetchCreateProfileConfig()
  }

  // Update Profile
  const { config: updateProfileConfig, refetch: refetchUpdateProfileConfig } =
    usePrepareContractWrite({
      abi: GbcProfile,
      account: _address,
      address: GBC_ADDRESS.PROFILE,
      args: [
        currentProfile?.username ?? '',
        GBC_ADDRESS.GBC,
        BigInt(currentProfile?.avatarId ?? ''),
        currentProfile?.infoKeys ?? [],
        currentProfile?.infoValues ?? [],
      ],
      functionName: 'updateProfile',
    })

  const { isLoading: updateProfileLoading, writeAsync: updateProfile } =
    useContractWrite(updateProfileConfig)

  const setupUpdateProfile = (profile: ProfileType) => {
    setCurrentProfile(profile)
    refetchUpdateProfileConfig()
  }
  // Functions

  const getInfoKeyValue = (_profile: ProfileType | undefined, _key: string) => {
    if (!_profile) return undefined

    let value

    const index = _profile.infoKeys.indexOf(_key)
    if (index !== -1) {
      value = _profile.infoValues[index]
    }

    return value
  }

  // Actions
  return {
    createProfile,
    createProfileError,
    createProfileLoading,
    currentProfile,
    getInfoKeyValue,
    refetchUpdateProfileConfig,
    setupCreateProfile,
    setupUpdateProfile,
    updateProfile,
    updateProfileLoading,
    userProfile,
    userProfileIsError,
    userProfileIsLoading,
  }
}
