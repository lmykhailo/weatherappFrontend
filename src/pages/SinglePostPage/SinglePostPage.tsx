import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { postsDbType } from '../../types/postsDbType'
import usePostsBackend from '../../hooks/usePostsBackend'
import {
  addDoc,
  collection,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { Auth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../..'
import CommentSection from '../../components/CommentSection/CommentSection'

const SinglePostPage = () => {
  const [post, setPost] = useState<postsDbType | null>(null)
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [value, setValue] = useState('')
  const { id } = useParams()

  const context = useContext(Context)

  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const { firestore } = context as { firestore: Firestore }
  const [user] = useAuthState(auth)

  const { getOnePost } = usePostsBackend()

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const fetchedPost = await getOnePost(Number(id))
        if (fetchedPost) {
          setPost(fetchedPost)
        }
      } catch (error) {
        console.error('Failed to fetch post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <>
      {post ? (
        <div className="mt-3 flex flex-col items-center justify-center">
          <section
            className="r mb-5 w-full rounded-lg bg-white/20 p-4 text-justify
        drop-shadow-lg backdrop-blur-lg sm:mx-2 md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] "
          >
            <h1 className="text-left text-2xl font-bold">{post.header}</h1>
            {post.imageurl && (
              <div className="flex justify-center">
                <img
                  src={post.imageurl}
                  alt="Post"
                  className="my-6 max-h-[400px] max-w-[320px] rounded-md object-cover object-center sm:max-w-[650px]"
                />
              </div>
            )}
            <p className="mt-5 text-lg">{post.text}</p>
          </section>
          <h1 className="items-left text-left text-2xl font-bold text-white">
            Comments section
          </h1>
          <CommentSection post={post}></CommentSection>
        </div>
      ) : null}
    </>
  )
}

export default SinglePostPage
