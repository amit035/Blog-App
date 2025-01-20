import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const About = () => {
  const {theme} = useSelector((state)=> state.theme);
  return (
    <div className='my-10 min-h-screen'>
        <div className='transparent-box rounded-xl'>
          <p className=''>Hi , I'm Amit Kumar Behera the Developer of this Page.
              My Vision is to let the world share their experience's in this platform , Please let me know your 
              Queries on
                {/* <FaLinkedin style={{ display: 'inline-block'}} className='text-blue-600 h-8 w-8 mx-1'/> */}
              <Link to='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox' target='blank_'>
                <img style={{display: 'inline-block'}} src="Gmail.png" alt="Gmail" 
                width="45" height="45" className='mx-1'/>
              </Link>
          </p> 
        </div> 
    </div>
  )
}

export default About