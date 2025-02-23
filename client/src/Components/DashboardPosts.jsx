import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import {Button, Modal, ModalBody, ModalHeader, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import { FaRegThumbsUp , FaRegThumbsDown} from "react-icons/fa6";


export default function dashboardPosts () {
    const {currentUser} = useSelector((state) => state.user);
    const [userPost , setUserPost] = useState([]);
    const [showMore,setShowMore] = useState(true);
    const [showModal , setShowModal] = useState(false);
    const [postIdDelete , setPostIdDelete] = useState('');
    // console.log(userPost);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/get-post?userId=${currentUser._id}`)
                const data = await res.json()
                if(res.ok){
                    setUserPost(data.posts);
                    if(data.posts.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentUser.isAdmin){
            fetchPosts();
        }
    },[currentUser._id])

    const handleShowMore = async () => {
        const startIndex = userPost.length;
        try {
            const res = await fetch(`/api/post/get-post?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUserPost((prev) => [...prev , ...data.posts]);
                if(data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeletePost = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/post/delete-post/${postIdDelete}/${currentUser._id}`,
                {
                    method : 'DELETE' , 
                }
            );
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                setUserPost((prev) => prev.filter((post) => post._id != postIdDelete));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-1 scrollbar scrollbar-track-slate-500
        scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
        dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && userPost.length > 0 ? (
                <>
                    <Table className="">
                        <Table.Head className="">
                            <Table.HeadCell> Date Updated</Table.HeadCell>
                            <Table.HeadCell> Image</Table.HeadCell>
                            <Table.HeadCell> Title</Table.HeadCell>
                            <Table.HeadCell> Category</Table.HeadCell>
                            <Table.HeadCell> Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPost.map((post) => (
                            <Table.Body className="divide-y" key={post._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${(post.slug)}`}>
                                            <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className='w-20 h-10 object-cover'
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${decodeURIComponent(post.slug)}`}>{post.title}</Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {post.category}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span onClick={()=>{
                                            setShowModal(true);
                                            setPostIdDelete(post._id);
                                        }}
                                        
                                        className="font-medium text-red-500 hover:underline cursor-pointer">
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='text-teal-600 hover:underline' to={`/edit-post/${post._id}`}>
                                            <span className="font-medium">
                                                Edit
                                            </span>
                                        </Link>
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
                                 <span className="font-bold text-white">
                                    SHOW MORE
                                 </span>
                            </button>
                        )
                    }
                </>
            ) : (
                <p>You have no Pots's Yet</p>
            )}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader>
                    <ModalBody>
                        <div className='text-center'>
                          <MdDeleteForever className='h-14 w-14 text-red-700 mx-auto'/>
                          <h3 className='mb-5 text-lg text-red-500'>Are you sure to you want to delete this Post</h3>
                          <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeletePost}><FaRegThumbsUp className='mr-2 mt-2 h-5 w-5'/>Yes, I'm Sure</Button>
                            <Button color='blue' onClick={()=>setShowModal(false)}><FaRegThumbsDown className='mr-2 mt-2 h-5 w-5'/>No, Cancel</Button>
                          </div>
                        </div>
                    </ModalBody>
                </ModalHeader>
            </Modal>

        </div>
    )
}