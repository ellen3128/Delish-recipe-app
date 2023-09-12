import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

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

    fetchFavorites("favoriteRecipes", setFavoriteRecipes);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

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

      <div className="favorites">
        <p className="favorite-title">
          {renderFavorites("Favorite Recipes:", favoriteRecipes)}
        </p>
      </div>
    </div>
  );

  function renderFavorites(title, items) {
    if (items.length > 0) {
      return (
        <div>
          <h3>{title}</h3>
          <ol style={{ fontWeight: "600" }}>
            {items.map((item) => (
              <li key={item.id}>
                <Link className="favoriteList" to={`/recipe/${item.id}`}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      );
    }
    return null;
  }
}
