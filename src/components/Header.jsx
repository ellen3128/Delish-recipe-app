import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import {useAuth0} from '@auth0/auth0-react' 
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";

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
        <Link to="/healthy/">
          <div className="grid-item"> Healthy 🥬 </div>
        </Link>
        <Link to="/desserts">
          <div className="grid-item"> Desserts 🍰 </div>
        </Link>
        <Link to="/mealplan">
          <div className="grid-item"> Meal Plan 📙 </div>
        </Link>
        <div>
          <LoginButton />
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
