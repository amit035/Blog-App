import { Button } from "flowbite-react"
import { FaGithub } from "react-icons/fa";

function Advertisement() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center 
      text-center rounded-xl'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2>
          Please help us with Funding ! If you Like the App 😊
        </h2>
        <p className="my-2">
          Hope you Like the Experience 😃
        </p>
        <Button gradientDuoTone='greenToBlue' className="mx-auto my-1">
          <a href="https://github.com/amit035/Blog-App" className="flex-1 sm:gap-1" target="_blank">
            For Changes , Please Checkout our<FaGithub className='inline-block mx-1.5' size='20px'/>Page
          </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src="../AD1.jpg" alt="AD1" />
      </div>
    </div>
  )
}

export default Advertisement