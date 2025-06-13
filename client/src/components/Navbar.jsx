import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { href, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react"

const Navbar = () => {
  const navigate = useNavigate();
  const [profileClicked, setprofileClicked] = useState(false);
  const [menuClicked,setmenuClicked] = useState(false)
  const { isLogin, setisLogin } = useContext(AppContext);
  const transition = {
  duration: 0.3,
  delay: 0.3,
  ease: [0, 0.71, 0.2, 1.01],
}
  const NavItems = isLogin ?  [
    { label: "Home", href: "#home" },
    { label: "Start Quiz", href: "#quiz" },
    { label: "Leaderboard", href: "#leaderboard" },
    { label: "My Scores", href: "#scores" },
  ] :  [
    { label: "Home", href: "#home" },
    { label: "How It Works", href: "#howitworks" },
    { label: "About", href: "About" },
  ];

  return (
    <div className="sm:p-4 flex items-center  w-full border border-t-0 border-b-[#929699] border-l-0 border-r-0  py-3 justify-between h-[65px]">
<div className="md:hidden ml-2">
  <img onClick={() => setmenuClicked(true)} src={assets.menu} alt="Menu"  />



{menuClicked && (
  <motion.div
    initial={{ x: '-100%' }} 
    animate={{ x: 0 }}      
    exit={{ x: '-100%' }}  
    transition={transition}
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 text-white z-50 flex flex-col p-6 space-y-6"
  >
    {/* Close button */}
    <div className="flex justify-end">
      <button
        onClick={() => setmenuClicked(false)}
        className="text-white text-2xl"
      >
        ✕
      </button>
    </div>

    {/* Menu Items */}
    <div className="flex flex-col space-y-4 mt-6">
      {NavItems.map((item, index) => (
        <p
          key={index}
          className="text-lg font-semibold cursor-pointer hover:text-gray-300"
          onClick={() => {
            setmenuClicked(false);
            if (item.label === 'Home') {
              navigate('/');
            }
          }}
        >
          {item.label}
        </p>
      ))}
    </div>
  </motion.div>
)}

</div>


      <div className="ml-2 items-center">
        <img
          src={assets.logo}
          className="cursor-pointer"
          onClick={() => navigate("/")}
          alt=""
        />
      </div>
      <div className="md:flex hidden md:space-x-5 lg:space-x-8 text-[#121417] font-medium">
        {NavItems.map((item, index) => (
          <div key={index} className="relative group cursor-pointer">
            <p
              onClick={() => {
                if (item.label === "Home") {
                  navigate("/");
                }
                else if(item.label === 'Start Quiz'){
                  navigate('/start_quiz')
                }
              }}
            >
              {item.label}
            </p>
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#121417] transition-all duration-300 group-hover:w-full"></span>
          </div>
        ))}
      </div>

      <div className="flex space-x-3 mr-4 items-center">
        {isLogin ? (
          <div className="relative">
            <img
              onClick={() => setprofileClicked(!profileClicked)}
              className="cursor-pointer"
              width={40}
              src={assets.profile}
              alt="Profile"
            />
            {profileClicked && (
              <div className="absolute right-0 mt-2 w-32 bg-[#a3a3a3] text-white rounded-md shadow-lg p-2 z-50">
                  <p onClick={()=> {navigate('/profile'); setprofileClicked(false)}} className="cursor-pointer hover:bg-[#888] p-1 rounded-md ">
                  Profile
                </p>
               
                <p
                  className="cursor-pointer hover:bg-[#888] p-1 rounded-md space-y-1.5"
                  onClick={() => {
                    setisLogin(false);
                    setprofileClicked(false);
                    navigate('/')
                    localStorage.removeItem("token")
                    setprofileClicked(false);
                  }}
                >
                  Logout
                </p>

              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer drop-shadow-md md:block bg-[#F0F2F5] font-bold rounded-2xl px-5 py-3"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
