import { ChangeEvent } from 'react'
import { searchResultType } from '../../types/searchResultType'
import SearchIcon from '../../assets/Icons/SearchBarIcons/SearchIcon'
import ResetIcon from '../../assets/Icons/SearchBarIcons/ResetIcon'

type Props = {
  city: string
  searchVariants: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onLocationSelect: (res: searchResultType) => void
  resetSearch: () => void
}

const SearchBar = ({
  city,
  onInputChange,
  searchVariants,
  onLocationSelect,
  resetSearch,
}: Props) => {
  const onButtonClick = (searchResult: searchResultType) => {
    onLocationSelect(searchResult)
  }
  return (
    <div className="relative mb-5 mt-5 grid w-full place-items-center md:mt-2">
      <div className="flex w-full items-center">
        <input
          type="text"
          value={city}
          className="w-full rounded-md border-2 border-white px-2 py-0.5 text-lg"
          onChange={onInputChange}
        />
        {city && (
          <button onClick={resetSearch}>
            <ResetIcon />
          </button>
        )}
      </div>
      <ul className="absolute top-full z-10 w-full rounded-b-md bg-white">
        {searchVariants.length > 0 &&
          searchVariants.map(
            (searchResult: searchResultType, index: number) => (
              <li className="w-full" key={searchResult.name + '#' + index}>
                <button
                  className="flex w-full cursor-pointer items-center px-4 py-2 text-left text-sm hover:bg-zinc-700 hover:text-white"
                  onClick={() => {
                    onButtonClick(searchResult)
                  }}
                >
                  <SearchIcon></SearchIcon>
                  <p className="ml-2">
                    {searchResult.name}, {searchResult.country}
                  </p>
                </button>
              </li>
            )
          )}
      </ul>
    </div>
  )
}

export default SearchBar
