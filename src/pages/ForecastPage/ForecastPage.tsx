import { ChangeEvent, useContext, useState } from 'react'
import useBackend from '../../hooks/useForecastBackend'
import { searchResultType } from '../../types/searchResultType'
import Forecast from '../../components/Forecast/Forecast'
import ForecastTopBar from '../../shared/ForecastTopBar/ForecastTopBar'
import ModalWindowForecast from '../../components/ModalWindow/ModalWindowForecast'
import { forecastType } from '../../types/forecastType'
import { dbQueryType } from '../../types/dbQueryType'

type Props = {
  city: string
  searchVariants: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  forecast: forecastType
  resetForecast: () => void
  onLocationSelect: (res: searchResultType) => void
  resetSearch: () => void
}

const ForecastPage = ({
  forecast,
  resetForecast,
  onLocationSelect,
  city,
  searchVariants,
  onInputChange,
  resetSearch,
}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [errorForecastExist, setErrorForecastExist] = useState(false)

  const { createForecast } = useBackend()

  const onCreateForecast = async (data: dbQueryType) => {
    try {
      const response = await createForecast(data)
      console.log(response)
      if (response === null) {
        setErrorForecastExist(true)
        console.log(errorForecastExist)
      } else {
        console.log('Forecast Created!')
        setShowModal(false)
      }
    } catch (error) {
      console.error('Failed to create forecast:', error)
    }
  }

  const onModalOpen = () => {
    setShowModal(true)
  }
  const onModalClose = () => {
    setShowModal(false)
    setErrorForecastExist(false)
  }
  return (
    <div className="w-full md:w-auto">
      <ForecastTopBar
        onModalOpen={onModalOpen}
        resetForecast={resetForecast}
        resetSearch={resetSearch}
        city={city}
        searchVariants={searchVariants}
        onInputChange={onInputChange}
        onLocationSelect={onLocationSelect}
      ></ForecastTopBar>
      <Forecast data={forecast}></Forecast>
      <ModalWindowForecast
        isOpen={showModal}
        onClose={onModalClose}
        onCreateForecast={onCreateForecast}
        forecast={forecast}
        title="Add city"
        text="Are you sure that you want to add this city to the home page?"
        error={errorForecastExist}
      />
    </div>
  )
}

export default ForecastPage
