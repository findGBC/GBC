import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
import React from 'react'
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useExpanded,
} from 'react-table'

import { getKey } from '../../../global/helpers'
import type { TableInstanceWithHooks } from '../../../global/type'

export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}: any) {
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  return (
    <select
      className="select bg-base-300 text-xs"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: any) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

export default function Table({
  columns,
  data,
  renderRowSubCompontent,
  showPagination,
  hiddenColumns,
}: any) {
  const defaultColumn = React.useMemo<any>(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        hiddenColumns: hiddenColumns,
      },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  ) as TableInstanceWithHooks<any>

  return (
    <>
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="md:table-xs table w-full table-fixed"
        >
          <thead>
            {headerGroups.map((headerGroup: any, index: number) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={getKey(index.toString())}
              >
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={getKey(index.toString())}
                  >
                    <p className="mb-2">{column.render('Header')}</p>
                    <span className="relative">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowUpIcon className="text-primary absolute right-0 w-4" />
                        ) : (
                          <ArrowDownIcon className="text-secondary absolute right-0 w-4" />
                        )
                      ) : (
                        ''
                      )}
                    </span>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i) => {
              prepareRow(row)
              return (
                <>
                  <tr
                    className="border-neutral mt-2 border-t"
                    key={getKey(i.toString())}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell: any, j: number) => {
                      return (
                        <td
                          className="bg-base-200"
                          {...cell.getCellProps()}
                          key={getKey(j.toString())}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr key={getKey(i.toString())}>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubCompontent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </>
              )
            })}
          </tbody>
        </table>
      </div>

      <br />
      {showPagination ? (
        <div className="pagination">
          <button
            className="btn"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </button>{' '}
          <button
            className="btn"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {'<'}
          </button>{' '}
          <button
            className="btn"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {'>'}
          </button>{' '}
          <button
            className="btn"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <select
            className="select select-bordered"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </>
  )
}
