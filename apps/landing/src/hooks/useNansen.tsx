import { useEffect, useState } from 'react'

import { Constants, NansenRequestInfo } from '../global/constant'
import type { StakingResponse, TreasuryAsset } from '../global/type'

import useFetch from './useFetch'

const useNansen = () => {
  const [assets, setAssets] = useState<TreasuryAsset[]>([])
  const arbAssetsData = useFetch(
    `${Constants.URL.NANSEN}wallet/arbitrum/${Constants.ADDRESS.GBC_ARBITRUM}?refresh=false`,
    NansenRequestInfo
  )
  const arbStakingData = useFetch(
    `${Constants.URL.NANSEN}gmxArbitrum/${Constants.ADDRESS.GBC_ARBITRUM}?refresh=false`,
    NansenRequestInfo
  )

  const avaxAssetsData = useFetch(
    `${Constants.URL.NANSEN}wallet/avax/${Constants.ADDRESS.GBC_AVAX}?refresh=false`,
    NansenRequestInfo
  )
  const avaxStakingData = useFetch(
    `${Constants.URL.NANSEN}gmxAvax/${Constants.ADDRESS.GBC_AVAX}?refresh=false`,
    NansenRequestInfo
  )

  useEffect(() => {
    const globalAssets: TreasuryAsset[] = []
    if (!arbAssetsData.loading && arbAssetsData.data) {
      // eslint-disable-next-line prettier/prettier
      (arbAssetsData.data as TreasuryAsset[]).map((a) => {
        globalAssets.push(a)
      })
    }

    if (!arbStakingData.loading && arbStakingData?.data) {
      const data = arbStakingData?.data as StakingResponse

      if (data && data.staking.length >= 0) {
        // eslint-disable-next-line prettier/prettier
        (data.staking[0].tokens as TreasuryAsset[]).map((a) => {
          globalAssets.push(a)
        })
      }
    }

    if (!avaxAssetsData.loading && avaxAssetsData?.data) {
      const data = avaxAssetsData?.data as StakingResponse

      if (data && data.staking?.length >= 0) {
        // eslint-disable-next-line prettier/prettier
        (avaxAssetsData.data as TreasuryAsset[]).map((a) => {
          globalAssets.push(a)
        })
      }
    }

    if (!avaxStakingData.loading && avaxStakingData?.data) {
      const data = avaxStakingData?.data as StakingResponse

      if (data && data.staking?.length >= 0) {
        // eslint-disable-next-line prettier/prettier
        (data.staking[0].tokens as TreasuryAsset[]).map((a) => {
          globalAssets.push(a)
        })
      }
    }

    setAssets(globalAssets.filter((a) => a.balance > 1))
  }, [
    avaxStakingData.loading,
    avaxAssetsData.loading,
    arbAssetsData.loading,
    arbStakingData.loading,
  ])
  return { assets }
}

export default useNansen
