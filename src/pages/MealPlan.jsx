import React from 'react'
import { useState } from 'react';
import MealList from "../components/MealList";
import './MealPlan.css';

function MealPlan() {
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);
   
    function handleChange(e) {
        setCalories(e.target.value);
    }

    function getMealData() {
        fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=${process.env.REACT_APP_API_KEY}&timeFrame=day&targetCalories=${calories}`
        )
        .then((response) => response.json())
        .then((data) => {
            setMealData(data);
            console.log(data);
        })
        .catch(() => {
            console.log('error');
        });
    }

    return (
        <div className="mealplan-container">
    <div>
        <input className="controls"
        type="number"
        placeholder="Maximum Daily Calories (e.g. 2000)"
        onChange={handleChange}
        />
    </div>
    <button className="mealplan-button" onClick={getMealData}>Get Daily Meal Plan</button>
    {mealData && <MealList mealData={mealData} />}
    </div>
  )
}

export default MealPlan