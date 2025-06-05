import React from 'react'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Quiz from './components/Quiz'

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
      </Routes>
    </div>
  )
}

export default App