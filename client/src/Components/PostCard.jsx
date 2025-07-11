import {Link} from 'react-router-dom' 

export default function PostCard({post}) {
  return (
    <div className='group relative w-full border border-teal-500 hover:border-2 h-[400px] 
    overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/post/${post.slug}`}>
        <img src={post.image} alt="Post Cover" className='h-[260px] w-full  object-cover group-hover:h-[200px]
        transition-all z-20'/> 
      </Link>
      <div className='flex flex-col gap-2 p-3'>
        <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
        <span>{post.category}</span>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <Link to={`/post/${post.slug}`} className='z-10 group-hover:bottom-0 absolute bottom-[-200px]
        left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white
        transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>
          Read Article
        </Link>
      </div>
    </div>
  )
}
