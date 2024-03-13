import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { shortenAddress } from '../../../global/gmx-middleware/utils'
import type { IBlueberryLadder } from '../../../global/middleware'
import type { LeaderboardProps } from '../../../global/type'
import { Table } from '../../mollecules'
import DisplayBerry from '../DisplayBerry/DisplayBerry'

import DisplayTraderScore from './DisplayTraderScore'

const LightLeaderboardTable = ({
  traders,
  currentMetric,
  metrics,
  totalScore,
}: LeaderboardProps) => {
  const [rows, setRows] = useState<IBlueberryLadder[]>([])
  const columns = React.useMemo(
    () => [
      {
        Cell: ({ cell }: any) => <div className="flex font-bold">{cell.row.values.rank}</div>,
        Header: 'Rank',
        accessor: 'rank',
        disableFilters: true,
      },
      {
        Cell: ({ cell }: any) => (
          <div className="flex w-full flex-row gap-4 sm:">
            <div>
              <DisplayBerry address={cell.row.values.account} classes="w-12 rounded-full" />
            </div>
            <div className="pt-1">
              <span className="h-full leading-10 font-bold align-middle text-secondary-content text-sm">
                {shortenAddress(cell.row.values.account)}
              </span>
            </div>
          </div>
        ),
        Header: 'Player',
        accessor: 'account',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Cell: ({ cell }: any) => (
          <DisplayTraderScore
            score={cell.row.values.score}
            estFeePool={metrics.estFeePool}
            totalScore={totalScore}
            currentMetric={currentMetric}
          />
        ),
        Header: 'Cashprize',
        accessor: 'score',
        disableFilters: true,
      },
    ],
    [],
  )

  useEffect(() => {
    setRows(traders?.slice(0, 3) || [])
  }, [traders])

  return (
    <Table
      columns={columns}
      data={rows}
      hideHeader={true}
      viewMoreHref="trading"
      viewMoreText="Discover GBC Trading"
      hiddenHeaderMobile={['Player']}
    />
  )
}

export default LightLeaderboardTable
