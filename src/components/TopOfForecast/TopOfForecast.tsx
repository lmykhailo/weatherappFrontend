import { forecastType } from '../../types/forecastType'

type Props = {
  data: forecastType
  today: forecastType['list'][0]
}

const TopOfForecast = ({ data, today }: Props) => {
  return (
    <div>
      {' '}
      <section className="text-center">
        <h2 className="text-2xl font-black mt-2">
          {data.name},{data.country}
        </h2>
        <h1 className="text-4xl font-extrabold mt-2">
          {Math.round(today.main.temp)} C
        </h1>

        <p className="font-bold mt-3">
          MAX: {Math.ceil(today.main.temp_max)} C MIN:{' '}
          {Math.floor(today.main.temp_min)} C
        </p>
      </section>
      <section className="mt-2 text-center w-auto">
        <p>
          {today.weather[0].main}
          {'  '}
          {today.weather[0].description}
        </p>
      </section>
    </div>
  )
}

export default TopOfForecast
