import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import {Button, Modal, ModalBody, ModalHeader, Table} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md";
import { FaRegThumbsUp , FaRegThumbsDown} from "react-icons/fa6";
import { BsPersonFillCheck } from "react-icons/bs";
import { BsPersonFillX } from "react-icons/bs";

export default function () {
    const {currentUser} = useSelector((state) => state.user);
    const [users , setUsers] = useState([]);
    const [showMore,setShowMore] = useState(true);
    const [showModal , setShowModal] = useState(false);
    const [userIdDelete , setUserIdDelete] = useState('');
    // console.log(users);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/get-users`);
                const data = await res.json()
                if(res.ok){
                    setUsers(data.users);
                    if(data.users.length < 9){
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        if(currentUser.isAdmin){
            fetchUsers();
        }
    },[currentUser._id])

    const handleShowMore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/get-users?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setUsers((prev) => [...prev , ...data.users]);
                if(data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser =()=>{

    }

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-1 scrollbar scrollbar-track-slate-500
        scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
        dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table className="">
                        <Table.Head className="">
                            <Table.HeadCell> Date Created</Table.HeadCell>
                            <Table.HeadCell> Profile Picture</Table.HeadCell>
                            <Table.HeadCell> Name</Table.HeadCell>
                            <Table.HeadCell> Email</Table.HeadCell>
                            <Table.HeadCell> Admin</Table.HeadCell>
                            <Table.HeadCell> Delete</Table.HeadCell>
                        </Table.Head>
                        {users.map((user) => (
                            <Table.Body className="divide-y" key={user._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                            <img 
                                            src={user.photoUrl} 
                                            alt={user.username} 
                                            className='w-20 h-10 object-cover'
                                            />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${encodeURIComponent(user.username)}`}>{user.username}</Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.email}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.isAdmin ? <BsPersonFillCheck size='25px' className='text-green-500'/> : <BsPersonFillX size='25px' className='text-red-500'/> }
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span
                                            onClick={()=>{
                                                setShowModal(true);
                                                setUserIdDelete(user._id);
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
                <p>You have no User's Yet</p>
            )}

            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <ModalHeader>
                    <ModalBody>
                        <div className='text-center'>
                          <MdDeleteForever className='h-14 w-14 text-red-700 mx-auto'/>
                          <h3 className='mb-5 text-lg text-red-500'>Are you sure to you want to delete this Account</h3>
                          <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}><FaRegThumbsUp className='mr-2 mt-2 h-5 w-5'/>Yes, I'm Sure</Button>
                            <Button color='blue' onClick={()=>setShowModal(false)}><FaRegThumbsDown className='mr-2 mt-2 h-5 w-5'/>No, Cancel</Button>
                          </div>
                        </div>
                    </ModalBody>
                </ModalHeader>
            </Modal>

        </div>
    )
}