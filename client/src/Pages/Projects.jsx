import React from 'react'
import Advertisement from '../Components/Advertisement'

const Projects = () => {
    return(
        <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
         <h1 className='text-3xl font-semibold'>
            Projects
         </h1>
         <p className='text-base text-gray-500'>
            Build Fun Projects
         </p>
         <Advertisement/>
        </div>
    )
}

export default Projects