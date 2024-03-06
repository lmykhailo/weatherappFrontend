import { commentType } from '../../types/commentType'

type Props = {
  comment: commentType
}

const CommentCard = ({ comment }: Props) => {
  return (
    <div
      className="mt-3 flex w-full flex-row items-center rounded-md bg-white/20 p-4 text-justify
      drop-shadow-lg backdrop-blur"
    >
      <img
        className="mr-4 h-12 w-12 rounded-full object-cover"
        src={comment.photoURL}
        alt="User"
      />
      <div>
        <p className="text-lg font-bold">{comment.displayName}</p>
        <p className="">{comment.text}</p>
      </div>
    </div>
  )
}

export default CommentCard
