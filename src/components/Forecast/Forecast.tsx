import TopOfForecast from '../TopOfForecast/TopOfForecast'
import HourlyForecast from '../HourlyForecast/HourlyForecast'
import TilesPanel from '../TilesPanel/TilesPanel'
import { forecastType } from '../../types/forecastType'
import { useEffect } from 'react'
type Props = {
  data: forecastType | null
}

const Forecast = ({ data }: Props): JSX.Element => {
  console.log('Forecast data:', data)
  if (!data) {
    return <></>
  }

  const today = data.list[0]

  return (
    <div
      className="backdrop-blur-ls flex h-full w-full max-w-full flex-col rounded-md 
       bg-white bg-opacity-20 py-4 drop-shadow-lg sm:max-w-[400px] 
       md:max-w-[500px] md:px-10 md:py-4 lg:px-24"
    >
      <TopOfForecast data={data} today={today}></TopOfForecast>
      <HourlyForecast data={data}></HourlyForecast>
      <TilesPanel data={data} today={today}></TilesPanel>
    </div>
  )
}

export default Forecast
