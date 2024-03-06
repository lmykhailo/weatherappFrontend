import { postsDbType } from '../../types/postsDbType'

type Props = {
  post: postsDbType
  onClick: (post: postsDbType) => void
}

const BigPostPanel = ({ post, onClick }: Props) => {
  return (
    <section
      onClick={() => onClick(post)}
      className="mb-5 w-full rounded-lg bg-white/20 p-4 text-justify
        drop-shadow-lg backdrop-blur-lg hover:cursor-pointer sm:mx-2 sm:max-w-[750px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] "
    >
      <h1 className="text-center text-2xl font-bold">{post.header}</h1>
      {post.imageurl && (
        <div className="flex justify-center">
          <img
            src={post.imageurl}
            alt="Post"
            className="my-3 max-h-[250px] max-w-[320px] rounded-md object-cover object-center sm:max-w-[650px]"
          />
        </div>
      )}
      <p className="text-lg">{post.text}</p>
    </section>
  )
}

export default BigPostPanel
