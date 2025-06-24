import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from "../Components/DashSidebar"
import DashProfile from "../Components/DashProfile"
import DashboardPosts from "../Components/DashboardPosts"
import DashboardUsers from "../Components/DashboardUsers"
import DashComments from "../Components/Dashcomments"
import AdminDashboard from "../Components/AdminDashboard"



const Dashboard = () => {
  const location = useLocation()
  const [tab,setTab] = useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl);
    }
  },[location.search])
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/*Sidebar*/}
      <div className="md:w-56">
        <DashSidebar/>
      </div>
      {/*Profile*/}
      {tab === 'profile' && <DashProfile/>}
      {/* Dashboard Posts  */}
      {tab === 'posts' && <DashboardPosts/>}
      {/* users */}
      {tab === 'users' && <DashboardUsers/>}
      {/* comments */}
      {tab === 'comments' && <DashComments/>}
      {/*Admin Dashboard */}
      {tab === 'admin-dashboard' && <AdminDashboard/>}
    </div>
  )
}

export default Dashboard