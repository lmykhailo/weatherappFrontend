import { FormEvent, useEffect, useState } from 'react'
import useFileToURL from '../../hooks/useFileToURL'
import usePostsBackend from '../../hooks/usePostsBackend'

type Props = {
  showCreatePost: boolean
  onShowCreatePost: () => void
}

const AdminPanelCreatePost = ({ showCreatePost, onShowCreatePost }: Props) => {
  const [text, setText] = useState('')
  const [header, setHeader] = useState('')
  const [message, setMessage] = useState('')

  const { photoURL, handleFileChange, setStorageDestination } = useFileToURL()

  useEffect(() => {
    setStorageDestination('PostImages')
  }, [setStorageDestination])

  const { createPost } = usePostsBackend()

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await createPost({
        text: text,
        header: header,
        imageurl: photoURL,
      })
      setMessage('Post successfully created!')
    } catch (error) {
      console.error('Error creating post:', error)
      setMessage('Error while creating post!')
    }
  }
  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-3">
        <input
          className="mb-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
          type="string"
          placeholder="Header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <input
          className="mb-5 w-full rounded-md border bg-transparent px-4 py-2 placeholder-white"
          type="string"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p className="flex text-base text-white">Image for post</p>
        <input
          className="w-full rounded-md border  bg-transparent px-4 py-2 placeholder-white"
          type="file"
          placeholder="Image for post"
          onChange={handleFileChange}
        />
        <div className="flex w-full justify-center">
          <button
            className="mx-3 flex rounded-md bg-gray-200 px-4 py-2 text-slate-600 hover:bg-gray-300 "
            onClick={onShowCreatePost}
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
      {message && <p>{message}</p>}
    </>
  )
}

export default AdminPanelCreatePost
