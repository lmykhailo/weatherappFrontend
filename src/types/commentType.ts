import { Timestamp } from 'firebase/firestore'

export type commentType = {
  uid: string
  displayName: string
  photoURL: string
  text: string
  createdAt: Timestamp
  postId: number
}
