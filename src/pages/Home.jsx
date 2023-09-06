import React from 'react'
import Popular from '../components/Popular'; 
import Veggies from '../components/Veggies';   
import Banner from '../components/Banner';


function Home() {
  return (
    <div>
    <Banner />
    <Popular />
    <Veggies />
    </div>
  )
}

export default Home