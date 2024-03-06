import { useState } from 'react'
import AdminPanelCreatePost from '../AdminPanelCreatePost/AdminPanelCreatePost'

const AdminPanel = () => {
  const [showCreatePost, setShowCreatePost] = useState(false)

  const onShowCreatePost = () => {
    setShowCreatePost((prev) => !prev)
  }
  return (
    <section
      className="mb-2 mt-5 flex h-auto w-full flex-col items-center justify-center rounded bg-white
       bg-opacity-20 p-4 text-center text-zinc-700 drop-shadow-lg
        backdrop-blur-lg md:max-w-[500px] md:px-8"
    >
      <div className="mb-5 flex w-full items-center justify-between">
        <h1 className="text-2xl font-black text-white">Admin Panel</h1>
      </div>
      <p
        onClick={onShowCreatePost}
        className=" mb-5 w-full rounded-lg bg-slate-600 py-2 text-center text-white hover:cursor-pointer"
      >
        Create new post
      </p>
      {showCreatePost ? (
        <AdminPanelCreatePost
          showCreatePost={showCreatePost}
          onShowCreatePost={onShowCreatePost}
        ></AdminPanelCreatePost>
      ) : (
        <></>
      )}
    </section>
  )
}

export default AdminPanel
