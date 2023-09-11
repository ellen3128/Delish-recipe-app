import React, { useEffect, useState } from "react";
import "./Healthy.css";
import { Link } from 'react-router-dom';

export default function Desserts() {
  const [dessert, setDessert] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favoriteDesserts') || '[]')
  );

  useEffect(() => {
    getDessert();
  }, []);

  const getDessert = async () => {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=dessert`
      );
      const data = await api.json();
      console.log(data);
      // Make sure 'data.recipes' is the correct property => returned undefined bc it's an object
      setDessert(data.recipes);
  };

  const toggleFavorite = (recipeId) => {
    const isFavorite = favorites.includes(recipeId);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== recipeId);
    } else {
      newFavorites = [...favorites, recipeId];
    }

    localStorage.setItem('favoriteDesserts', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <div>
        <h4 className="classification">Sweet Recipes</h4>
        <div className="grid-container">
        {dessert.map((recipe) => (
          <div className="card-healthy" key={recipe.id}>
            <div className="img-container">
            <Link to={'/recipe/' + recipe.id}>
              <img className="healthy-image" src={recipe.image} alt={recipe.title} />
              </Link>

              <button 
                className={favorites.includes(recipe.id) ? "favorited" : ""}
                onClick={() => toggleFavorite(recipe.id)}>
                  {favorites.includes(recipe.id) ? "Unfavorite" : "Favorite"}
              </button>

            </div>
            <h4 className="recipeName">{recipe.title}</h4>
            </div>
        ))}
      </div>
      </div>
  );
}
