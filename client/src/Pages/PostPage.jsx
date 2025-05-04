import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import {Button} from 'flowbite-react'
import Advertisement from "../Components/Advertisement.jsx";
import Comments from "../Components/Comments.jsx";
import { FaAngleDoubleUp } from "react-icons/fa";
import PostCard from "../Components/PostCard.jsx";

function PostPage () {
  const pageData = window.location.pathname.split("/").pop();
  {/*const {pageData} =  useParams();*/}
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(false);
  const [post,setPost] = useState(null);
  const [recentPosts,setRecentPosts] = useState(null);
  useEffect(()=>{
    const fetchPageData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/post/get-post?slug=${pageData}`)
          const data = await res.json();
          if(!res.ok){
            setError(true);
            setLoading(false);
            return;
          }
          if(res.ok){
            setPost(data.posts[0]);
            setLoading(false);
            setError(false);
          }
        } catch (error) {
          setError(true);
          setLoading(false);
        }
    }
    fetchPageData();
  },[pageData]);

  useEffect(()=>{
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/post/get-post?limit=3`);
        const data = await res.json();
        const getRecentPosts = data.posts.slice(0,3);
        if(res.ok){
          setRecentPosts(getRecentPosts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  },[])

  if(loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader"/>
    </div>
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h1 className="text-3xl mt-10 p-3 text-center max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
          <Button color='gray' pill size='xs'>  
              {post && post.category}
          </Button>
        </Link>
        <img src={post && post.image} alt={post && post.title} className="mt-10 p-3 max-w-sm h-auto
        object-cover m-auto"/>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl
        text-xs">
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span>{post && (post.content.length/1000).toFixed(0)} mins read</span>
        </div>
        <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{__html: post && post.content}}>
            
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <Advertisement/>
        </div>
        <Comments postId={post._id}/>
        <div className="flex flex-col justify-center items-center mb-5">
            <h1 className="text-xl mt-5">Recent Article</h1>
            <div className="flex flex-col gap-5 mt-5 justify-center">
              {
                recentPosts && 
                  recentPosts.map((post) =>
                    <PostCard key={post._id} post={post}/>
                  )
              }
            </div>
        </div>
        <FaAngleDoubleUp onClick={scrollToTop} className='mx-auto items-center cursor-pointer' size='25px'/>
    </main>
  );
}

export default PostPage