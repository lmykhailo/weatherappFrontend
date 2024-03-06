export type forecastType = {
  name: string
  country: string
  sunrise: number
  sunset: number
  coord: {
    lat: number
    lon: number
  }
  list: [
    {
      dt: number
      main: {
        feels_like: number
        humidity: number
        pressure: number
        temp: number
        temp_max: number
        temp_min: number
      }
      weather: [
        {
          main: string
          icon: string
          description: string
        }
      ]
      wind: {
        deg: number
        gust: number
        speed: number
      }
      clouds: {
        all: number
      }
      pop: number
      visibility: number
    }
  ]
}
