import { useState } from 'react'
import { postsDbType } from '../types/postsDbType'

const baseUrl = 'http://localhost:8080'

const usePostsBackend = () => {
  const [error, setError] = useState(null)

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

  const getPosts = async () => {
    return await fetchData('/api/posts')
  }

  const getOnePost = async (id: number) => {
    return await fetchData(`/api/posts/${id}`)
  }

  const createPost = async (data: postsDbType) => {
    return await fetchData('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const updatePost = async (id: number, data: postsDbType) => {
    return await fetchData(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  const deletePost = async (id: number) => {
    return await fetchData(`/api/posts/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    getPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost,
    error,
  }
}

export default usePostsBackend
