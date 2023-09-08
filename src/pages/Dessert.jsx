import React, { useEffect, useState } from "react";
// import "./Healthy.css";
import { Link } from 'react-router-dom';

export default function Desserts() {
  const [dessert, setDessert] = useState([]);

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

  return (
    <div>
        <h3 className="picks">Sweet Selections</h3>
        <div className="grid-container">
        {dessert.map((recipe) => (
          <div className="card-dessert" key={recipe.id}>
            <div className="img-container">
            <Link to={'/recipe/' + recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              </Link>
            </div>
            <h4>{recipe.title}</h4>
            </div>
        ))}
      </div>
      </div>
  );
}
