import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routes/consts/consts'
import { ChangeEvent, useContext, useState } from 'react'
import { Context } from '../..'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import RegisterIcon from '../../assets/Icons/RegistrationPageIcons/RegisterIcon'

const RegistrationPage = () => {
  const context = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [error, setError] = useState('')

  if (!context) {
    return <div>Error</div>
  }

  const { auth } = context

  const registerUser = async (
    email: string,
    password: string,
    displayName: string,
    photoURL: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log(displayName)

      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      })
      sendEmailVerification(user)
      console.log('User created and profile updated', user)
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password === verifyPassword) {
      await registerUser(email, password, displayName, photoURL)
    } else {
      setError('Passwords does not match!')
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
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex w-96 flex-col items-center rounded-md bg-white bg-opacity-20 p-5 text-zinc-700 shadow-lg drop-shadow-lg backdrop-blur-lg">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-black">REGISTRATION</h1>
          <NavLink to={LOGIN_ROUTE} className="text-lg hover:text-white">
            <p>Log in</p>
          </NavLink>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col space-y-3">
          <input
            className="mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-5 mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="mb-5 mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
            type="password"
            placeholder="Re-type your password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
          />
          <input
            className="mb-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
            type="string"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            className="mb-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
            type="file"
            placeholder="Profile Picture"
            onChange={handleFileChange}
          />

          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="flex w-auto rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              <RegisterIcon></RegisterIcon>
              <p className="ml-2">Register</p>
            </button>
          </div>
        </form>
        {error && <p className="text-center text-lg text-red-500">{error}</p>}
      </div>
    </div>
  )
}

export default RegistrationPage
