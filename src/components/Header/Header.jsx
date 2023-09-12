import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

function Header() {
  const { isLoading, isAuthenticated, user } = useAuth0();
  console.log(user);
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
          <div className="grid-item"> Healthy </div>
        </Link>
        <Link to="/desserts">
          <div className="grid-item"> Desserts </div>
        </Link>
        <Link to="/mealplan">
          <div className="grid-item"> Meal Plan </div>
        </Link>
        {!isLoading ? (
          <>
            <div>
              {isAuthenticated ? (
                <>
                  <Link to="/profile">
                    {" "}
                    <span className="username">
                      {" "}
                      {user.given_name} Account{" "}
                    </span>{" "}
                  </Link>{" "}
                  <LogoutButton />
                </>
              ) : (
                <LoginButton />
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Header;
