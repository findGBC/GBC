import type { FC, PropsWithChildren } from 'react'
import React, { useContext, useEffect, useState } from 'react'

import type { TreasuryDetailsProps } from '../global/type'
import useTreasury from '../hooks/useTreasury'

interface TreasuryDataInterface {
  data: TreasuryDetailsProps | null
  loading: boolean
}

export const TreasuryDataProviderContext =
  React.createContext<TreasuryDataInterface | null>(null)

export const useTreasuryDataProviderContext = (): TreasuryDataInterface => {
  const useTreasuryDataContext = useContext(TreasuryDataProviderContext)

  if (!useTreasuryDataContext) {
    throw new Error(
      'No treasuryDataContext.Provider found when calling useTreasuryDataProviderContext.'
    )
  }

  return useTreasuryDataContext
}

export const TreasuryDataProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [treasuryData, setTreasuryData] = useState<TreasuryDetailsProps | null>(
    null
  )
  const { loading, treasury } = useTreasury()

  useEffect(() => {
    if (treasury) {
      setTreasuryData(treasury)
    }
  }, [treasury])

  return (
    <TreasuryDataProviderContext.Provider
      value={{
        data: treasuryData,
        loading,
      }}
    >
      {children}
    </TreasuryDataProviderContext.Provider>
  )
}
