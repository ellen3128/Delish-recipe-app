import React from 'react'
import bannerImage from '../../Images/bannerImage.png'
import './Header.css';

function Banner() {
  return (
    <div className="grid grid-cols-2">
        <img src={bannerImage} alt="ingredientsImg"></img>
        <div className="text"> <span>DELISH</span> seeks to help everyday cook looking for the <span>perfect</span> recipe every meal. Seek a well-balanced meal that is both healthy and delicious!</div>
    </div>
  )
}

export default Banner