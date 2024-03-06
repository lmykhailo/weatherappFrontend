import { useContext } from 'react'
import { forecastType } from '../../types/forecastType'
import { Auth } from 'firebase/auth'
import { dbQueryType } from '../../types/dbQueryType'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../..'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreateForecast: (data: dbQueryType) => void
  title: string
  text: string
  forecast: forecastType
  error: boolean
}

const ModalWindowForecast = ({
  isOpen,
  onClose,
  onCreateForecast,
  title,
  text,
  forecast,
  error,
}: Props) => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const [user] = useAuthState(auth)

  const extractSearchResult = (
    forecast: forecastType
  ): dbQueryType | undefined => {
    if (user) {
      return {
        name: forecast.name,
        country: forecast.country,
        lat: forecast.coord.lat,
        lon: forecast.coord.lon,
        uid: user?.uid,
      }
    }
    return undefined
  }

  const data = extractSearchResult(forecast)

  const onConfirm = () => {
    if (data) {
      onCreateForecast(data)
    }
  }

  if (!isOpen) return null

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-4 shadow-lg">
        {error ? (
          <>
            <h2 className="text-lg font-bold">Error!</h2>
            <p className="my-2 text-lg text-red-500">
              You can not add the same city twice!
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="my-2">{text}</p>
          </>
        )}

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Close
          </button>
          {error ? (
            <></>
          ) : (
            <button
              onClick={onConfirm}
              className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalWindowForecast
