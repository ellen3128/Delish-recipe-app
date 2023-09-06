import React from 'react'
import Popular from '../components/Popular'; 
import Veggies from '../components/Veggies';   
import Banner from '../components/Banner';
import Category from '../components/Category';


function Home() {
  return (
    <div>
    <Banner />
    <Category />
    <Popular />
    <Veggies />
    </div>
  )
}

export default Home