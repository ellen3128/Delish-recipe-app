import React, { useEffect, useState } from "react";
import "./Healthy.css";
import { Link } from "react-router-dom";

export default function Healthy() {
  const [ketogenicRecipes, setKetogenicRecipes] = useState([]);
  const [glutenFreeRecipes, setGlutenFreeRecipes] = useState([]);
  const [veganRecipes, setVeganRecipes] = useState([]);

  useEffect(() => {
    const fetchAllRecipes = async () => {
      // Fetch recipes for each category
      const keto = (await getKetogenic()) || [];
      const glutenFree = (await getGlutenFree()) || [];
      const vegan = (await getVegan()) || [];

      // Gather all recipes from the fetches
      const combinedRecipes = [...keto, ...glutenFree, ...vegan];
      const uniqueRecipes = filterUniqueRecipes(combinedRecipes);

      // Filter uniqueRecipes to get only the recipes in specific category
      setKetogenicRecipes(
        uniqueRecipes.filter((recipe) => keto.includes(recipe))
      );
      setGlutenFreeRecipes(
        uniqueRecipes.filter((recipe) => glutenFree.includes(recipe))
      );
      setVeganRecipes(uniqueRecipes.filter((recipe) => vegan.includes(recipe)));
    };

    fetchAllRecipes();
  }, []);

  const filterUniqueRecipes = (recipes) => {
    const seenIds = new Set(); //store IDs already "seen" or processed
    const uniqueRecipes = [];

    // To avoid duplicates: if id is unique, add to seenIds and uniqueRecipes
    for (const recipe of recipes) {
      if (!seenIds.has(recipe.id)) {
        seenIds.add(recipe.id);
        uniqueRecipes.push(recipe);
      }
    }

    return uniqueRecipes;
  };

  const getKetogenic = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=4&diet=Ketogenic`
    );
    const data = await api.json();
    return data.results;
  };

  const getGlutenFree = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=4&diet=GlutenFree`
    );
    const data = await api.json();
    return data.results;
  };

  const getVegan = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=4&diet=Vegan`
    );
    const data = await api.json();
    return data.results;
  };

  return (
    <div>
      <h4 className="classification">Ketogenic</h4>
      <div className="grid-container">
        {ketogenicRecipes.map((recipe) => (
          <div className="card-healthy" key={recipe.id}>
            <div className="img-container">
              <Link to={"/recipe/" + recipe.id}>
                <img
                  className="healthy-image"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Link>
            </div>
            <h4 className="recipeName">{recipe.title}</h4>
          </div>
        ))}
      </div>

      <h4 className="classification">Gluten Free</h4>
      <div className="grid-container">
        {glutenFreeRecipes.map((recipe) => (
          <div className="card-healthy" key={recipe.id}>
            <div className="img-container">
              <Link to={"/recipe/" + recipe.id}>
                <img
                  className="healthy-image"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Link>
            </div>
            <h4 className="recipeName">{recipe.title}</h4>
          </div>
        ))}
      </div>

      <h4 className="classification">Vegan</h4>
      <div className="grid-container">
        {veganRecipes.map((recipe) => (
          <div className="card-healthy" key={recipe.id}>
            <div className="img-container">
              <Link to={"/recipe/" + recipe.id}>
                <img
                  className="healthy-image"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </Link>
            </div>
            <h4 className="recipeName">{recipe.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
