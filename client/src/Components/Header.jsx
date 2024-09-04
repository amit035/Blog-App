import { Button, Navbar, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { FcSearch } from "react-icons/fc";
import { LuSunMoon } from "react-icons/lu";

const Header = () => {
  return (
    <Navbar className='border-b-2'>    
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg
            text-white'> <i>Post's</i> & <i>Stories</i></span>
        </Link>
        <form>
            <TextInput type='text'
            placeholder='Search...'
            rightIcon={FcSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <FcSearch/>
        </Button>
        <div className='flex gap-2'>
            <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
                <LuSunMoon/>
            </Button>
            <Link to='/signin'>
                <Button gradientDuoTone='purpleToBlue'>
                    Sign In
                </Button>
            </Link>
        </div>
    </Navbar>
  )
}

export default Header