import { forecastType } from '../../types/forecastType'

type Props = {
  forecast: forecastType
}

const CityPanelInformation = ({ forecast }: Props) => {
  const today = forecast?.list[0]
  return (
    <>
      {' '}
      <img
        alt={`weather-icon-${today?.weather[0].description}`}
        src={`https://openweathermap.org/img/wn/${today?.weather[0].icon}@2x.png`}
        className="w-[75px] absolute h-[75px] mx-3 mt-1"
      />
      <h2 className="text-xl text-right font-black mt-2 mx-3 ">
        {forecast.name}
      </h2>
      <h1 className="text-2xl text-right mx-3 mt-1 font-bold">
        {Math.round(today?.main.temp || 0)} C
      </h1>
      <h1 className="text-m text-right mx-3 font-bold">
        H: {Math.ceil(today?.main.temp_max || 0)} L:{' '}
        {Math.floor(today?.main.temp_min || 0)}
      </h1>
      <h1 className="text-s text-left -mt-6 ml-6 font-bold">
        {today?.weather[0].main}
      </h1>
    </>
  )
}

export default CityPanelInformation
