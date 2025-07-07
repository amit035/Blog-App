import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import {Button, Modal, ModalBody, ModalHeader, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import { FaRegThumbsUp , FaRegThumbsDown} from "react-icons/fa6";

export default function DashComments() {
    const {currentUser} = useSelector((state) => state.user);
    const [comments , setComments] = useState([]);
    const [showMore,setShowMore] = useState(true);
    const [showModal , setShowModal] = useState(false);
    const [commentIdToDelete , setCommentIdToDelete] = useState('');
    // console.log(users);
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/get-comments`);
                const data = await res.json()
                if(res.ok){
                    setComments(data.comments);
                    if(data.comments.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentUser.isAdmin){
            fetchComments();
        }
    },[currentUser._id])

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/get-comments?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setComments((prev) => [...prev , ...data.comments]);
                if(data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCommentDelete =async()=>{
        setShowModal(false);
        try {
            const res = await fetch(`/api/comment/delete-comment/${commentIdToDelete}`,{
                method:'DELETE',
            });
            const data = await res.json();
            if(res.ok){
                setComments((prev)=>prev.filter((comment)=>comment._id!==commentIdToDelete));
                setShowModal(false);
            }else{
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-1 scrollbar scrollbar-track-slate-500
        scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
        dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && comments.length > 0 ? (
                <>
                    <Table className="">
                        <Table.Head className="">
                            <Table.HeadCell> Date Created</Table.HeadCell>
                            <Table.HeadCell> Comment </Table.HeadCell>
                            <Table.HeadCell> No. of Likes</Table.HeadCell>
                            <Table.HeadCell> Post's ID</Table.HeadCell>
                            <Table.HeadCell> User's ID</Table.HeadCell>
                            <Table.HeadCell> Delete</Table.HeadCell>
                        </Table.Head>
                        {comments.map((comment) => (
                            <Table.Body className="divide-y" key={comment._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        {comment.content}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.numberOfLikes}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.postId}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {comment.userId}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={()=>{
                                                setShowModal(true);
                                                setCommentIdToDelete(comment._id);
                                            }}
                                            className='font-medium text-red-700 cursor-pointer'
                                        >
                                            Delete
                                        </span>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {
                        showMore && (
                            <button onClick={handleShowMore} className="w-full self-center py-2 rounded-lg
                             bg-gradient-to-r from-white via-slate-500 to-white
                             dark:bg-gradient-to-r dark:from-transparent dark:via-slate-800 dark:to-transparent">
                                    SHOW MORE
                            </button>
                        )
                    }
                </>
            ) : (
                <p>You have no Comment's Yet</p>
            )}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader>
                    <ModalBody>
                        <div className='text-center'>
                          <MdDeleteForever className='h-14 w-14 text-red-700 mx-auto'/>
                          <h3 className='mb-5 text-lg text-red-500'>Are you sure to you want to delete this Comment</h3>
                          <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleCommentDelete}><FaRegThumbsUp className='mr-2 mt-2 h-5 w-5'/>Yes, I'm Sure</Button>
                            <Button color='blue' onClick={()=>setShowModal(false)}><FaRegThumbsDown className='mr-2 mt-2 h-5 w-5'/>No, Cancel</Button>
                          </div>
                        </div>
                    </ModalBody>
                </ModalHeader>
            </Modal>

        </div>
    )
}