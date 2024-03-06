import { useContext, useState } from 'react'
import { dbResultType } from '../types/dbResultType'
import { Auth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'
import { dbQueryType } from '../types/dbQueryType'

const baseUrl = 'http://localhost:8080'

const useForecastBackend = () => {
  const [error, setError] = useState(null)
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const [user] = useAuthState(auth)

  const fetchData = async (endpoint: string, options = {}) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options)
      console.log(`${baseUrl}${endpoint}`)
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error: any) {
      setError(error)
      return null
    }
  }

  const getForecasts = async () => {
    return await fetchData('/api/forecasts')
  }

  const getUserForecasts = async () => {
    if (!user?.uid) return null

    return await fetchData('/api/userforecasts', {
      headers: {
        'Content-Type': 'application/json',
        'X-User-UID': user.uid,
      },
    })
  }

  const getOneForecast = async (id: number) => {
    return await fetchData(`/api/forecasts/${id}`)
  }

  const createForecast = async (data: dbQueryType) => {
    return await fetchData('/api/forecasts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const updateForecast = async (id: number, data: dbResultType) => {
    return await fetchData(`/api/forecasts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const deleteForecast = async (id: number) => {
    return await fetchData(`/api/forecasts/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    getForecasts,
    getOneForecast,
    createForecast,
    updateForecast,
    deleteForecast,
    getUserForecasts,
    error,
  }
}

export default useForecastBackend
