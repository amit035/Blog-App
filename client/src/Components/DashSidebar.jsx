import {Sidebar} from 'flowbite-react'
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from '../Redux/User/userSlice';
import { useDispatch } from 'react-redux';
import { CgFileDocument } from "react-icons/cg";
import { useSelector } from 'react-redux';

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
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
                {currentUser.isAdmin && 
                  <Link to='/dashboard?tab=posts'>
                    <Sidebar.Item
                      active = {tab === 'posts'}
                      icon = {CgFileDocument}
                      as = 'div'  
                    >
                      <div className='text-lg font-medium'>Posts</div>
                    </Sidebar.Item>
                  </Link>
                }
                <Sidebar.Item icon={HiOutlineLogout} className='cursor-pointer' onClick={handleSignOut} >
                    <div className='text-lg font-medium'>
                      Sign Out
                    </div>
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;