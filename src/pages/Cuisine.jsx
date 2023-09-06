import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const check = localStorage.getItem("cuisine");
    if (check) {
      try {
        setCuisine(JSON.parse(check));
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
      }
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&cuisine=${name}`
      );
      const data = await api.json();
      localStorage.setItem("cuisine", JSON.stringify(data.recipes));
      setCuisine(data.recipes);
      console.log(data.recipes);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <div>
      {cuisine.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} />
          <h4>{item.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default Cuisine;
