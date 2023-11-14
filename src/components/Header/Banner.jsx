import React from 'react'
import bannerImage from '../../Images/bannerImage.png'
import './Header.css';

function Banner() {
  return (
    <div className="bannerContainer">
    <div className="grid grid-cols-2">
        <img src={bannerImage} alt="ingredientsImg" className="bannerImg"></img>
        <div className="text"> <p>A DELISH life <br/> begins here.</p> <br>
        </br> <p className="subtext"> Find a well-balanced meal that is both healthy and delicious!</p> </div>
        </div>
    </div>
  )
}

export default Banner

