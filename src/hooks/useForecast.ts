import { ChangeEvent, useEffect, useState } from 'react'
import { searchResultType } from '../types/searchResultType'
import { forecastType } from '../types/forecastType'

const LIMIT = 5

const useForecast = () => {
  const [city, setCity] = useState<string>('')
  const [searchVariants, setSearchVariants] = useState<[]>([])
  const [location, setLocation] = useState<searchResultType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const searchHelper = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=${LIMIT}&appid=${
        process.env.REACT_APP_API_KEY
      }`
    )
      .then((res) => res.json())
      .then((data) => setSearchVariants(data))
  }
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === ' ') return
    setCity(value)
    if (value === '') return
    searchHelper(value)
  }
  const resetForecast = () => {
    setForecast(null)
  }
  const resetSearch = () => {
    setCity('')
    setSearchVariants([])
  }
  const onLocationSelect = (res: searchResultType) => {
    setLocation(res)
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${res.lat}&units=metric&lon=${res.lon}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = { ...data.city, list: data.list.slice(0, 24) }
        setForecast(forecastData)
        resetSearch()
      })
  }
  useEffect(() => {
    if (location) {
      setCity(location.name)
      setSearchVariants([])
    }
  }, [location])
  return {
    city,
    searchVariants,
    forecast,
    onInputChange,
    onLocationSelect,
    resetForecast,
    resetSearch,
  }
}

export default useForecast
