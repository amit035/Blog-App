import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Projects from './Pages/Projects'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'
import FooterComp from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute'
import CreatePost from './Pages/CreatePost'
import Privacy from './Pages/Privacy'
import EditPost from './Pages/EditPost'
import PostPage from './Pages/PostPage'
import MoveTop from './Components/MoveTop'
import Search from './Pages/Search'

const App = () => {
  return (
    <BrowserRouter>
      <MoveTop/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create-post' element={<CreatePost/>}></Route>
            <Route path='/edit-post/:id' element={<EditPost/>}></Route>
        </Route>
        <Route path='/privacy' element={<Privacy/>}></Route>
        <Route path='/post/:postData' element={<PostPage/>}></Route>
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}

export default App