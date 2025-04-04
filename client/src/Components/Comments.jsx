import {useSelector} from 'react-redux'
import { MdAssignmentInd, MdDeleteForever } from "react-icons/md";
import { Link , useNavigate} from 'react-router-dom';
import { Alert, Button, Modal, ModalBody, ModalHeader, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa6';

export default function Comments({postId}) {
   
  const {currentUser} = useSelector(state => state.user);
  const [comment,setComment] = useState('');
  const [comments,setComments] = useState([]);
  const [showModal , setShowModal] = useState(false);
  const [commentError,setCommentError] = useState(null);
  const [commentToDelete,setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(comment.length > 200) {
        return;
    }

    try {
        const res = await fetch('/api/comment/create',{
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({content : comment, postId, userId:currentUser._id}),
        });
    
        const data = await res.json();
        if(res.ok){
            setComment('');
            setCommentError(null);
            setComments([data , ... comments]);
        }
    } catch (error) {
        setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
        try {
            const res = await fetch(`/api/comment/get-post-comments/${postId}`);
            if(res.ok){
                const data = await res.json();
                setComments(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    } 
    getComments();
  },[postId])

  const handleLike = async (commentId) => {
        try {
            if(!currentUser){
                navigate('/signin');
                return;
            }
            const res = await fetch(`/api/comment/like-comment/${commentId}`,
                {
                    method: 'PUT',
                });
            if(res.ok){
                const data = await res.json();
                setComments(comments.map((comment) => 
                    comment._id === commentId ? {
                        ... comment,
                        likes : data.likes,
                        numberOfLikes: data.likes.length,
                    } : comment
                    )
                )};
        } catch (error) {
            console.log(error.message);
        }
  };

  const saveEditedContent = async (comment,editedContent) => {
    setComments(
        comments.map((c) => c._id === comment._id ? {...c , content : editedContent } : c
        )
    )};

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
        if(!currentUser){
            navigate('/signin');
            return;
        }
        const res = await fetch(`/api/comment/delete-comment/${commentId}`,{
            method : 'DELETE',
        });
        if(res.ok){
            const data = await res.json();
            setComments(comments.filter((comment)=> comment._id !== commentId));
        }
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? 
        (
            <div className='flex items-center gap-1 text-sm my-2'>
                <p>Signed as :</p>
                {/* <MdAssignmentInd size='25px'/> */}
                <img src={currentUser.photoUrl} className='h-5 w-5 object-cover rounded-full' alt='Profile Picture'/>
                <Link to={`/dashboard?tab=profile`} className='text-xs text-cyan-600 hover:underline'>
                    {currentUser.username}
                </Link>
            </div>
        ):(
            <div className='text-sm text-teal-500 my-5 '>
                Please Login to Comment
                <Link to={'/signin'} className='text-red-500 ml-1 hover:underline'>
                    Sign In
                </Link>
            </div>
        )}
        {currentUser && (
            <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                <Textarea
                    placeholder='Add a Comment'
                    rows='3'
                    maxLength='200'
                    onChange={(e)=> setComment(e.target.value)}
                    value={comment}
                />
                <div className='flex justify-between items-center mt-5'>
                    <p className='text-gray-500 text-xs'>
                        {200 - comment.length} words remaining
                    </p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                        Submit
                    </Button>
                </div>
                {commentError && 
                  <Alert color='failure' className='mt-5'>
                    {commentError}
                  </Alert>
                }
            </form>
        )}
        {comments.length === 0 ? (
            <p className='text-sm my-5'>No Comments Yet !</p>
        ) : (
            <>
              <div className='text-sm my-5 flex items-center gap-1'>
                <p>Comments</p>
                <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                    <p>{comments.length}</p>
                </div>
              </div>
              {comments.map(comment =>(
                <Comment key={comment._id} 
                        comment={comment} 
                        onLike={handleLike} 
                        onEdit={saveEditedContent} 
                        onDelete={(commentId)=>{
                            setShowModal(true);
                            setCommentToDelete(commentId);
                        }}/>
              ))}
            </>
        )}
        <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader>
                    <ModalBody>
                        <div className='text-center'>
                          <MdDeleteForever className='h-14 w-14 text-red-700 mx-auto'/>
                          <h3 className='mb-5 text-lg text-red-500'>Are you sure to you want to delete this Comment</h3>
                          <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={()=>handleDelete(commentToDelete)}><FaRegThumbsUp className='mr-2 mt-2 h-5 w-5'/>Yes, I'm Sure</Button>
                            <Button color='blue' onClick={()=>setShowModal(false)}><FaRegThumbsDown className='mr-2 mt-2 h-5 w-5'/>No, Cancel</Button>
                          </div>
                        </div>
                    </ModalBody>
                </ModalHeader>
            </Modal>
    </div>
  )
}
