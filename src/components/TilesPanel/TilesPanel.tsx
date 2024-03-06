import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../../functions'
import { forecastType } from '../../types/forecastType'

import Sunrise from '../../assets/Icons/TilesComponentIcons/Sunrise'
import Sunset from '../../assets/Icons/TilesComponentIcons/Sunset'
import Tiles from '../../shared/Tiles.tsx/Tiles'

type Props = {
  data: forecastType
  today: forecastType['list'][0]
}

const TilesPanel = ({ data, today }: Props) => {
  return (
    <div className="sm:mx-2 sm:max-w-[400px] md:max-w-[400px] lg:max-w-[500px]">
      {' '}
      <section className="flex flex-wrap justify-between text-zinc-700">
        <div
          className="mb-5 flex w-[140px] flex-col items-center rounded-lg
     bg-white/20 py-4 text-xs 
       font-bold drop-shadow-lg backdrop-blur-lg"
        >
          <Sunrise></Sunrise>
          <p className="mt-2 text-base font-black">
            {getSunTime(data.sunrise)}
          </p>
        </div>
        <div
          className="mb-5 flex w-[140px] flex-col items-center rounded-lg
     bg-white/20 py-4 text-xs 
       font-bold drop-shadow-lg backdrop-blur-lg"
        >
          <Sunset></Sunset>
          <p className="mt-2 text-base font-black">{getSunTime(data.sunset)}</p>
        </div>
        <Tiles
          icon="wind"
          title="Wind"
          info={`${Math.round(today.wind.speed)} km/h`}
          description={`${getWindDirection(
            Math.round(today.wind.deg)
          )}, gusts ${today.wind.gust.toFixed(1)} km/h`}
        />
        <Tiles
          icon="feels"
          title="Feels like"
          info={`${Math.ceil(today.main.temp_max)} C`}
          description={`Feels ${
            today.main.feels_like < today.main.temp ? 'colder' : 'warmer'
          }`}
        ></Tiles>
        <Tiles
          icon="humidity"
          title="Humidity"
          info={`${today.main.humidity}%`}
          description={getHumidityValue(today.main.humidity)}
        ></Tiles>
        <Tiles
          icon="pressure"
          title="Pressure"
          info={`${today.main.pressure} hPa`}
          description={`It is ${today.main.pressure < 1013 ? 'low' : 'high'}`}
        ></Tiles>
        <Tiles
          icon="pop"
          title="Precipitation"
          info={`${Math.round(today.pop * 1000)}%`}
          description={`${getPop(today.pop)},clouds at ${today.clouds.all}`}
        ></Tiles>
        <Tiles
          icon="visibility"
          title="Visibility"
          info={`${today.visibility}`}
          description={`${getVisibilityValue(today.visibility)}`}
        ></Tiles>
      </section>
    </div>
  )
}

export default TilesPanel
