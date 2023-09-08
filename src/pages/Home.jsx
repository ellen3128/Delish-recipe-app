import React from 'react'
import Popular from '../components/OurPicks/Popular'; 
import Veggies from '../components/OurPicks/Veggies';   
import Banner from '../components/Header/Banner';
import Category from '../components/Category/Category';
import Search from '../components/Search';


function Home() {
  return (
    <div>
    <Banner />
    <Category />
    <Search />
    <Popular />
    <Veggies />
    </div>
  )
}

export default Home