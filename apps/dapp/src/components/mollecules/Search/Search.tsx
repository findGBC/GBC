type SearchProps = {
  isMobile: boolean
}

const Search = ({ isMobile }: SearchProps) => {
  return (
    <form>
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
          className="bg-base-100 ps-10 border-base-200 block w-full h-12 p-4 text-sm border rounded-xl"
          placeholder="Search for profile"
          required
        />
      </div>
    </form>
  )
}
export default Search
