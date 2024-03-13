import { DownloadIcon, XIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { useAccount } from 'wagmi'

import profileIcon from '../../assets/img/icons/lab/iconItem/profile_icon.svg'
import openseaIcon from '../../assets/img/nav/opensea_icon.svg'
import { Banner, Button, Select } from '../../components/atoms'
import { Loader } from '../../components/mollecules'
import { Avatar, AvatarItems } from '../../components/organism'
import LabItemGroups from '../../components/organism/Lab/LabItemGroups'
import UpdateBerryButton from '../../components/organism/Lab/UpdateBerryButton'
import { BannerStatus, ButtonType } from '../../global/enum'
import { GetCategoryGroup, GetLabItemId, generateImage, generateImageSvg } from '../../global/logic/labs'
import type { IBerryDisplayTupleMap, IToken } from '../../global/middleware'
import { getLabItemTupleIndex, tokenIdAttributeTuple } from '../../global/middleware'
import { DefaultBerryAttributes } from '../../global/middleware/constant'
import type { IGroupItem, SelectOptionProps } from '../../global/type'
import useBlueberryProfile from '../../hooks/useBlueberryProfile'
import useImageDownloader from '../../hooks/useImageDownloader'
import IconLabItemGroup from '../../styles/icons/iconLabItemGroup'

type SelectedItemState = {
  svgKey: Partial<IBerryDisplayTupleMap>
}

const BlueberryLab = () => {
  const { address } = useAccount()
  const { isLoading, ownedTokens, ownedLabItems, refetch } = useBlueberryProfile(address!)
  const [defaultBerry, setDefaultBerry] = useState<IBerryDisplayTupleMap>(DefaultBerryAttributes)
  const [selectedItem, setSelectedItem] = useState<SelectedItemState>({ svgKey: defaultBerry })
  const [selectedBerry, setSelectedBerry] = useState<string>('')
  const [stackedLabItems, setStackedLabItems] = useState<number[]>([])
  const [initialStackedLabItems, setInitialStackedLabItems] = useState<number[]>([])
  const [selectedGroup, setSelectedGroup] = useState<IGroupItem>(IconLabItemGroup[0])
  const [isNewUser, setIsNewUser] = useState<boolean>(true)
  const [isUpdated, setIsUpdated] = useState<boolean>(false)

  const { triggerDownload } = useImageDownloader(generateImageSvg, selectedItem, 'GBC.png')

  useEffect(() => {
    if (ownedTokens && ownedTokens.length > 0) {
      setIsNewUser(false)
      initBerry(ownedTokens[0])
    }
  }, [ownedTokens])

  useEffect(() => {
    if (!address) {
      setDefaultBerry(DefaultBerryAttributes)
      setSelectedItem({ svgKey: DefaultBerryAttributes })
    }
  }, [address])

  const initBerry = (token: IToken) => {
    setDefaultBerry([...tokenIdAttributeTuple[token.id - 1]])
    setSelectedBerry(token.id.toString())

    if (token.labItems.length > 0) {
      setStackedLabItems(() => {
        const items = token.labItems.map((item) => GetLabItemId(item.id.toString()))
        setInitialStackedLabItems(items)
        setSelectedItem(() => {
          const tuple: Partial<IBerryDisplayTupleMap> = [...tokenIdAttributeTuple[token.id - 1]]

          items.forEach((element) => {
            const category = getLabItemTupleIndex(element) ?? undefined
            tuple[category] = element
          })

          return {
            svgKey: tuple,
          }
        })

        return items
      })
    } else {
      setSelectedItem(() => {
        const tuple: Partial<IBerryDisplayTupleMap> = [...tokenIdAttributeTuple[token.id - 1]]
        return {
          svgKey: tuple,
        }
      })
    }
  }

  const handleItemSelect = (svgKey: number, selectedGroup: number) => {
    const categoryGroup = GetCategoryGroup()
    setStackedLabItems((prevState) => {
      const newStack = [...prevState]

      if (prevState.length >= 5) {
        newStack.pop()
      }

      // Clean up the stack
      prevState.forEach((element, index) => {
        const category = getLabItemTupleIndex(element)
        const isSameGroup = categoryGroup[selectedGroup].includes(category)
        if (isSameGroup) {
          newStack[index] = svgKey
        }
      })

      // Add items if not included yet
      if (!newStack.includes(svgKey)) {
        newStack.push(svgKey)
      }

      refreshIsUpdated(newStack)
      updateBerryItems(newStack)
      return newStack
    })
  }

  const refreshIsUpdated = (newStack: number[]) => {
    if (
      initialStackedLabItems.every((tokenId) => {
        return newStack.includes(tokenId)
      }) &&
      initialStackedLabItems.length === newStack.length
    ) {
      setIsUpdated(false)
    } else {
      setIsUpdated(true)
    }
  }

  const updateBerryItems = (itemStack: number[]) => {
    setSelectedItem(() => {
      const myPrevStateSvgKey = defaultBerry.filter(() => true)
      itemStack.forEach((element) => {
        const category = getLabItemTupleIndex(element) ?? undefined
        myPrevStateSvgKey[category] = element
      })

      return {
        svgKey: myPrevStateSvgKey,
      }
    })
  }

  const handleSetDefaultForGroup = () => {
    const categoryGroup = GetCategoryGroup()

    for (const category of categoryGroup[selectedGroup.id]) {
      setStackedLabItems((prevState) => {
        const newStack = [...prevState]

        // Clean up the stack
        prevState.forEach((element, index) => {
          const itemCategory = getLabItemTupleIndex(element)
          if (itemCategory === category) {
            newStack.splice(index, 1)
          }
        })
        refreshIsUpdated(newStack)
        updateBerryItems(newStack)

        return newStack
      })
    }
  }

  const getOptions = (tokens: IToken[] | undefined): SelectOptionProps[] => {
    if (tokens) {
      return tokens.map((token: IToken) => {
        return {
          label: `GBC #${parseInt(token.id.toString(), 16)}`,
          value: token.id.toString(),
        } as SelectOptionProps
      })
    }
    return [] as { value: string; label: string }[]
  }

  const handleDownload = () => {
    triggerDownload()
  }

  const handleResetSvg = () => {
    setIsUpdated(false)
    setStackedLabItems((prevState) => {
      const newStack = [...prevState]
      newStack.splice(0, newStack.length)
      updateBerryItems(newStack)
      return newStack
    })
  }

  const onSelectBerry = (value: string) => {
    initBerry(ownedTokens!.find((token) => token.id.toString() === value) as IToken)
    setIsUpdated(true)
  }

  const handleOnGroupSelect = (group: IGroupItem) => {
    setSelectedGroup(group)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="layout small thin">
      <div>
        <Banner status={BannerStatus.Info}>
          <img src={profileIcon} alt="shop icon" className="w-6 h-6 mr-5" />
          <div>
            Make sure your profile picture appears by selecting the matching GBC in your profile{' '}
            <Link to="/settings" className="underline">
              settings
            </Link>
          </div>
        </Banner>
        <div className="divider"></div>
        <div className="flex flex-col md:flex-row md:gap-10">
          <div className="md:w-2/5">
            <div className="text-center md:text-left rounded-lg">
              <Avatar selectSvgKey={selectedItem.svgKey} classes="rounded-xl" />
            </div>
            <div className="mt-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="w-full">
                  {!isNewUser ? (
                    <Select
                      options={getOptions(ownedTokens)}
                      selectClassName="w-full h-12"
                      value={selectedBerry}
                      onChange={(e) => onSelectBerry(e.target.value)}
                    />
                  ) : (
                    <Button
                      className="w-full"
                      btnType={ButtonType.Ghost}
                      url="https://opensea.io/collection/findgbc"
                    >
                      <div className="text-xs">Buy my first GBC</div>
                      <div>
                        <ReactSVG src={openseaIcon} />
                      </div>
                    </Button>
                  )}
                </div>

                <div className="flex w-full gap-2 md:gap-1 space-x-2">
                  <UpdateBerryButton
                    isUpdated={isUpdated}
                    setIsUpdated={setIsUpdated}
                    address={address}
                    selectedBerry={selectedBerry}
                    stackedItems={stackedLabItems}
                    initialStackedLabItems={initialStackedLabItems}
                    setInitialStackedLabItems={setInitialStackedLabItems}
                    refetchConnectedAddress={refetch}
                  />
                  <Button btnType={ButtonType.Ghost} onClick={handleDownload}>
                    <DownloadIcon width={20} />
                  </Button>
                  <Button btnType={ButtonType.Ghost} onClick={handleResetSvg}>
                    <XIcon width={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="divider sm:hidden"></div>
          <div className="md:w-3/5">
            <LabItemGroups onGroupSelect={handleOnGroupSelect} selectedGroup={selectedGroup} />
            <AvatarItems
              selectedGroup={selectedGroup}
              selectedItem={selectedItem}
              onSelectedItem={handleItemSelect}
              setDefault={handleSetDefaultForGroup}
              ownedLabItems={ownedLabItems || []}
              initialStackedLabItems={initialStackedLabItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlueberryLab
