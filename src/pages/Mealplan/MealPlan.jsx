import React from "react";
import { useState } from "react";
import MealList from "../../components/Mealplan/MealList";
import "./MealPlan.css";

export default function MealPlan() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

  function handleChange(e) {
    setCalories(e.target.value);
  }

  const getMealData = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=day&targetCalories=${calories}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMealData(data);
      console.log(data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="input-field">
      <section className="controls">
        <input
          type="number"
          placeholder="Input daily caloric intake (ex.2000)"
          onChange={handleChange}
        />
      </section>
      <button className="mealPlanbtn" onClick={getMealData}>
        Get Daily Meal Plan
      </button>
      <div className="meal">{mealData && <MealList mealData={mealData} />}</div>
    </div>
  );
}


