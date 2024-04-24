import React, { useEffect, useState } from 'react'

import ArbIcon from '../../assets/img/treasury/arb.svg'
import arbScanIcon from '../../assets/img/treasury/arbiscan.svg'
import GlpIcon from '../../assets/img/treasury/glp.svg'
import snowTraceIcon from '../../assets/img/treasury/snowtrace.svg'
import { Button } from '../../components/atoms'
import Table from '../../components/mollecules/Table/Table'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import type { TreasuryAsset } from '../../global/type'
import { useI18nContext } from '../../i18n/i18n-react'
import { useTreasuryDataProviderContext } from '../../providers/TreasuryDataProvider'

const TreasuryDetails = () => {
  const { LL } = useI18nContext()
  const [rows, setRows] = useState<TreasuryAsset[]>([])
  const { data } = useTreasuryDataProviderContext()

  const getAssetImage = (symbol, imageUrl) => {
    switch (symbol) {
      case 'ARB':
        return ArbIcon
      case 'GLP':
        return GlpIcon
      default:
        return imageUrl
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'logo',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Cell: ({ cell }: any) => (
          <>
            {cell.row.values.logos?.length === 1 || cell.row.values.name === 'GLP' ? (
              <div className="flex">
                <div>
                  <img
                    className="w-6"
                    src={getAssetImage(
                      cell.row.values.name,
                      cell.row.values.logos[0]
                    )}
                    alt=""
                  ></img>
                </div>
                <div className="ml-4">{cell.row.values.name}</div>
              </div>
            ) : (
              <div className="flex">
                <div
                  style={{
                    display: 'block',
                    height: '32px',
                    position: 'relative',
                    width: '32px',
                  }}
                >
                  <img
                    src={cell.row.values.logos[0]}
                    style={{
                      left: '0px',
                      position: 'absolute',
                      size: '24px',
                      top: '0px',
                      width: '24px',
                    }}
                    alt=""
                  />
                  <img
                    src={cell.row.values.logos[1]}
                    style={{
                      bottom: '0px',
                      position: 'absolute',
                      right: '0px',
                      size: '24px',
                      width: '24px',
                    }}
                    alt=""
                  />
                </div>
                <div className="ml-4">{cell.row.values.name}</div>
              </div>
            )}
          </>
        ),
        Header: 'Token',
        accessor: 'logos',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Cell: ({ cell }: any) => (
          <>
            {cell.row.values.balance
              ? cell.row.values.balance.toFixed(1)
              : 'staking'}
          </>
        ),
        Header: LL.SHARED.BALANCE(),
        accessor: 'balance',
        disableFilters: true,
      },
      {
        Cell: ({ cell }: any) => <>$ {cell.row.values.price.toFixed(1)}</>,
        Header: LL.SHARED.PRICE(),
        accessor: 'price',
        disableFilters: true,
      },
      {
        Cell: ({}) => <></>,
        Header: '',
        accessor: 'name',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Cell: ({ cell }: any) => <>$ {cell.row.values.usdValue.toFixed(1)}</>,
        Header: LL.SHARED.VALUE(),
        accessor: 'usdValue',
        disableFilters: true,
      },
    ],
    []
  )

  useEffect(() => {
    if (data) {
      setRows([
        ...(data.arbitrumBalances?.reverse() || []),
        ...(data.avalancheBalances?.reverse() || []),
      ])
    }
  }, [data])

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Arbitrum {LL.SHARED.ASSETS()}</h2>
        <Button
          url={
            Constants.NETWORK.ARBITRUM.EXPLORER + Constants.ADDRESS.GBC_ARBITRUM
          }
          btnType={ButtonType.Ghost}
          border={true}
        >
          <img src={arbScanIcon} alt="ArbScan" />
        </Button>
      </div>
      <div className="bg-base-200 rounded-3xl md:text-base w-full p-5 mt-3 mb-3 text-xs">
        <Table
          columns={columns}
          data={rows.filter((r) => r.chain == 'ARBITRUM').sort((a,b) => b.usdValue - a.usdValue)}
          hiddenColumns={['logo']}
          showPagination={rows.filter((r) => r.chain == 'ARBITRUM').length > 10}
        />
      </div>
      <br />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Avalanche {LL.SHARED.ASSETS()}</h2>
        <Button
          url={
            Constants.NETWORK.AVALANCHE.EXPLORER + Constants.ADDRESS.GBC_AVAX
          }
          btnType={ButtonType.Ghost}
          border={true}
        >
          <img src={snowTraceIcon} alt="SnowTrace" />
        </Button>
      </div>
      <div className="bg-base-200 rounded-3xl md:text-base w-full p-5 mt-3 mb-3 text-xs">
        <Table
          columns={columns}
          data={rows.filter((r) => r.chain == 'AVALANCHE').sort((a,b) => b.usdValue - a.usdValue)}
          hiddenColumns={['logo']}
          showPagination={
            rows.filter((r) => r.chain == 'AVALANCHE').length > 10
          }
        />
      </div>
    </>
  )
}

export default TreasuryDetails
