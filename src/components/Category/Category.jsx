import { FaPizzaSlice, FaHamburger } from 'react-icons/fa';
import { GiNoodles, GiChopsticks } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import React from 'react';

import './Category.css';  

function Category() {
  return (
    <div className="list">
      <NavLink className="slink" to={'/cuisines/Italian'} activeclassname="active">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink className="slink" to={'/cuisines/American'} activeclassname="active">
        <FaHamburger />
        <h4>American</h4>
      </NavLink>
      <NavLink className="slink" to={'/cuisines/Thai'} activeclassname="active">
        <GiNoodles />
        <h4>Thai</h4>
      </NavLink>
      <NavLink className="slink" to={'/cuisines/Japaneses'} activeclassname="active">
        <GiChopsticks />
        <h4>Japanese</h4>
      </NavLink>
    </div>
  )
}

export default Category;
