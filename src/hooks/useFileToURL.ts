import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { ChangeEvent, useState } from 'react'

const useFileToURL = () => {
  const [photoURL, setPhotoURL] = useState('')
  const [storageDestination, setStorageDestination] = useState('')

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const storage = getStorage()
      const storageRef = ref(storage, storageDestination + '/' + file.name)

      const snapshot = await uploadBytes(storageRef, file)
      const photoURL = await getDownloadURL(snapshot.ref)
      setPhotoURL(photoURL)
    } catch (error) {
      console.error('Error uploading file: ', error)
    }
    e.target.value = ''
  }
  return {
    photoURL,
    handleFileChange,
    storageDestination,
    setStorageDestination,
  }
}

export default useFileToURL
