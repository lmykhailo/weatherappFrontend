import Feels from '../../assets/Icons/TilesComponentIcons/Feels'
import Wind from '../../assets/Icons/TilesComponentIcons/Wind'
import Humidity from '../../assets/Icons/TilesComponentIcons/Humidity'
import Visibility from '../../assets/Icons/TilesComponentIcons/Visibility'
import Pressure from '../../assets/Icons/TilesComponentIcons/Pressure'
import Pop from '../../assets/Icons/TilesComponentIcons/Pop'

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
  title: string
  info: string
  description: string
}

const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
  pressure: Pressure,
  pop: Pop,
}

const Tiles = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]
  return (
    <article
      className="mb-5 flex h-[130px] w-[140px] flex-col justify-between
      rounded-lg bg-white/20 p-2 text-zinc-700 drop-shadow-lg backdrop-blur-lg"
    >
      <div className="flex items-center text-sm font-bold">
        <Icon /> <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>
      <p className="text-xs font-bold">{description}</p>
    </article>
  )
}

export default Tiles
