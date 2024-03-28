import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

// Contracts
import { Button, Toast } from '../../components/atoms'
import Link from '../../components/atoms/Icons/ExternalLink'
import Profile from '../../components/atoms/Icons/Profile'
import SelectBerry from '../../components/organism/SelectBerry/SelectBerry'
import { ButtonType, GBC_ADDRESS } from '../../global/enum'
// Hooks
import useBlueberryProfile from '../../hooks/useBlueberryProfile'
import type { ProfileType } from '../../hooks/useProfile'
import { useProfile } from '../../hooks/useProfile'

type SettingInputContainerProps = {
  title: string
  children: React.ReactNode
}

// Icons
const SettingInputContainer = ({ title, children }: SettingInputContainerProps) => {
  return (
    <div className="flex flex-col w-full mb-[24px]">
      <div className="font-bold text-[14px] text-secondary-content mb-[16px]">{title}</div>
      {children}
    </div>
  )
}

enum InfoKeys {
  Description = 'description',
  Location = 'location',
  Banner = 'banner',
  X = 'x',
  Instagram = 'instagram',
  Telegram = 'telegram',
}

// Page
const Settings: React.FC = ({}) => {
  // State
  const [newUserProfile, setNewUserProfile] = useState<ProfileType>({
    avatarAddress: GBC_ADDRESS.ZERO,
    avatarId: '0',
    creation: '',
    infoKeys: [
      InfoKeys.Description,
      InfoKeys.Location,
      InfoKeys.Banner,
      InfoKeys.X,
      InfoKeys.Instagram,
      InfoKeys.Telegram,
    ],
    infoValues: ['', '', '', '', '', ''],
    username: '',
  })

  // Hooks
  const account = useAccount()
  const {
    currentProfile,
    createProfile,
    setupCreateProfile,
    getInfoKeyValue,
    updateProfile,
    setupUpdateProfile,
    userProfileIsError,
    userProfile,
  } = useProfile(account.address!)

  const { ownedTokens } = useBlueberryProfile(account.address!)
  const [selectedBerry, setSelectedBerry] = useState<string>('')

  // // Functions
  useEffect(() => {
    if (!userProfile) {
      if (ownedTokens && ownedTokens.length > 0 && !userProfile) {
        setSelectedBerry('0x' + ownedTokens[0].id.toString())
        handleAvatarSelect(ownedTokens[0].id.toString())
      }
    } else {
      setNewUserProfile({
        avatarAddress: userProfile[1],
        avatarId: userProfile[2].toString(),
        creation: userProfile[5].toString(),
        infoKeys: userProfile[3] as string[],
        infoValues: userProfile[4] as string[],
        username: userProfile[0],
      } as ProfileType)
      setSelectedBerry('0x' + userProfile[2].toString(16))
    }
  }, [userProfile])

  useEffect(() => {
    if (!currentProfile) {
      setupCreateProfile(newUserProfile)
    } else {
      setupUpdateProfile(newUserProfile)
    }
  }, [newUserProfile])

  const handleStringInput = (_type: string, _value: string) => {
    if (!newUserProfile) return
    switch (_type) {
      case 'username':
        setNewUserProfile((prev) => {
          const tempUsername = { ...prev }
          tempUsername[_type] = _value
          return tempUsername
        })
        break
      case 'avatarId':
        setNewUserProfile((prev) => {
          const tempAvatarId = { ...prev }
          tempAvatarId[_type] = _value
          return tempAvatarId
        })
        break
      default:
        break
    }
  }

  const handleInfoInput = (_key: string, _value: string) => {
    if (!newUserProfile) return
    setNewUserProfile((prev) => {
      const tempNewProfile = { ...prev }
      const keyIndex = tempNewProfile['infoKeys'].indexOf(_key)
      tempNewProfile['infoValues'][keyIndex] = _value
      return tempNewProfile
    })
  }

  const handleUpdateProfile = async () => {
    const t = new Toast((userProfileIsError ? 'Creation' : 'Updating') + ' profile')

    try {
      if (userProfileIsError) {
        await createProfile?.()
          .then(() => {
            t.update('success', 'Profile created')
          })
          .catch((error) => {
            t.update('error', 'Profile creation failed : ' + error)
          })
      } else {
        await updateProfile?.()
          .then(() => {
            t.update('success', 'Profile updated')
          })
          .catch((error) => {
            t.update('error', 'Profile update failed : ' + error)
          })
      }
    } catch (error) {
      t.update('error', 'Operation failed : ' + error)
    }
  }

  const handleAvatarSelect = (e: string) => {
    handleStringInput('avatarId', parseInt(e, 16).toString())
    setSelectedBerry(e)
  }

  const inputStyle =
    'flex h-16 items-center px-5 w-full bg-base-100 rounded-[10px] text-[14px] text-secondary-content'

  // Render
  return (
    <div className="layout animated fadeIn">
      {/* Layout */}
      {/* Col Left */}
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-1/2">
          {/* Head */}
          <div className="flex flex-row items-center w-full mb-[20px]">
            {/* Icon */}
            <div className="flex justify-center items-center min-w-[40px] h-[40px] mr-[16px] bg-base-100 rounded-[10px]">
              <div className="flex justify-center items-center w-[20px] h-[20px]">
                <Profile />
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-row items-center w-full">
              <div className="font-bold text-[18px] text-secondary-content mr-[8px]">
                Profile Informations
              </div>
            </div>
          </div>

          {/* Inputs */}
          {/* Username */}
          <SettingInputContainer title={'Username'}>
            <input
              className={inputStyle}
              value={newUserProfile.username}
              placeholder="Username"
              onChange={(e) => {
                handleStringInput('username', e.target.value)
              }}
            />
          </SettingInputContainer>

          <SettingInputContainer title={'Avatar'}>
            <SelectBerry
              ownedTokens={ownedTokens}
              selectedBerry={selectedBerry}
              onSelectBerry={handleAvatarSelect}
              className="h-16 w-full bg-base-100 outline-none"
            />
          </SettingInputContainer>

          {/* Bio */}
          <SettingInputContainer title={'Short Bio'}>
            <input
              className={inputStyle}
              value={getInfoKeyValue(currentProfile, InfoKeys.Description)}
              placeholder="Short Bio"
              onChange={(e) => {
                handleInfoInput(InfoKeys.Description, e.target.value)
              }}
            />
          </SettingInputContainer>

          {/* Location */}
          <SettingInputContainer title={'Location'}>
            <input
              className={inputStyle}
              value={getInfoKeyValue(currentProfile, InfoKeys.Location)}
              placeholder="Location"
              onChange={(e) => {
                handleInfoInput(InfoKeys.Location, e.target.value)
              }}
            />
          </SettingInputContainer>

          {/* Email */}
          {/* <div className="flex flex-col w-full mb-[24px]">
            <div className="font-bold text-[14px] text-secondary-content mb-[16px]">Email Address</div>
            <input
              className="flex items-center p-[20px] w-full bg-base-100 rounded-[10px] text-[14px] text-secondary-content"
              // TODO: No stored email in Profile.sol, ask discord for brief
              placeholder="Email Address"
            />
          </div> */}

          {/* Banner */}
          <SettingInputContainer title={'Banner (1200x600)'}>
            <input
              className={inputStyle}
              placeholder="Banner URL"
              value={getInfoKeyValue(currentProfile, InfoKeys.Banner)}
              onChange={(e) => {
                handleInfoInput(InfoKeys.Banner, e.target.value)
              }}
            />
          </SettingInputContainer>
        </div>

        {/* Col Right */}
        <div className="md:w-1/2">
          {/* Head */}
          <div className="flex flex-row items-center w-full mb-[20px]">
            {/* Icon */}
            <div className="flex justify-center items-center min-w-[40px] h-[40px] mr-[16px] bg-base-100 rounded-[10px]">
              <div className="flex justify-center items-center w-[20px] h-[20px]">
                <Link />
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-row items-center w-full">
              <div className="font-bold text-[18px] text-secondary-content mr-[8px]">
                Social links
              </div>
            </div>
          </div>

          {/* Inputs */}
          {/* X */}
          <SettingInputContainer title={'X(Twitter) Username'}>
            <input
              className={inputStyle}
              value={getInfoKeyValue(currentProfile, InfoKeys.X)}
              placeholder="x.com/"
              onChange={(e) => {
                handleInfoInput(InfoKeys.X, e.target.value)
              }}
            />
          </SettingInputContainer>

          {/* Instagram */}
          <SettingInputContainer title={'Instagram Username'}>
            <input
              className={inputStyle}
              value={getInfoKeyValue(currentProfile, InfoKeys.Instagram)}
              placeholder="instagram.com/"
              onChange={(e) => {
                handleInfoInput(InfoKeys.Instagram, e.target.value)
              }}
            />
          </SettingInputContainer>

          {/* Telegram */}
          <SettingInputContainer title={'Telegram Username'}>
            <input
              className={inputStyle}
              value={getInfoKeyValue(currentProfile, InfoKeys.Telegram)}
              placeholder="t.me/"
              onChange={(e) => {
                handleInfoInput(InfoKeys.Telegram, e.target.value)
              }}
            />
          </SettingInputContainer>
        </div>
      </div>

      {/* Save */}
      <Button
        btnType={ButtonType.Primary}
        onClick={handleUpdateProfile}
        className="w-1/2 md:w-1/4 mb-10"
      >
        Save
      </Button>
    </div>
  )
}

export default Settings
