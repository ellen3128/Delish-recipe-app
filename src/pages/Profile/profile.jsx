import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [favoriteDesserts, setFavoriteDesserts] = useState([]);
  const [favoriteHealthy, setFavoriteHealthy] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [favoriteSearches, setSearchedRecipes] = useState([]);

  useEffect(() => {
    const fetchFavorites = async (key, setter) => {
      const storedFavorites = JSON.parse(localStorage.getItem(key) || "[]"); // Corrected this line

      if (storedFavorites.length) {
        try {
          const api = await fetch(
            `https://api.spoonacular.com/recipes/informationBulk?apiKey=${
              process.env.REACT_APP_API_KEY
            }&ids=${storedFavorites.join(",")}`
          );
          const data = await api.json();
          setter(data);
        } catch (error) {
          console.error("Error fetching favorite dessert details:", error);
        }
      }
    };

    fetchFavorites("favoriteDesserts", setFavoriteDesserts);
    fetchFavorites("favoriteHealthy", setFavoriteHealthy);
    fetchFavorites("favoriteRecipes", setFavoriteRecipes);
    fetchFavorites("favoriteSearches", setSearchedRecipes);
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

      {renderFavorites("Favorite Desserts:", favoriteDesserts)}
      {renderFavorites("Favorite Healthy Recipes:", favoriteHealthy)}
      {renderFavorites("Favorite Recipes:", favoriteRecipes)}
      {renderFavorites("Favorite from Searches:", favoriteSearches)}
    </div>
  );

  function renderFavorites(title, items) {
    if (items.length > 0) {
      return (
        <div>
          <h3>{title}</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Link to={`/recipe/${item.id}`}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }
}
