import { useEffect, useState } from 'react'
import { searchResultType } from '../../types/searchResultType'
import { forecastType } from '../../types/forecastType'
import { dbResultType } from '../../types/dbResultType'
import CityPanelInformation from '../CityPanelInformation/CityPanelInformation'
import ButtonsCityPanel from '../../shared/ButtonsCityPanel/ButtonsCityPanel'
import ModalWindowDelete from '../ModalWindowDelete/ModalWindowDelete'
type Props = {
  res: dbResultType
  onLocationSelect: (res: dbResultType) => void
  onDeleteForecast: (x: number) => void
  isModalOpen: boolean
  toggleModal: () => void
}

const CityPanel = ({
  res,
  onLocationSelect,
  onDeleteForecast,
  isModalOpen,
  toggleModal,
}: Props): JSX.Element => {
  const [city, setCity] = useState<string>('')
  const [location, setLocation] = useState<searchResultType | null>(null)
  const [forecast, setForecast] = useState<forecastType | null>(null)
  const [informationPanel, setInformationPanel] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const onCityFetch = (res: dbResultType) => {
    setLocation(res)
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${res.lat}&units=metric&lon=${res.lon}&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = { ...data.city, list: data.list.slice(0, 24) }
        setForecast(forecastData)
      })
  }
  const onButtonClickDelete = () => {
    onDeleteForecast(res.id)
  }
  const onModalOpen = () => {
    setShowModal(true)
    toggleModal()
  }
  const onModalClose = () => {
    setShowModal(false)
    toggleModal()
  }
  const onButtonClickOpen = () => {
    onLocationSelect(res)
    setCity(' ')
  }

  const toggleInformationPanel = () => {
    setInformationPanel((prevState) => !prevState)
  }

  useEffect(() => {
    onCityFetch(res)
  }, [])

  useEffect(() => {
    if (location) {
      setCity(location.name)
    }
  }, [location])

  return (
    <>
      {forecast ? (
        <>
          <section
            className="mb-5 w-full rounded-lg bg-white/20 pb-2
  drop-shadow-lg backdrop-blur-lg hover:cursor-pointer sm:mx-2 sm:max-w-[400px] "
            onClick={toggleInformationPanel}
          >
            <CityPanelInformation forecast={forecast}></CityPanelInformation>
            {informationPanel ? (
              <>
                <ButtonsCityPanel
                  onButtonClickDelete={onModalOpen}
                  onButtonClickOpen={onButtonClickOpen}
                ></ButtonsCityPanel>
              </>
            ) : (
              <></>
            )}
            <ModalWindowDelete
              isOpen={isModalOpen}
              text="Are you sure you want to delete this forecast from your main page?"
              title="Confirm deletion"
              onClose={onModalClose}
              onConfirm={onButtonClickDelete}
            ></ModalWindowDelete>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default CityPanel
