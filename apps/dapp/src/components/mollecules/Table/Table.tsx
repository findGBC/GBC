import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'
import { useTable, usePagination, useSortBy, useFilters, useExpanded } from 'react-table'

import { ButtonType } from '../../../global/enum'
import { getKey } from '../../../global/helpers'
import type { TableInstanceWithHooks } from '../../../global/type'
import { Button } from '../../atoms'

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

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }: any) {
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
  hiddenColumns = [],
  hideHeader = false,
  hiddenHeaderMobile = [],
  viewMoreHref,
  viewMoreText,
  clickableRow = false,
  rowBaseLink,
  rowCellSubLink,
}: any) {
  const defaultColumn = React.useMemo<any>(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  )
  const {
    getTableProps,
    headerGroups,
    prepareRow,
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
    usePagination,
  ) as TableInstanceWithHooks<any>

  const rowClasses =
    ' flex rounded-xl justify-between sm:flex-row sm:justify-around sm:items-center '

  return (
    <div className="w-full">
      <div {...getTableProps()} className="space-y-4">
        {!hideHeader
          ? headerGroups.map((headerGroup: any, index: number) => (
              <div
                {...headerGroup.getHeaderGroupProps()}
                key={getKey(index.toString())}
                className={rowClasses + ' hidden sm:px-4 sm:flex '}
              >
                {headerGroup.headers.map((column: any, j: number) => (
                  <div
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={getKey(index.toString())}
                    className={
                      ' text-neutral flex ' +
                      (j === 0 ? ' sm:flex-none sm:w-14' : ' sm:flex-auto sm:justify-center')
                    }
                  >
                    {column.render('Header')}
                    <span className="relative">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowUpIcon className="text-primary abs4olute right-0 w-4" />
                        ) : (
                          <ArrowDownIcon className="text-secondary absolute right-0 w-4" />
                        )
                      ) : null}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </div>
                ))}
              </div>
            ))
          : null}
        {page.map((row: any, i) => {
          prepareRow(row)

          let link = ''

          if (clickableRow) {
            const sublink = row.cells.filter((cell: any) => {
              return cell.column.id === rowCellSubLink
            })[0].value
            link = clickableRow ? `${rowBaseLink}/${sublink}` : ''
          }

          return (
            <>
              <Link
                to={link}
                className={
                  rowClasses +
                  ' flex-col p-4 bg-base-100 hover:bg-base-200 hover:cursor-pointer duration-300'
                }
                key={getKey(i.toString())}
                {...row.getRowProps()}
              >
                {row.cells.map((cell: any, j: number) => {
                  return (
                    <div
                      {...cell.getCellProps()}
                      key={getKey(j.toString())}
                      className={
                        'flex flex-row justify-between sm:justify-around  space-y-2 sm:space-y-0 sm:flex-row sm:flex-1 ' +
                        (j === 0 ? ' sm:flex-none sm:w-14 ' : '')
                      }
                    >
                      {hiddenHeaderMobile.includes(cell.column.Header) ? null : (
                        <div className="flex sm:hidden items-center text-base-100-content">
                          {cell.column.Header}
                        </div>
                      )}

                      {cell.render('Cell')}
                    </div>
                  )
                })}
              </Link>
              {row.isExpanded && renderRowSubCompontent ? (
                <div key={getKey(i.toString())}>
                  <div>{renderRowSubCompontent({ row })}</div>
                </div>
              ) : null}
            </>
          )
        })}

        {viewMoreHref ? (
          <>
            <Button btnType={ButtonType.Primary} url={viewMoreHref} className={'w-full my-4'}>
              {viewMoreText}
            </Button>
          </>
        ) : null}
      </div>
      {showPagination ? (
        <div className="mt-4 flex flex-col justify-center">
          <div className="flex justify-center">
            <button className="btn m-1" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button className="btn m-1" onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button className="btn m-1" onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              className="btn m-1"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>
          </div>
          <div className="flex justify-center gap-2 align-middle">
            <div>Page</div>
            <div>
              <span className="">
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
            </div>
            <div>
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
          </div>
        </div>
      ) : null}
    </div>
  )
}
