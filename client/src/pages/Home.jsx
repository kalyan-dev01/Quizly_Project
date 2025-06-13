import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'

const Home = () => {
  return (
    <div className='max-w-7xl md:mx-auto md:px-40'>
<Hero/>
<Featured/>
    </div>
  )
}

export default Home