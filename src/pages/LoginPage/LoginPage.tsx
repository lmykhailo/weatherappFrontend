import { useContext, useState } from 'react'
import { Context } from '../../index'
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth'
import { NavLink } from 'react-router-dom'
import {
  FORGETPASSWORD_ROUTE,
  REGISTRATION_ROUTE,
} from '../../routes/consts/consts'
import LogInIcon from '../../assets/Icons/LogInPageIcons/LogInIcon'
import GoogleIcon from '../../assets/Icons/LogInPageIcons/GoogleIcon'
import GuestIcon from '../../assets/Icons/LogInPageIcons/GuestIcon'
import { FirebaseError } from 'firebase/app'
import useUserBackend from '../../hooks/useUserBackend'

const LoginPage = () => {
  const { createUser } = useUserBackend()
  const context = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (!context) {
    return <div>Error</div>
  }

  const { auth } = context

  const handleSuccessfulLogin = async (userCredential: UserCredential) => {
    try {
      if (userCredential.user) {
        await createUser({
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          uid: userCredential.user.uid,
        })
      }
      setError('')
    } catch (error) {
      setError('User creation failed. Please try again.')
      console.error('Error creating user:', error)
    }
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const user = await signInWithPopup(auth, provider)
    handleSuccessfulLogin(user)
    console.log(user)
  }

  const loginAnonymously = async () => {
    const user = await signInAnonymously(auth)
    console.log(user)
  }

  const loginWithEmailPassword = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log(user)
      handleSuccessfulLogin(user)
      setError('')
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (
          error.code === 'auth/invalid-credential' ||
          error.code === 'auth/user-not-found'
        ) {
          setError('Incorrect email or password.')
        } else {
          setError('Login failed. Please try again.')
        }
      } else {
        setError('An unknown error occurred.')
      }
      console.error('Error signing in with email and password:', error)
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex w-96 flex-col items-center rounded-md bg-white bg-opacity-20 p-5 text-zinc-700 shadow-lg drop-shadow-lg backdrop-blur-lg">
        <div className="mb-5 flex w-full items-center justify-between">
          <h1 className="text-2xl font-black">LOG IN</h1>
          <NavLink to={REGISTRATION_ROUTE} className="text-lg hover:text-white">
            <p>Registration</p>
          </NavLink>
        </div>
        <input
          className="mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-2 mt-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-center text-lg text-red-500">{error}</p>}
        <button
          className="mb-1 mt-1 flex rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          onClick={loginWithEmailPassword}
        >
          <LogInIcon></LogInIcon>
          <p className="ml-2">Log in</p>
        </button>
        <NavLink
          to={FORGETPASSWORD_ROUTE}
          className="text-base hover:text-white"
        >
          <p>Trouble logging in?</p>
        </NavLink>
        <p className="text-small font-bald mb-3 mt-2 font-black">
          Choose alternative log in method
        </p>

        <button
          className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          onClick={loginWithGoogle}
        >
          <GoogleIcon />
          <p className="ml-2">Continue with Google</p>
        </button>
        <button
          className="mt-2 flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          onClick={loginAnonymously}
        >
          <GuestIcon />
          <p className="ml-2">Continue as Guest</p>
        </button>
      </div>
    </div>
  )
}

export default LoginPage
