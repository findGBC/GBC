import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount } from 'wagmi'

// Components
import { Select, Toast } from '../../components/atoms'
import Collectibles from '../../components/atoms/Icons/Collectibles'
// Icons
import Creation from '../../components/atoms/Icons/Creation'
import ExternalLink from '../../components/atoms/Icons/ExternalLink'
import Info from '../../components/atoms/Icons/Info'
import Instagram from '../../components/atoms/Icons/Instagram'
import Location from '../../components/atoms/Icons/Location'
import Telegram from '../../components/atoms/Icons/Telegram'
import Trade from '../../components/atoms/Icons/Trade'
import X from '../../components/atoms/Icons/X'
import { Loader } from '../../components/mollecules'
import DisplayDefaultBerry from '../../components/organism/DisplayDefaultBerry/DisplayDefaultBerry'
import DisplayName from '../../components/organism/DisplayName/DisplayName'
import { GBC_ADDRESS } from '../../global/enum'
import { formatReadableUSD, shortenAddress } from '../../global/gmx-middleware/utils'
import type { SelectOptionProps } from '../../global/type'
import useBlueberryProfile from '../../hooks/useBlueberryProfile'
import useBlueberrySearch from '../../hooks/useBlueberrySearch'
import useCompetition from '../../hooks/useCompetition'
import { useProfile } from '../../hooks/useProfile'

import DisplayOwnedBerries from './DisplayOwnedBerries'
import DisplayOwnedItems from './DisplayOwnedItems'

enum CollectiblesOptionsType {
  GBC = 'GBC',
  Items = 'Items',
}

const CollectiblesOptions: SelectOptionProps[] = [
  { label: 'GBC', value: CollectiblesOptionsType.GBC.toString() },
  { label: 'Items', value: CollectiblesOptionsType.Items.toString() },
]

// Page
const Profile: React.FC = ({}) => {
  // Hooks
  const { slug } = useParams()
  const account = useAccount()
  const isEvmAddress = (slug?.startsWith('0x') && slug?.length === GBC_ADDRESS.ZERO.length) ?? false

  const { profiles } = useBlueberrySearch(!isEvmAddress ? slug! : '')

  let currentAddress = ''

  if (isEvmAddress) {
    currentAddress = slug!
  } else if (profiles?.profiles && profiles.profiles.find((p) => p.username === slug!)) {
    currentAddress = profiles.profiles.find((p) => p.username === slug!)!.id
  } else if (slug === '' || slug === undefined) {
    currentAddress = account.address!
  }

  const { currentProfile, getInfoKeyValue } = useProfile(currentAddress as `0x${string}`)
  const { isLoading, ownedTokens, ownedLabItems } = useBlueberryProfile(currentAddress)
  const { isLoading: tradingStatsLoading, leaderboard } = useCompetition(currentAddress)
  const timestampToDate = (_timestamp: string) => {
    const timestamp = Number(_timestamp) * 1000
    const date = new Date(timestamp)

    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedMonth = month < 10 ? `0${month}` : month
    const formattedDay = day < 10 ? `0${day}` : day

    return `${formattedMonth}.${formattedDay}.${year}`
  }

  const addressToClipboard = () => {
    navigator.clipboard.writeText(currentAddress?.toString() ?? '').then(() => {
      new Toast('Address copied to clipboard', 'success')
    })
  }

  const profileToClipboard = () => {
    const id = currentProfile?.username ? currentProfile?.username : currentAddress
    const url = window.location.origin + '/profile/' + id
    navigator.clipboard.writeText(url).then(() => {
      new Toast('Profile link copied to clipboard', 'success')
    })
  }

  const parseTwitterLink = (link: string) => {
    const twitterRegex = /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_.]{1,100}\/?$/
    const xcomRegex = /^https?:\/\/(www\.)?x\.com\/[A-Za-z0-9_.]{1,100}\/?$/

    if (twitterRegex.test(link) || xcomRegex.test(link)) {
      return link
    } else {
      return 'https://twitter.com/findgbc'
    }
  }

  const parseInstagramLink = (link: string) => {
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,100}\/?$/

    if (instagramRegex.test(link)) {
      return link
    } else {
      return 'https://www.instagram.com/findgbc/'
    }
  }

  const parseTelegramLink = (link: string) => {
    const telegramRegex = /^https?:\/\/(www\.)?t\.me\/[A-Za-z0-9_.]{1,100}\/?$/

    if (telegramRegex.test(link)) {
      return link
    } else {
      return null
    }
  }

  const getTotalCashPrize = () => {
    if (leaderboard.profile?.score == undefined) {
      return '$ 0'
    }
    const prize =
      (leaderboard.metrics.estFeePool * leaderboard.profile?.score) / leaderboard.totalScore
    return formatReadableUSD(prize, false, true)
  }

  const [selectedCollectiblesOption, setSelectedCollectiblesOption] = useState(
    CollectiblesOptionsType.GBC.toString(),
  )

  const handleCollectiblesSort = (option: string) => {
    setSelectedCollectiblesOption(option)
  }

  // Render
  return (
    <div className="layout animated fadeIn">
      {/* Layout */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Col Left */}
        <div className="flex flex-col w-full md:w-2/5 md:mr-[16px] mb-[32px] md:mb-0">
          {/* Profile Card */}
          <div className="flex flex-col w-full bg-base-100 rounded-xl mb-[32px] px-[10px] py-[20px]">
            {/* Images */}
            <div className="flex flex-col w-full relative mb-[60px]">
              <div className="w-full h-[140px] rounded-[10px] bg-primary">
                {getInfoKeyValue(currentProfile, 'banner') && (
                  <img
                    src={getInfoKeyValue(currentProfile, 'banner')}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                )}
              </div>
              <div className="w-[80px] h-[80px] ml-[14px] absolute bottom-[-40px] rounded-full border-solid border-[2px] border-base-100 bg-secondary-content">
                <DisplayDefaultBerry address={currentAddress} classes="w-full rounded-full" />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col w-full px-[14px]">
              {/* Username */}
              <div className="font-bold text-[24px] text-secondary-content mb-[8px]">
                <DisplayName address={currentAddress} />
              </div>

              {/* Address */}
              <div className="flex flex-row items-center mb-[20px]">
                <div className="font-regular text-neutral mr-[6px]">
                  {shortenAddress(currentAddress as `0x${string}`)}
                </div>
                <button onClick={addressToClipboard}>
                  <Collectibles color="#6B7B8D" />
                </button>
              </div>

              {/* Description */}
              <div className="font-regular text-[14px] text-secondary-content mb-[16px]">
                {getInfoKeyValue(currentProfile, 'description')
                  ? getInfoKeyValue(currentProfile, 'description')
                  : "We don't know much about this user, but we're sure it's great."}
              </div>

              {/* Location & Member Since */}
              <div className="flex flex-row justify-between items-start w-full mb-2">
                {/* Location */}
                <div className="flex flex-row w-1/2 mb-[20px] mr-[20px]">
                  <div className="w-[12px] h-[12px] mt-[2px] mr-[6px]">
                    <Location />
                  </div>
                  <div className="font-regular text-[12px] text-neutral">
                    {getInfoKeyValue(currentProfile, 'location')
                      ? getInfoKeyValue(currentProfile, 'location')
                      : 'Somewhere'}
                  </div>
                </div>
                {/* Member Since */}
                <div className="flex flex-row w-[50%] mb-[20px]">
                  <div className="w-[12px] h-[12px] mt-[2px] mr-[6px]">
                    <Creation />
                  </div>
                  <div className="font-regular text-[12px] text-neutral">
                    {currentProfile?.creation
                      ? timestampToDate(currentProfile?.creation)
                      : 'Not registered'}
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="flex flex-row w-full items-center">
                {/* X / Twitter */}
                {getInfoKeyValue(currentProfile, 'x') ? (
                  <div className="w-[28px] h-[28px] rounded-xl mr-[10px] cursor-pointer bg-base-300">
                    <div className="w-full h-full relative">
                      <a
                        href={parseTwitterLink(
                          'https://www.x.com/' + getInfoKeyValue(currentProfile, 'x')!,
                        )}
                        className="w-full h-full absolute top-0 left-0 rounded-[4px]"
                        target="_blank"
                      >
                        <X />
                      </a>
                    </div>
                  </div>
                ) : null}

                {/* Instagram */}
                {getInfoKeyValue(currentProfile, 'instagram') ? (
                  <div className="w-[28px] h-[28px] rounded mr-[10px] cursor-pointer bg-base-300">
                    <div className="w-full h-full relative">
                      <a
                        href={parseInstagramLink(
                          'https://www.instagram.com/' +
                            getInfoKeyValue(currentProfile, 'instagram')!,
                        )}
                        className="w-full h-full absolute top-0 left-0 rounded-[4px]"
                        target="_blank"
                      >
                        <Instagram />
                      </a>
                    </div>
                  </div>
                ) : null}

                {/* Telegram */}
                {getInfoKeyValue(currentProfile, 'telegram') ? (
                  <div className="w-[28px] h-[28px] rounded mr-[10px] cursor-pointer bg-base-300">
                    <div className="w-full h-full relative">
                      <a
                        href={
                          parseTelegramLink(
                            'https://www.t.me/' + getInfoKeyValue(currentProfile, 'telegram')!,
                          )!
                        }
                        className="w-full h-full absolute top-0 left-0 rounded-[4px]"
                        target="_blank"
                      >
                        <Telegram />
                      </a>
                    </div>
                  </div>
                ) : null}

                <button
                  className="flex justify-center items-center w-[28px] h-[28px] mr-[10px] cursor-pointer border-2 border-solid border-base-200 rounded-[4px]"
                  onClick={profileToClipboard}
                >
                  <ExternalLink />
                </button>
              </div>
            </div>
          </div>

          {/* Trading Stats */}
          <div className="flex flex-col w-full">
            {/* Head */}
            <div className="flex flex-row items-center w-full mb-5">
              {/* Icon */}
              <div className="flex justify-center items-center w-12 h-10 bg-base-100 rounded-xl mr-2">
                <Trade />
              </div>

              {/* Title */}
              <div className="flex flex-row items-center w-full">
                <div className="font-bold text-lg text-secondary-content mr-[8px]">
                  GBC Trading Stats
                </div>
                <div className="cursor-pointer">
                  <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="pt-2">
                      <Info />
                    </div>
                    <div
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                      tabIndex={0}
                      className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-200 text-secondary-content"
                    >
                      <div className="card-body">
                        <p>Personal stats from the GBC Trading competition</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trading Card */}
            <div className="flex flex-col w-full bg-base-100 rounded-xl p-[25px] md:mb-14">
              {/* Stats */}
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                  <div className="font-regular text-[12px] text-neutral mb-[4px]">Current Rank</div>
                  <div className="font-bold text-[18px] text-secondary-content">
                    {tradingStatsLoading ? (
                      <Loader></Loader>
                    ) : leaderboard.profile?.rank == 0 ? (
                      'N/A'
                    ) : (
                      leaderboard.profile?.rank
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-1/2">
                  <div className="font-regular text-[12px] text-neutral mb-[4px]">Cashprize</div>
                  <div className="font-bold text-[18px] text-success">
                    {tradingStatsLoading ? <Loader></Loader> : getTotalCashPrize()}
                  </div>
                </div>
              </div>
              <div className="flex flex-row w-full mt-3">
                <div className="flex flex-col w-1/2">
                  <div className="font-regular text-[12px] text-neutral mb-[4px]">
                    Winning trades
                  </div>
                  <div className="font-bold text-[18px] text-secondary-content">
                    {tradingStatsLoading ? (
                      <Loader></Loader>
                    ) : leaderboard.profile ? (
                      leaderboard.profile?.winCount
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-1/2">
                  <div className="font-regular text-[12px] text-neutral mb-[4px]">
                    Losing trades
                  </div>
                  <div className="font-bold text-[18px] text-secondary-content">
                    {tradingStatsLoading ? (
                      <Loader></Loader>
                    ) : leaderboard.profile ? (
                      leaderboard.profile?.lossCount
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-row w-full mt-3">
                <div className="flex flex-col w-1/2">
                  <div className="font-regular text-[12px] text-neutral mb-[4px]">Average size</div>
                  <div className="font-bold text-[18px] text-secondary-content">
                    {tradingStatsLoading ? (
                      <Loader></Loader>
                    ) : leaderboard.profile ? (
                      formatReadableUSD(leaderboard.profile?.avgSize)
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-1/2">
                  <div className="font-regular text-[12px] text-neutral mb-[4px]">Open PnL</div>
                  <div className="font-bold text-[18px] text-secondary-content">
                    {tradingStatsLoading ? (
                      <Loader></Loader>
                    ) : leaderboard.profile ? (
                      formatReadableUSD(leaderboard.profile?.openPnl)
                    ) : (
                      'N/A'
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              {/* <div className="flex justify-center items-center w-full h-[40px] rounded-xl bg-primary font-bold text-[14px] text-base-300 cursor-pointer">
                View trade history
              </div> */}
            </div>
          </div>
        </div>

        {/* Col Right */}
        <div className="flex flex-col w-full md:w-3/5 md:ml-5">
          {/* Collectibles */}
          <div className="flex flex-col w-full">
            {/* Head */}
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row items-center">
                {/* Logo */}
                <div className="flex justify-center items-center w-10 h-10 mr-4 bg-base-100 rounded-xl">
                  <div className="flex justify-center items-center w-5 h-5">
                    <Collectibles />
                  </div>
                </div>

                {/* Title */}
                <div className="font-bold text-lg text-secondary-content">Collectibles</div>
              </div>

              <div className="w-40 h-10 px-3 border border-5 border-solid border-base-200 rounded-xl bg-base-100">
                <Select
                  className="w-32 h-9 rounded-xl bg-base-100"
                  options={CollectiblesOptions}
                  onChange={(e) => handleCollectiblesSort(e.target.value)}
                ></Select>
              </div>
            </div>

            <div className="pt-5 mb-16">
              {selectedCollectiblesOption === CollectiblesOptionsType.GBC.toString() && (
                <DisplayOwnedBerries ownedBerries={ownedTokens} isLoading={isLoading} />
              )}

              {selectedCollectiblesOption === CollectiblesOptionsType.Items.toString() && (
                <DisplayOwnedItems ownedItems={ownedLabItems} isLoading={isLoading} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
