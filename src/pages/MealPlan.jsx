import React from 'react'
import { useState } from 'react';
import MealList from "../components/MealList";

function MealPlan() {
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);
   
    function handleChange(e) {
        
    }

    function getMealData() {

    }

    return (
        <div>
    <section classname="controls">
        <input 
        type="numner"
        placeholder="Calories (e.g. 2000)"
        onChange={handleChange}/>
    </section>
    <button onClick={getMealData}>Get Daily Meal Plan</button>
    </div>
  )
}

export default MealPlan