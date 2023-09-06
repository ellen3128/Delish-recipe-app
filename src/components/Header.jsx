import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
    <div className="grid grid-cols-4 gap-4">
        <Link to="/">
          <div className="grid-item delish"> DELISH </div>    
        </Link>
        <Link to="/">
        <div className="grid-item"> Home </div>    
        </Link>
        <Link to="/cuisines">
        <div className="grid-item"> Cuisines </div>
        </Link>    
        <Link to="/desserts">
        <div className="grid-item"> Desserts </div>   
        </Link> 
    </div>
    </div>
  )
}

export default Header;
