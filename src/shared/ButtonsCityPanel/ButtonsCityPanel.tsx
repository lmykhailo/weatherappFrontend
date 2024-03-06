import ButtonForecastPage from '../ButtonForecastPage/ButtonForecastPage'
import DeleteIcon from '../../assets/Icons/CityPanelIcons/DeleteIcon'
import OpenIcon from '../../assets/Icons/CityPanelIcons/OpenIcon'

type Props = {
  onButtonClickOpen: () => void
  onButtonClickDelete: () => void
}

const ButtonsCityPanel = ({
  onButtonClickDelete,
  onButtonClickOpen,
}: Props) => {
  return (
    <>
      <ButtonForecastPage
        onClick={onButtonClickOpen}
        buttonText="Open"
        className="ml-2 mt-3 inline-flex items-center rounded-md bg-blue-700 px-4 py-1.5 font-bold text-white hover:bg-blue-600 "
      >
        <OpenIcon></OpenIcon>
      </ButtonForecastPage>
      <ButtonForecastPage
        onClick={onButtonClickDelete}
        buttonText="Delete"
        className="ml-2 mt-3 inline-flex items-center rounded-md bg-blue-700 px-4 py-1.5 font-bold text-white hover:bg-blue-600 "
      >
        <DeleteIcon></DeleteIcon>
      </ButtonForecastPage>
    </>
  )
}

export default ButtonsCityPanel
