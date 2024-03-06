type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  text: string
}

const ModalWindowDelete = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  text,
}: Props) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="font-bold text-lg">{title}</h2>
        <p className="my-2">{text}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
          >
            Close
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalWindowDelete
