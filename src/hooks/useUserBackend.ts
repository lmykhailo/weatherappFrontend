import { useContext, useState } from 'react'
import { Auth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'
import { userDbType } from '../types/userDbType'

const baseUrl = 'http://localhost:8080'

const useUserBackend = () => {
  const [error, setError] = useState(null)
  const context = useContext(Context)
  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const [user] = useAuthState(auth)

  const fetchData = async (endpoint: string, options = {}) => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options)
      console.log(`${baseUrl}${endpoint}`)
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error: any) {
      setError(error)
      return null
    }
  }

  const getUsers = async () => {
    return await fetchData('/api/users')
  }

  const getAdminRightsOfUser = async () => {
    if (!user?.uid) return null

    try {
      const response = await fetch(`${baseUrl}/api/useradminrights`, {
        headers: {
          'Content-Type': 'application/json',
          'x-user-uid': user.uid,
        },
      })

      //console.log(response)
      const data = await response.json()
      // console.log(data)
      return data.isadmin
    } catch (error: any) {
      setError(error)
      return null
    }
  }

  const getOneUser = async (id: number) => {
    return await fetchData(`/api/users/${id}`)
  }

  const createUser = async (data: userDbType) => {
    return await fetchData('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const updateUser = async (id: number, data: userDbType) => {
    return await fetchData(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const deleteUser = async (id: number) => {
    return await fetchData(`/api/users/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    getAdminRightsOfUser,
    error,
  }
}

export default useUserBackend
