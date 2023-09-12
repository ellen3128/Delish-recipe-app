import React, { useState, useEffect } from "react";

function Meal({ meal }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
        try {
          const response = await fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`
          );
  
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
  
          const data = await response.json();
          setImageUrl(data.image);
        } catch (error) {
          console.log("Error:", error);
        }
      };
  
      fetchImage();
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
