import React from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div>
        <div className='md:hidden relative w-full'>
            <img src={assets.mobilehero} alt="" />
            <button  className='absolute bg-[#3f3f3f] text-white rounded-full px-2 py-2 bottom-7  left-32'>Start a quiz</button>
        </div>
        <div className='hidden md:block'>
            <img src={assets.hero} className='w-7xl' alt="" />
        </div>
        
    </div>
  )
}

export default Hero