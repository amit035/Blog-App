import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Advertisement from '../Components/Advertisement'
import PostCard from '../Components/PostCard';

function Home () {
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await fetch('/api/post/get-post');
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts();
  },[]);

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>
          Welcome to Memories & Stories
        </h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          A place to share your memories, tell your stories, and connect through moments that matter.
           Start writing, reliving, and inspiring—one story at a time.
        </p>
        <Link to='/search' className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'>
        View All Posts
      </Link>
      </div>
      <div className='p-3 dark:bg-slate-700'>
        <Advertisement/>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='flex flex-wrap gap-3 justify-center'>
                {
                  posts.map((post) => (
                    <PostCard key={post._id} post={post}/>
                  )) 
                }
              </div>
              <Link to='/search' className='text-lg text-teal-500 hover:underline text-center'>
                View All Posts
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home