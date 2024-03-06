import { forecastType } from '../../types/forecastType'

type Props = {
  data: forecastType
}

const HourlyForecast = ({ data }: Props) => {
  return (
    <div>
      <section
        className="mx-2 mb-5 mt-4 flex max-w-full flex-shrink overflow-x-scroll rounded-lg
bg-white/20 pb-2 drop-shadow-lg backdrop-blur-lg sm:max-w-[400px]"
      >
        {data.list.map((item, i) => (
          <div
            className="inline-block w-[50px] flex-shrink-0 text-center"
            key={i}
          >
            <p className="text-small">
              {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
            </p>
            <img
              alt={`weather-icon-${item.weather[0].description}`}
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            ></img>
            <p className="text-sm font-bold">{Math.round(item.main.temp)} C</p>
          </div>
        ))}
      </section>
    </div>
  )
}

export default HourlyForecast
