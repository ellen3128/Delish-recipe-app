import React, { useState, useEffect } from "react";

function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [meal.id]);

  return (
    <article>
      <h1>{meal.title}</h1>
      <img className="mealImg" src={imageUrl} alt="recipe" />
      <ul className="instructions">
        <li>Preparation Time: {meal.readyInMinutes} minutes</li>
        <li>Number of Servings: {meal.servings}</li>
      </ul>
      <a href={meal.sourceUrl} className="mealUrl">
        {" "}
        Go to Recipe
      </a>
    </article>
  );
}

export default Meal;
