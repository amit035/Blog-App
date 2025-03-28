import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { BsBalloonHeartFill } from "react-icons/bs";
import { useSelector } from 'react-redux';

export default function Comment({comment , onLike}) {
    const {currentUser} = useSelector(state => state.user);
    const [user , setUser] = useState({});
    // console.log(user);
    useEffect(()=>{
        const getUser = async () => {
          try {
             const res = await fetch(`/api/user/${comment.userId}`);
             const data = await res.json();
             if(res.ok){
                setUser(data);
             }
          } catch (error) {
            console.log(error.message);
          }
        }
        getUser();
    },[comment])
  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img className='w-10 h-10 rounded-full bg-gray-200' src={user.photoUrl} alt={user.username}></img>
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1'>
            <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : "anonymous"}</span>
            <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className='text-gray-500 pb-2'>{comment.content}</p>
        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
            <button type='button' onClick={() => onLike(comment._id)} className={`text-gray-400 hover:text-blue-500
              ${currentUser && comment.likes.includes(currentUser._id) && '!text-red-500'}`}>
              <BsBalloonHeartFill className='hover:text-red-600'/>
            </button>
            <p>
              {
                comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
              }
            </p>
        </div>
      </div>
    </div>
  )
}
