import { useEffect, useState } from 'react'
import usePostsBackend from '../../hooks/usePostsBackend'
import { postsDbType } from '../../types/postsDbType'
import BigPostPanel from '../BigPostPanel/BigPostPanel'
import LoaderSpin from '../LoaderSpin/LoaderSpin'
import SmallPostPanel from '../SmallPostPanel/SmallPostPanel'
import { useNavigate } from 'react-router-dom'

const SidePostPanel = () => {
  const { getPosts } = usePostsBackend()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<postsDbType[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const fetchedPosts = await getPosts()
        if (fetchedPosts) {
          setPosts(fetchedPosts.slice(0, 3))
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <>
      <div className="z-10 ml-3 flex h-auto items-center justify-center">
        <section
          className="flex h-auto w-full flex-col items-center justify-center rounded-md bg-white
       bg-opacity-20 p-4 text-center  text-zinc-700 drop-shadow-lg backdrop-blur-lg
   md:max-w-[400px] md:px-4 lg:p-8"
        >
          <h1 className="mb-2 text-center text-2xl font-bold">
            Recent Blog posts
          </h1>
          <div>
            {loading ? (
              <LoaderSpin></LoaderSpin>
            ) : (
              posts.map((y) => (
                <SmallPostPanel
                  onClick={() => navigate('/blogposts/' + y.id)}
                  key={y.id}
                  post={y}
                ></SmallPostPanel>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default SidePostPanel
