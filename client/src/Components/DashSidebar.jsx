import {Sidebar} from 'flowbite-react'
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from '../Redux/User/userSlice';
import { useDispatch } from 'react-redux';

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
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
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} 
                icon={FaUser} 
                label={"user"} 
                labelColor="dark"
                as='div'
                >
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiOutlineLogout} className='cursor-pointer' onClick={handleSignOut} >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;