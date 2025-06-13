import React from 'react'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Quiz from './components/Quiz'
import Profile from './components/Profile';

const App = () => {
  return (
    <div>
      <Navbar/>
      <ToastContainer position='bottom-right' />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/start_quiz' element={<Quiz/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App