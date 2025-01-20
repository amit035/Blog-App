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

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route element={<PrivateRoute/>}>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
            <Route path='/create-post' element={<CreatePost/>}></Route>
        </Route>
        <Route path='/privacy' element={<Privacy/>}></Route>
      </Routes>
      <FooterComp/>
    </BrowserRouter>
  )
}

export default App