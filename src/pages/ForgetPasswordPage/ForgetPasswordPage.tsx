import React, { useState, useContext } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Context } from '../..'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../routes/consts/consts'
import SendEmailIcon from '../../assets/Icons/ForgetPasswordPageIcons/SendEmailIcon'

const ForgetPasswordPage = () => {
  const context = useContext(Context)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!context) {
    return <div>Error</div>
  }

  const { auth } = context

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage('')
    setError('')

    try {
      await sendPasswordResetEmail(auth, email)
      setMessage('Check your email for the password reset link')
    } catch (error) {
      setError(
        'Failed to send password reset email. Check if the email is correct.'
      )
      console.error(error)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex w-96 flex-col items-center rounded-md bg-white bg-opacity-20 p-5 text-zinc-700 shadow-lg drop-shadow-lg backdrop-blur-lg">
        <h1 className="text-2xl font-black">Reset your password</h1>
        <p className="mt-2 text-center">
          Enter your email address and we will send you instructions to reset
          your password.
        </p>
        <form
          onSubmit={handlePasswordReset}
          className="flex w-full flex-col items-center"
        >
          <input
            type="email"
            value={email}
            className="mb-2 mt-5 w-full rounded-md border bg-transparent px-4 py-2 text-white placeholder-white"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
          <button
            className="mt-3 flex rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            type="submit"
          >
            <SendEmailIcon></SendEmailIcon>
            <p className="ml-2">Continue</p>
          </button>
        </form>
        {message && <p className="mt-2">{message}</p>}
        {error && <p className="mt-2">{error}</p>}
        <NavLink to={LOGIN_ROUTE} className="mt-5 text-base hover:text-white">
          <p>Back to log in page</p>
        </NavLink>
      </div>
    </div>
  )
}

export default ForgetPasswordPage
