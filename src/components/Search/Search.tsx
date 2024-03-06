import { useState, ChangeEvent, useEffect } from 'react'
import SearchBar from '../../shared/SearchBar/SearchBar'
import CityPanel from '../CityPanel/CityPanel'
import { searchResultType } from '../../types/searchResultType'
import useBackend from '../../hooks/useForecastBackend'
import './Search.css'
import { dbResultType } from '../../types/dbResultType'
import LoaderSpin from '../../shared/LoaderSpin/LoaderSpin'
type Props = {
  city: string
  searchVariants: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onLocationSelect: (res: searchResultType) => void
  resetSearch: () => void
}

const Search = ({
  city,
  onInputChange,
  searchVariants,
  onLocationSelect,
  resetSearch,
}: Props): JSX.Element => {
  const { getForecasts, getUserForecasts, deleteForecast } = useBackend()

  const [cities, setCities] = useState<dbResultType[]>([])
  const [loading, setLoading] = useState(false)
  const [deleteCount, setDeleteCount] = useState(0)
  const [modalOpenCityId, setModalOpenCityId] = useState<number | null>(null)

  const toggleModal = (cityId: number) => {
    setModalOpenCityId((prevId) => (prevId === cityId ? null : cityId))
  }

  const onDeleteForecast = async (x: number) => {
    try {
      await deleteForecast(x)
      console.log('Forecast Deleted!')
      setDeleteCount((prevCount) => prevCount + 1)
    } catch (error) {
      console.error('Failed to delete forecast:', error)
    }
  }

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true)
      try {
        const fetchedCities = await getUserForecasts()
        if (fetchedCities) {
          setCities(fetchedCities)
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCities()
  }, [deleteCount])

  return (
    <section
      className="mt-5 flex h-auto w-full max-w-[500px] flex-col items-center justify-center rounded-md
       bg-white bg-opacity-20 p-4  text-center text-zinc-700 drop-shadow-lg
        backdrop-blur-lg md:px-8 lg:p-20"
    >
      <div>
        <h1 className="text-2xl font-black">WEATHER FORECAST</h1>
        <p className="text-small font-bald mb-2 mt-2">Search for a city</p>
      </div>
      <SearchBar
        city={city}
        onInputChange={onInputChange}
        searchVariants={searchVariants}
        onLocationSelect={onLocationSelect}
        resetSearch={resetSearch}
      ></SearchBar>
      <div className="mb-5 w-full rounded-lg bg-blue-600 py-2">
        <p className="text-center text-white">
          {cities.length != 0
            ? 'Your personalized forecast for today'
            : 'You can add cities on forecast page to create personolized forecast!'}
        </p>
      </div>
      {loading ? (
        <LoaderSpin />
      ) : (
        cities.map((x) => (
          <CityPanel
            key={x.id}
            res={x}
            onLocationSelect={onLocationSelect}
            onDeleteForecast={onDeleteForecast}
            isModalOpen={modalOpenCityId === x.id}
            toggleModal={() => toggleModal(x.id)}
          ></CityPanel>
        ))
      )}
    </section>
  )
}

export default Search
