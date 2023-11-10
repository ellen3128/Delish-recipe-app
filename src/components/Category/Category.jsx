import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import React from 'react';

import './Category.css';  

function Category() {
  return (
    <div className="list">
      <NavLink className="slink" to={'/cuisines/Italian'} activeclassname="active">
        <FaPizzaSlice className="category-icon" />
        <h4 className="category-name">Italian</h4>
      </NavLink>
      <NavLink className="slink" to={'/cuisines/American'} activeclassname="active">
        <FaHamburger className="category-icon" />
        <h4 className="category-name">American</h4>
      </NavLink>
      <NavLink className="slink" to={'/cuisines/Thai'} activeclassname="active">
        <GiNoodles className="category-icon" />
        <h4 className="category-name">Thai</h4>
      </NavLink>
      <NavLink className="slink" to={'/cuisines/Japaneses'} activeclassname="active">
        <GiChopsticks className="category-icon" />
        <h4 className="category-name">Japanese</h4>
      </NavLink>
    </div>
  )
}

export default Category;
