import React, { useEffect, useState } from "react";
import "./Healthy.css";
import { Link } from 'react-router-dom';

export default function Healthy() {
  const [healthy, setHealthy] = useState([]);

  useEffect(() => {
    getHealthy();
  }, []);

  const getHealthy = async () => {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=12&diet=Ketogenic|GlutenFree|Vegetarian`
      );
      const data = await api.json();
      console.log(data);
      // Make sure 'data.recipes' is the correct property => returned undefined bc it's an object
      setHealthy(data.results);
  };

  return (
    <div>
        <h3 className="picks">Healthy Selections</h3>
        <div className="grid-container">
        {healthy.map((recipe) => (
          <div className="card-healthy" key={recipe.id}>
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

