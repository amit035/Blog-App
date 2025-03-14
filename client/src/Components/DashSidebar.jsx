import {Sidebar} from 'flowbite-react'
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from '../Redux/User/userSlice';
import { useDispatch } from 'react-redux';
import { CgFileDocument } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { IoCreateOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  const [userscount,setUsersCount] = useState([]);
  const [userPost , setUserPost] = useState([]);
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout',{
        method : 'POST',
      });
      const data = await res.json();
        if(!res.ok){
          console.log(data.message);
        }else{
          dispatch(signOutSuccess());
        } 
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const fetchUsersCount = async () => {
        try {
            const res = await fetch(`/api/user/get-users`);
            const data = await res.json()
            if(res.ok){
              setUsersCount(data.totalUsers);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    if(currentUser.isAdmin){
      fetchUsersCount();
    }
},[currentUser._id]);

useEffect(() => {
  const fetchPosts = async () => {
      try {
          const res = await fetch(`/api/post/get-post?userId=${currentUser._id}`)
          const data = await res.json()
          if(res.ok){
              setUserPost(data.posts.length);
              // console.log(data.posts.length);
          }
      } catch (error) {
          console.log(error.message);
      }
  };
  if(currentUser.isAdmin){
      fetchPosts();
  }
},[currentUser._id])

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-0 dark:bg-slate-600 rounded-xl'>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'}
                icon={FaUser} 
                label= {currentUser.isAdmin ? <b>admin</b> : <b>user</b>} 
                labelColor="pink"
                as='div'
                >   
                  <div className='text-lg font-medium'>
                    Profile
                  </div>
                </Sidebar.Item>
                </Link>
                {/* Dashboard Code */}
                {currentUser.isAdmin && ( 
                  <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item
                      active = {tab === 'posts'}
                      icon = {CgFileDocument}
                      as = 'div' 
                      label = {userPost} 
                      labelColor = 'green'
                    >
                      <div className='text-lg font-medium'>Posts</div>
                    </Sidebar.Item>
                  </Link> 
                )}
                {/* Users */}
                {currentUser.isAdmin && ( 
                  <Link to='/dashboard?tab=users'>
                    <Sidebar.Item
                      active = {tab === 'users'}
                      icon = {FaUsers}
                      as = 'div'
                      label = {userscount}
                      labelColor = 'green'
                    >
                      <div className='text-lg font-medium'>Users</div>
                    </Sidebar.Item>
                  </Link> 
                )}
                {/* <Sidebar.Item icon={IoCreateOutline}> */}
                <Link to='/create-post'>
                  <div className='text-lg font-medium flex p-1 rounded-lg mt-2'>
                    <IoCreateOutline size='25px' className='ml-1 mr-2'/>
                    Create Post
                  </div>
                </Link>  
                {/* </Sidebar.Item> */}
                <Sidebar.Item icon={HiOutlineLogout} className='cursor-pointer' onClick={handleSignOut} >
                    <div className='text-lg font-medium'>
                      Sign Out
                    </div>
                </Sidebar.Item>
                {/* <>
                {tab==='posts' && 
                <Link to={'/create-post'}>
                  <Sidebar.Item icon={IoCreateOutline}>
                    <div className='text-lg font-medium'>
                      Create Post
                    </div>
                  </Sidebar.Item>
                </Link>
                }
                </> */}
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;