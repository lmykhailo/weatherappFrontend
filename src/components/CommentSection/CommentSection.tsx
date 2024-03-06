import { Auth } from 'firebase/auth'
import {
  Firestore,
  addDoc,
  collection,
  Timestamp,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'
import { useState, useContext, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '../..'
import { postsDbType } from '../../types/postsDbType'
import { commentType } from '../../types/commentType'
import CommentCard from '../CommentCard/CommentCard'

type Props = {
  post: postsDbType
}

const CommentSection = ({ post }: Props) => {
  const [comments, setComments] = useState<commentType[] | null>(null)
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const context = useContext(Context)

  if (!context) {
    throw new Error('Context is not provided')
  }

  const { auth } = context as { auth: Auth }
  const { firestore } = context as { firestore: Firestore }
  const [user] = useAuthState(auth)

  const sendComment = async (id: number) => {
    if (!value.trim()) {
      setError('You can not send an empty comment!')
      return
    }

    try {
      const docRef = await addDoc(collection(firestore, 'comments'), {
        uid: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        text: value,
        createdAt: Timestamp.fromDate(new Date()),
        postId: id,
      })
      console.log('Document written with ID: ', docRef.id)
      setValue('')
      setError('')
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const getComments = async (id: number) => {
    const q = query(
      collection(firestore, 'comments'),
      where('postId', '==', id),
      orderBy('createdAt', 'asc')
    )

    onSnapshot(q, (querySnapshot) => {
      const newComments = querySnapshot.docs.map(
        (doc) => doc.data() as commentType
      )
      setComments(newComments)
    })
  }
  useEffect(() => {
    getComments(post.id ?? 0)
  }, [])

  return (
    <div className="my-3 flex w-full flex-col items-center justify-center">
      <div className="flex w-3/4">
        <input
          className="w-full rounded-md border bg-white px-2 py-2 placeholder-black"
          type="text"
          placeholder="Add your comment!"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="ml-2 inline-flex items-center rounded-md bg-blue-700 px-3.5 py-1.5 font-bold text-white hover:bg-blue-600"
          onClick={() => sendComment(post?.id ?? 0)}
        >
          Comment
        </button>
      </div>
      {error ? <p className="my-2 text-lg text-white">{error}</p> : null}
      <div className="flex w-3/4 flex-col">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentCard key={index} comment={comment}></CommentCard>
          ))
        ) : (
          <p className="my-5 text-lg text-white">
            Be the first one to comment!
          </p>
        )}
      </div>
    </div>
  )
}

export default CommentSection
