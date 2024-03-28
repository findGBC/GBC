import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import type { ProfilesQueryResult } from '../../../global/type'
import useBlueberrySearch from '../../../hooks/useBlueberrySearch'
import DisplayDefaultBerry from '../../organism/DisplayDefaultBerry/DisplayDefaultBerry'
import DisplayName from '../../organism/DisplayName/DisplayName'
import Loader from '../Loader/Loader'

type SearchProps = {
  isMobile: boolean
}

type SearchResultsProps = {
  isOpen: boolean
  isLoading: boolean
  profiles: ProfilesQueryResult
}

const SearchResults = ({ isOpen, isLoading, profiles }: SearchResultsProps) => {
  if (!isOpen) return

  return (
    <>
      <div className="bg-base-200 relative mt-5 w-full rounded-xl md:w-72 md:absolute md:top-14">
        <h2 className="text-base-content text-lg p-4">Profiles</h2>
        <div className=" flex flex-col items-center px-5 pb-5">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {profiles && profiles.profiles.length > 0 ? (
                profiles.profiles.map((profile) => (
                  <Link to={'/profile/' + profile.id} className="w-full">
                    <div className="w-full bg-base-300 rounded-xl mb-2 px-5 py-4 flex flex-row">
                      <DisplayDefaultBerry address={profile.id} classes="w-12 rounded-full" />
                      <span className="font-bold align-middle text-secondary-content text-sm pt-4 ml-4">
                        <DisplayName address={profile.id} />
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div>No berries found</div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

const Search = ({}: SearchProps) => {
  const [isSearching, setIsSearching] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const { isLoading, profiles } = useBlueberrySearch(searchInput)

  const handleSearch = (input: string) => {
    if (input.length === 0) {
      setIsSearching(false)
    } else {
      setIsSearching(true)
    }

    setSearchInput(input)
  }

  const location = useLocation()

  useEffect(() => {
    setIsSearching(false)
  }, [location])

  return (
    <div>
      <form className="w-full md:flex md:justify-end">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only">
          Search
        </label>
        <div className="relative">
          <button
            type="submit"
            className="base-text absolute start-2.5 bottom-2 font-medium text-sm px-2 py-2"
          >
            <svg
              className="text-base-100-content w-4 h-4 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
          <input
            type="search"
            id="default-search"
            className="bg-base-100 ps-10 border-base-200 block h-12 p-4 text-sm border rounded-xl w-full md:w-72"
            placeholder="Search for profile"
            required
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </form>
      <SearchResults isOpen={isSearching} isLoading={isLoading} profiles={profiles} />
    </div>
  )
}
export default Search
