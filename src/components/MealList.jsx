import React from "react";
import Meal from "./Meal";

function MealList({ mealData }) {
  const nutrients = mealData.nutrients;
  console.log(nutrients);

  return (
    <main>
      <section className="nutrients">
        <h1 className="macros">Macros</h1>
        <ul>
          <li>Calories: {Math.round(nutrients.calories)}</li>
          <li>Carbohydrates: {Math.round(nutrients.carbohydrates)}</li>
          <li>Fat: {Math.round(nutrients.fat)}</li>
          <li>Protein: {Math.round(nutrients.protein)}</li>
        </ul>
      </section>

        <section className="meals">
            {mealData.meals.map((meal)=> {
                return <Meal key={meal.id} meal={meal} />;
            })}
        </section>
    </main>
  );
}

export default MealList;
