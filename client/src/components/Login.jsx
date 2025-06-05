import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios'
import { AppContext } from "../context/AppContext";
import { ToastContainer, toast } from 'react-toastify';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {isLogin,setisLogin} = useContext(AppContext)
  const navigate = useNavigate();
  const [errorMessage,setErrorMessage] = useState('')
  const [userData,setUserData] = useState({
    email:'',
    password:''
  })
  const handleChange = (e) =>{
      const{name,value} = e.target;
      setUserData(prev=> ({...prev,[name]:value}))
  }
  const handleLogin = async (e) =>{
    e.preventDefault();
    try{
      const response =await axios.post(import.meta.env.VITE_BACKEND_URL+'/api/users/login',{email:userData.email,password:userData.password})
      console.log(response)
      if(!response.data.success){
        setErrorMessage(response.message)
      }
      if(response.data.success){
        const token = response.data.token;
        localStorage.setItem('token',token)
        navigate('/')
        setisLogin(true)
        toast(response.data.message)
      }
    }

    catch(err){
     if(err.response){
      console.log("Error:", err.response.data.message); // from backend
      setErrorMessage(err.response.data.message);
     }
    }
  }





  return (
    <form onSubmit={handleLogin}>
    <div className="md:flex mt-3 md:mt-6">
      <div className="md:w-1/2  md:space-y-2 flex flex-col items-center">
        <div>
       
          <h1 className="font-bold md:text-3xl ">Login </h1>
          <p className="text-[#A1824A] text-sm">
            Access your account to continue
          </p>

          <p className="font-bold text-md mt-3">Email</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={userData.email}

            className="outline pl-3 pr-9 py-2 rounded-xl outline-[#A1824A]"
            placeholder="Enter your email"
          />
         {errorMessage && <p className="text-sm text-red-500 ">{errorMessage}</p>}
        </div>

        <div>
          <p className="font-bold text-md">Password</p>
          <input
          name="password"
            type="password"
            className="outline pl-3 pr-9 py-2 rounded-xl outline-[#A1824A]"
            placeholder="Enter your password"
            onChange={handleChange}
            value={userData.password}
          />
        </div>
        <div>
          <button className="bg-[#009963] border-none cursor-pointer rounded-3xl px-20 mt-1 md:px-29 py-1.5 items-center text-white">
            Log in
          </button>
        </div>
        
        <p className="text-[#A1824A] text-sm cursor-pointer">
          Forgot your password?
        </p>
        <p
          className="text-[#A1824A] text-sm  cursor-pointer "
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Signup
        </p>
        
      </div>

      <div className="w-1/2 relative hidden md:block ">
        <img className="relative -right-60" src={assets.right} alt="" />
      </div>
    </div>
    </form>
  );
};

export default Login;
