import {
  Auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from 'firebase/auth'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../..'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

type Props = {
  showEdit: boolean
  onShowEdit: () => void
}

const EditUserInformation = ({ showEdit, onShowEdit }: Props) => {
  const context = useContext(Context)
  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [error, setError] = useState('')
  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const [user] = useAuthState(auth)

  const onShowChangePassword = () => {
    console.log(showChangePassword)
    setShowChangePassword((prevState) => !prevState)
  }

  const reauthenticate = async (currentPassword: string) => {
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      )
      try {
        await reauthenticateWithCredential(user, credential)
        return true
      } catch (error) {
        console.error('Re-authentication failed:', error)
        setError('Current password is incorrect.')
        return false
      }
    } else {
      setError('Unable to re-authenticate. User information is missing.')
      return false
    }
  }

  const updateUserProfile = async (displayName: string, photoURL: string) => {
    if (user) {
      const updates = {
        displayName: user?.displayName,
        photoURL: user.photoURL,
      }

      if (displayName) {
        updates.displayName = displayName
      }

      if (photoURL) {
        updates.photoURL = photoURL
      }

      if (Object.keys(updates).length > 0) {
        await updateProfile(user, updates)
        console.log('User profile updated', user)
      }
    }
  }

  const updateUserPassword = async (newPassword: string) => {
    if (user) {
      try {
        await updatePassword(user, newPassword)
        console.log('User password updated')
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (displayName || photoURL) {
      await updateUserProfile(displayName, photoURL)
    }
    if (password === confirmPassword) {
      const reauthenticated = await reauthenticate(oldPassword)
      if (reauthenticated) {
        await updateUserPassword(password)
        setError('Password updated successfully!')
      }
    } else {
      setError('New passwords do not match!')
    }
  }
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const storage = getStorage()
      const storageRef = ref(storage, 'profilePictures/' + file.name)

      const snapshot = await uploadBytes(storageRef, file)
      const photoURL = await getDownloadURL(snapshot.ref)
      setPhotoURL(photoURL)
    } catch (error) {
      console.error('Error uploading file: ', error)
    }
    e.target.value = ''
  }
  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-3">
        <p className="flex text-base text-white">Profile Picture</p>
        <input
          className="w-full rounded-md border  bg-transparent px-4 py-2 placeholder-white"
          type="file"
          placeholder="Profile Picture"
          onChange={handleFileChange}
        />
        <p className=" mb-5 w-full rounded-lg bg-blue-600 py-2 text-center text-white">
          Edit personal details
        </p>
        <input
          className="mb-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
          type="string"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <p
          onClick={onShowChangePassword}
          className=" mb-5 w-full rounded-lg bg-slate-600 py-2 text-center text-white hover:cursor-pointer"
        >
          Change password
        </p>
        {showChangePassword ? (
          <>
            <input
              className="mb-5 mt-10 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
              type="password"
              placeholder="Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              className="mb-5 mt-10 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="mb-5 mt-10 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
              type="password"
              placeholder="Re-type new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && (
              <p className="text-center text-lg text-red-500">{error}</p>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="flex w-full justify-center">
          <button
            className="mx-3 flex rounded-md bg-gray-200 px-4 py-2 text-slate-600 hover:bg-gray-300 "
            onClick={onShowEdit}
          >
            <p className="">Close</p>
          </button>
          <button
            type="submit"
            className="flex rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 "
          >
            <p className="">Confirm</p>
          </button>
        </div>
      </form>
    </>
  )
}

export default EditUserInformation
