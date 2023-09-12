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
          <li>
            {" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Calories:
            </span>{" "}
            {Math.round(nutrients.calories)}cal
          </li>
          <li>
            {" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Carbohydrates:
            </span>{" "}
            {Math.round(nutrients.carbohydrates)}g
          </li>
          <li>
            {" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Fat:
            </span>{" "}
            {Math.round(nutrients.fat)}g
          </li>
          <li>
            {" "}
            <span style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              Protein:
            </span>{" "}
            {Math.round(nutrients.protein)}g
          </li>
        </ul>
      </section>

      <section className="meals">
        {mealData.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </section>
    </main>
  );
}

export default MealList;
