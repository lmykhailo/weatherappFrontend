import React, { ChangeEvent, useEffect, useState } from 'react'
import useForecast from '../../hooks/useForecast'
import ButtonForecastPage from '../ButtonForecastPage/ButtonForecastPage'
import Forecast from '../Forecast/Forecast'
import ArrowLeft from '../../assets/Icons/SearchBarIcons/ArrowLeft'
import PlusSign from '../../assets/Icons/SearchBarIcons/PlusSign'
import ModalWindow from '../ModalWindow/ModalWindowForecast'
import SearchBar from '../SearchBar/SearchBar'
import { forecastType } from '../../types/forecastType'
import { searchResultType } from '../../types/searchResultType'

type Props = {
  city: string
  searchVariants: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onLocationSelect: (res: searchResultType) => void
  onModalOpen: () => void
  resetForecast: () => void
  resetSearch: () => void
}

const ForecastTopBar = ({
  city,
  searchVariants,
  onInputChange,
  onLocationSelect,
  onModalOpen,
  resetForecast,
  resetSearch,
}: Props) => {
  return (
    <div className="mt-3 flex items-center justify-center">
      <ButtonForecastPage
        onClick={resetForecast}
        className="mb-3 mr-2 inline-flex items-center rounded-md bg-blue-700 px-3.5 py-1.5 font-bold text-white hover:bg-blue-600"
        buttonText="Back"
      >
        <ArrowLeft />
      </ButtonForecastPage>
      <SearchBar
        city={city}
        onInputChange={onInputChange}
        searchVariants={searchVariants}
        onLocationSelect={onLocationSelect}
        resetSearch={resetSearch}
      />
      <ButtonForecastPage
        onClick={onModalOpen}
        className="mb-3 ml-2 inline-flex items-center rounded-md bg-blue-700 px-4 py-1.5 font-bold text-white hover:bg-blue-600"
        buttonText="Add"
      >
        <PlusSign />
      </ButtonForecastPage>
    </div>
  )
}

export default ForecastTopBar
