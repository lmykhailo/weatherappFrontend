import { useContext, useEffect, useState } from 'react'
import useForecast from '../../hooks/useForecast'
import useBackend from '../../hooks/useForecastBackend'
import { searchResultType } from '../../types/searchResultType'
import ForecastTopBar from '../../components/ForecastTopBar/ForecastTopBar'
import Forecast from '../../components/Forecast/Forecast'
import Search from '../../components/Search/Search'
import ModalWindowForecast from '../../components/ModalWindow/ModalWindowForecast'
import ForecastPage from '../ForecastPage/ForecastPage'
import { Context } from '../..'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Auth, signOut } from 'firebase/auth'
import SidePostPanel from '../../components/SidePostPanel/SidePostPanel'

const HomeMainPage = (): JSX.Element => {
  const {
    city,
    searchVariants,
    forecast,
    onInputChange,
    onLocationSelect,
    resetForecast,
    resetSearch,
  } = useForecast()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [forecast])
  return (
    <div className="flex h-full flex-col items-start justify-center md:flex-row">
      {forecast ? (
        <ForecastPage
          city={city}
          searchVariants={searchVariants}
          onInputChange={onInputChange}
          forecast={forecast}
          resetForecast={resetForecast}
          resetSearch={resetSearch}
          onLocationSelect={onLocationSelect}
        />
      ) : (
        <>
          <Search
            city={city}
            searchVariants={searchVariants}
            onInputChange={onInputChange}
            onLocationSelect={onLocationSelect}
            resetSearch={resetSearch}
          ></Search>
        </>
      )}
      <div className="top-0 mt-5">
        <SidePostPanel></SidePostPanel>
      </div>
    </div>
  )
}

export default HomeMainPage
