import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { BsBalloonHeartFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { FaRegCommentDots } from "react-icons/fa";
import {Button, Textarea} from 'flowbite-react'

export default function Comment({comment , onLike , onEdit , onDelete}) {
    const {currentUser} = useSelector(state => state.user);
    const [isEditing , setIsEditing] = useState(false);
    const [editedContent , setEditedContent] = useState(comment.content);
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
    },[comment]);

    const handleEdit = () => {
      setIsEditing(true);
      setEditedContent(comment.content);
    };

    const saveEditedContent = async () => {
      try {
        const res = await fetch(`/api/comment/edit-comment/${comment._id}`,{
          method:'PUT',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            content : editedContent
          })
        });
        if(res.ok){
          setIsEditing(false);
          onEdit(comment,editedContent);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

  return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img className='w-10 h-10 rounded-full bg-gray-200' src={user.photoUrl} alt={user.username}></img>
      </div>
      <div className='flex-1'>
        <div className='flex items-center mb-1 gap-1'>
            <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : "anonymous"}</span>
            <span className='text-gray-500 text-xs flex'>
              <FaRegCommentDots className='mr-1' size='15px'/>{moment(comment.createdAt).fromNow()}
            </span>
        </div>
        {isEditing ? (
          <>
            <Textarea className='mb-2'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className='flex justify-end text-xs gap-2'>
            <Button
              type='button'
              size='sm'
              gradientDuoTone='greenToBlue'
              onClick={saveEditedContent}
            >
              Save
            </Button>
            <Button
              type='button'
              size='sm'
              gradientDuoTone='pinkToOrange'
              outline
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
          </>
        ) : (
          <>
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
                  {
                    currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                      <>
                        <button
                        type='button'
                        onClick={handleEdit}
                        className='text-gray-400 hover:text-green-500'
                        >
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => onDelete(comment._id)}
                          className='text-gray-400 hover:text-red-500'
                        >
                          Delete
                        </button>
                      </>
                    ) 
                  }
              </div>          
          </>
        )}
      </div>
    </div>
  )
}
