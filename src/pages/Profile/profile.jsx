
import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Link } from "react-router-dom";
import "./Profile.css";

export default function Profile () {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [favoriteDesserts, setFavoriteDesserts] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteDesserts') || '[]');

    if (storedFavorites.length) {
      const fetchFavorites = async () => {
        try {
          const api = await fetch(
            `https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.REACT_APP_API_KEY}&ids=${storedFavorites.join(',')}`
          );
          const data = await api.json();
          setFavoriteDesserts(data);
        } catch (error) {
          console.error("Error fetching favorite dessert details:", error);
        }
      };
      
      fetchFavorites();
    }
  }, []);


  // If user is not authenticated, redirect to home route
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If the authentication status is true but the confirmation is still loading, render a loading message
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  // If the user is authenticated and loading is complete, render the user's profile data
  return (
    <div className="container-user">
      <div className="image-container">
        <img className="userpic" src={user.picture} alt={""} />
      </div>
      <h2 className="userName">
        Welcome,{" "}
        <span style={{ color: "#00473D", fontWeight: "800" }}>{user.name}</span>
      </h2>
      <p className="userEmail">{user.email}</p>
      {/* You can add more user details here, such as user.email, user.picture, etc. */}
    
      {favoriteDesserts.length > 0 && (
        <div>
          <h3>Your Favorite Desserts:</h3>
          <ul>
            {favoriteDesserts.map(dessert => (
              <li key={dessert.id}>
                {dessert.title}
                <Link to={`/recipe/${dessert.id}`}>{dessert.title}</Link>
                </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


