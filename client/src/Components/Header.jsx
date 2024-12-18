import { Avatar, Button, Dropdown, DropdownDivider, DropdownItem, Navbar, TextInput} from 'flowbite-react'
import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { ImSearch } from "react-icons/im";
import { LuSunMoon,LuSun } from "react-icons/lu";
import { useSelector,useDispatch} from 'react-redux';
import { FaUser } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { toggleTheme } from '../Redux/Theme/themeSlice';
import {signOutSuccess} from '../Redux/User/userSlice';
import { useEffect } from 'react';

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);    
  const {theme} = useSelector((state)=> state.theme)

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
    <Navbar className='border-b-2'>    
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
            text-white'> <i>Memories</i> & <i>Stories</i></span>
        </Link>
        <form>
            <TextInput type='text'
            placeholder='Search...'
            rightIcon={ImSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <ImSearch/>
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=> dispatch(toggleTheme())}>
                <LuSunMoon/>
            </Button>
            {currentUser ? (
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt='user'
                            img = {currentUser.photoUrl}
                            rounded
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <DropdownItem className='font-medium'><FaUser className='mr-2 h-5 w-5 text-xl'/>Profile</DropdownItem>
                    </Link>
                    <DropdownDivider/>
                    <DropdownItem onClick={handleSignOut} className='font-medium'><HiOutlineLogout className='mr-2 h-5 w-5 text-xl'/>Sign Out</DropdownItem>
                </Dropdown>
            ) : (
                <Link to='/signin'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Sign In
                </Button>
            </Link>
            )}
            <Navbar.Toggle/>
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path=== "/"} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path=== "/about"} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path=== "/projects"} as={'div'}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header