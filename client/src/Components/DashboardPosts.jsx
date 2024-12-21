import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import {Button, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function dashboardPosts () {
    const {currentUser} = useSelector((state) => state.user);
    const [userPost , setUserPost] = useState([]);
    const [showMore,setShowMore] = useState(true);
    console.log(userPost);
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

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-1 scrollbar scrollbar-track-slate-500
        scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
        dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && userPost.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head className="">
                            <Table.HeadCell> Date Updated</Table.HeadCell>
                            <Table.HeadCell> Post Image</Table.HeadCell>
                            <Table.HeadCell> Post Title</Table.HeadCell>
                            <Table.HeadCell> Category</Table.HeadCell>
                            <Table.HeadCell> Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPost.map((post) => (
                            <Table.Body className="divide-y">
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className='w-20 h-10 object-cover bg-gray-200'
                                            />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {post.category}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="font-medium text-red-500 hover:underline cursor-pointer">
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='text-teal-600 hover:underline' to={`/update-post/${post._id}`}>
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
                            text-transparent bg-gradient-to-r from-blue-950 via-purple-900 to-green-900">
                                 <span className="text-white">
                                    SHOW MORE
                                 </span>
                            </button>
                        )
                    }
                </>
            ) : (
                <p></p>
            )}
        </div>
    )
}