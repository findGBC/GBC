import React, { useEffect, useState } from 'react'

import arbScanIcon from '../../assets/img/treasury/arbiscan.svg'
import snowTraceIcon from '../../assets/img/treasury/snowtrace.svg'
import { Button } from '../../components/atoms'
import Table from '../../components/mollecules/Table/Table'
import { Constants } from '../../global/constant'
import { ButtonType } from '../../global/enum'
import type { TreasuryAsset, TreasuryDetailsProps } from '../../global/type'
import { useI18nContext } from '../../i18n/i18n-react'

const TreasuryDetails: React.FC<TreasuryDetailsProps> = ({ arbitrumBalances, avalancheBalances }) => {
  const { LL } = useI18nContext()
  const [rows, setRows] = useState<TreasuryAsset[]>([])
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
          <div className="flex">
            <div>
              <img className="w-6" src={cell.row.values.logo} alt=""></img>
            </div>
            <div className="ml-4">{cell.row.values.name}</div>
          </div>
        ),
        Header: 'Token',
        accessor: 'name',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Cell: ({ cell }: any) => <>{cell.row.values.balance.toFixed(1)}</>,
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
        Cell: ({ cell }: any) => (
          <>$ {(cell.row.values.price * cell.row.values.balance).toFixed(1)}</>
        ),
        Header: LL.SHARED.VALUE(),
        accessor: 'value',
        disableFilters: true,
      },
    ],
    []
  )

  useEffect(() => {
    setRows([...arbitrumBalances, ...avalancheBalances]);
  }, [arbitrumBalances, avalancheBalances]);

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
          data={rows.filter((r) => r.chain == 'ARBITRUM')}
          hiddenColumns={['logo']}
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
          data={rows.filter((r) => r.chain == 'AVAX')}
          hiddenColumns={['logo']}
        />
      </div>
    </>
  )
}

export default TreasuryDetails
