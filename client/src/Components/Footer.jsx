import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";

const FooterComp = () =>{

    return <Footer container className="border border-t-8 border-b-8 border-teal-500">
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                {/* Logo */}
                <div className="mt-5">
                    <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white'>
                    <div className='px-1 py-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 
                    to-pink-500 satisfy-regular font-bold'>Memories & Stories</div>
                    </Link>
                </div>
                {/* Misc */}
                <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                    {/*About*/}
                    <div>
                    <Footer.Title title="Company" className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 font-bold"/>
                    <Footer.LinkGroup className="gap-4">
                        <Link
                            // href="https://www.linkedin.com/in/amit-kumar-behera-748036199/"
                            to='/about'
                            // target="_blank"
                            rel="noopener noreferrer"
                        >
                        <div className="flex text-transparent bg-clip-text bg-gradient-to-r
                         to-emerald-600 from-sky-400 font-bold">About</div>
                        </Link>
                        {/* Gmail */}
                        <Footer.Link
                            href="https://www.linkedin.com/in/amit-kumar-behera-748036199/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">Gmail</div>
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    {/* Follow */}
                    <div>
                    <Footer.Title title="FOLLOW US" className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-600 to-pink-500 font-bold"/>
                    <Footer.LinkGroup>
                        <Footer.Link
                            href="https://www.linkedin.com/in/amit-kumar-behera-748036199/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">Github</div>
                        </Footer.Link>
                        <Footer.Link
                            href="https://www.linkedin.com/in/amit-kumar-behera-748036199/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">Facebook</div>
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    {/*LEGAL*/}
                    <div>
                    <Footer.Title title="LEGAL" className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-800 via-purple-600 to-pink-500 font-bold"/>
                    <Footer.LinkGroup className="gap-4">
                        <Link
                            to='/privacy'
                            // target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">Privacy</div>
                        </Link>
                        <Footer.Link
                            href="https://www.linkedin.com/in/amit-kumar-behera-748036199/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">Terms &amp; Conditions</div>
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                </div> 
            </div>
            <Footer.Divider/>
            {/*Copyright*/}
            <div className="w-full sm:flex sm:items-center sm:justify-between">
                <Footer.Copyright href='#' by='Amit Behera' year={new Date().getFullYear()}/>
                <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                    <Footer.Icon href="#" icon={FaFacebook}/>
                    <Footer.Icon href="#" icon={FaFacebook}/>
                    <Footer.Icon href="#" icon={FaFacebook}/>
                </div>
            </div>
        </div>
    </Footer>
    
}

export default FooterComp;