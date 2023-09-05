import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
    <div class="grid grid-cols-4 gap-4">
        <div class="grid-item delish"> DELISH </div>    
        <div class="grid-item"> Home </div>    
        <div class="grid-item"> Cuisines </div>    
        <div class="grid-item"> Desserts </div>    
    </div>
    </div>
  )
}

export default Header;
