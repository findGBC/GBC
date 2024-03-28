import React, { useEffect, useState } from 'react'

import type { IBlueberryLadder } from '../../../global/middleware'
import type { LeaderboardProps } from '../../../global/type'
import { Table } from '../../mollecules'
import DisplayDefaultBerry from '../DisplayDefaultBerry/DisplayDefaultBerry'
import DisplayName from '../DisplayName/DisplayName'

import { DisplayPerformance, DisplayRoiPerformance } from './DisplayPerformance'
import DisplayTraderScore from './DisplayTraderScore'

const LeaderboardTable = ({ traders, currentMetric, metrics, totalScore }: LeaderboardProps) => {
  const [rows, setRows] = useState<IBlueberryLadder[]>([])
  const defaultFilters = { disableFilters: true, disableSortBy: true }
  const columns = React.useMemo(
    () => [
      {
        Cell: ({ cell }: any) => <div className="flex font-bold">{cell.row.values.rank}</div>,
        Header: 'Rank',
        accessor: 'rank',
        ...defaultFilters,
      },
      {
        Cell: ({ cell }: any) => (
          <div className="flex w-full flex-row gap-4 sm:">
            <div>
              <DisplayDefaultBerry address={cell.row.values.account} classes="w-12 rounded-full" />
            </div>
            <div className="pt-1">
              <span className="font-bold align-middle text-secondary-content text-sm">
                <DisplayName address={cell.row.values.account} />
              </span>
            </div>
          </div>
        ),
        Header: 'Player',
        accessor: 'account',
        ...defaultFilters,
      },
      {
        Cell: ({ cell }: any) => (
          <div className="font-bold text-secondary-content justify-center">
            {cell.row.values.winCount} / {cell.row.values.lossCount}
          </div>
        ),
        Header: 'Win/Loss',
        accessor: 'winCount',
        ...defaultFilters,
      },
      {
        Cell: ({ cell }: any) =>
          currentMetric === 'pnl' ? (
            <DisplayPerformance score={cell.row.values.score} />
          ) : (
            <DisplayRoiPerformance roi={cell.row.values.score} />
          ),
        Header: currentMetric === 'pnl' ? 'Pnl' : 'Roi',
        accessor: 'cumCollateral',
        ...defaultFilters,
      },
      {
        Cell: ({ cell }: any) => (
          <DisplayTraderScore
            score={cell.row.values.score}
            estFeePool={metrics.estFeePool}
            currentMetric={currentMetric}
            totalScore={totalScore}
          />
        ),
        Header: 'Cashprize',
        accessor: 'score',
        ...defaultFilters,
      },
      {
        accessor: 'lossCount',
      },
      {
        accessor: 'cumSize',
      },
      {
        accessor: 'maxCollateral',
      },
      {
        accessor: 'pnl',
      },
    ],
    [],
  )

  useEffect(() => {
    setRows(traders || [])
  }, [traders])

  return (
    <Table
      columns={columns}
      data={rows}
      hiddenColumns={['lossCount', 'cumSize', 'maxCollateral', 'pnl']}
      showPagination={true}
      hiddenHeaderMobile={['Player']}
      clickableRow={true}
      rowBaseLink="/profile"
      rowCellSubLink="account"
    />
  )
}

export default LeaderboardTable
