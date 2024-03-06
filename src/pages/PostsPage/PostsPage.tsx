import { useEffect, useState } from 'react'
import usePostsBackend from '../../hooks/usePostsBackend'
import { postsDbType } from '../../types/postsDbType'
import BigPostPanel from '../../components/BigPostPanel/BigPostPanel'
import LoaderSpin from '../../components/LoaderSpin/LoaderSpin'
import { useNavigate } from 'react-router-dom'

const PostsPage = () => {
  const { getPosts } = usePostsBackend()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<postsDbType[]>([])
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const fetchedPosts = await getPosts()
        if (fetchedPosts) {
          setPosts(fetchedPosts)
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.header.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.text.toLowerCase().includes(searchValue.toLowerCase())
  )

  const renderContent = () => {
    if (loading) {
      return <LoaderSpin />
    }
    if (filteredPosts.length === 0) {
      return <p className="text-xl text-white">No posts found.</p>
    }
    return filteredPosts.map((y) => (
      <BigPostPanel
        onClick={() => navigate('/blogposts/' + y.id)}
        key={y.id}
        post={y}
      ></BigPostPanel>
    ))
  }

  return (
    <>
      <div className="mt-3 flex items-center justify-center">
        <input
          className=" w-3/4 rounded-md border bg-transparent px-4 py-2 placeholder-white"
          type="string"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        ></input>
      </div>
      <div className="flex h-full items-center justify-center">
        <section
          className="mt-5 flex h-auto w-full flex-col items-center justify-center rounded-md bg-white
       bg-opacity-20 p-4 text-center  text-zinc-700 drop-shadow-lg backdrop-blur-lg
        md:max-w-[1100px] md:px-4 lg:p-12"
        >
          <div>{renderContent()}</div>
        </section>
      </div>
    </>
  )
}

export default PostsPage
