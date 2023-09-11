import React, { useEffect, useState } from "react";
import "./Healthy.css";
import { Link } from "react-router-dom";
import { FaRegHeart } from 'react-icons/fa'; // Regular (empty) heart
import { FaHeart } from 'react-icons/fa';    // Solid heart

export default function Healthy() {
  // const [healthy, setHealthy] = useState([]);
  
  const [ketogenicRecipes, setKetogenicRecipes] = useState([]);
  const [glutenFreeRecipes, setGlutenFreeRecipes] = useState([]);
  const [veganRecipes, setVeganRecipes] = useState([]);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favoriteHealthy') || '[]')
  );
    

  useEffect(() => {
    const fetchAllRecipes = async () => {
      const keto = await getKetogenic() || [];
      console.log("Keto:", keto);
      const glutenFree = await getGlutenFree() || [];
      const vegan = await getVegan() || [];
      

      // Gather all recipes from the fetches
      const combinedRecipes = [...keto, ...glutenFree, ...vegan];

      // Filter out duplicates
      const uniqueRecipes = filterUniqueRecipes(combinedRecipes);

      // Set states accordingly
      setKetogenicRecipes(uniqueRecipes.filter(recipe => keto.includes(recipe)));
      setGlutenFreeRecipes(uniqueRecipes.filter(recipe => glutenFree.includes(recipe)));
      setVeganRecipes(uniqueRecipes.filter(recipe => vegan.includes(recipe)));
    };

    fetchAllRecipes();
  }, []);

const filterUniqueRecipes = (recipes) => {
    const seenIds = new Set();
    const uniqueRecipes = [];

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

const toggleFavorite = (recipeId) => {
  const isFavorite = favorites.includes(recipeId);
  let newFavorites;

  if (isFavorite) {
    newFavorites = favorites.filter(id => id !== recipeId);
  } else {
    newFavorites = [...favorites, recipeId];
  }
  // console.log(newFavorites);
  localStorage.setItem('favoriteHealthy', JSON.stringify(newFavorites));
  setFavorites(newFavorites);
};

  // const getHealthy = async () => {
  //     const api = await fetch(
  //       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=12&diet=Ketogenic|GlutenFree|Vegetarian`
  //     );
  //     const data = await api.json();
  //     console.log(data);
  //     // Make sure 'data.recipes' is the correct property => returned undefined bc it's an object
  //     setHealthy(data.results);
  // };

  return (
    <div>
      {/* <h3 className="picks">Healthy Selections</h3> */}

      <h4 className="classification">Ketogenic</h4>
      <div className="grid-container">
        {ketogenicRecipes.map((recipe) => (
          <div className="card-healthy" key={recipe.id}>
            <div className="img-container">
              <Link to={"/recipe/" + recipe.id}>
                <img className="healthy-image" src={recipe.image} alt={recipe.title} />
              </Link>

              {
                 favorites.includes(recipe.id) ? 
                 <FaHeart className="favorited" onClick={() => toggleFavorite(recipe.id)} /> 
                 : 
                 <FaRegHeart onClick={() => toggleFavorite(recipe.id)} />
              }

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
                <img className="healthy-image" src={recipe.image} alt={recipe.title} />
              </Link>

              {
                 favorites.includes(recipe.id) ? 
                 <FaHeart className="favorited" onClick={() => toggleFavorite(recipe.id)} /> 
                 : 
                 <FaRegHeart onClick={() => toggleFavorite(recipe.id)} />
              }

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
                <img className="healthy-image" src={recipe.image} alt={recipe.title} />
              </Link>

              {
                 favorites.includes(recipe.id) ? 
                 <FaHeart className="favorited" onClick={() => toggleFavorite(recipe.id)} /> 
                 : 
                 <FaRegHeart onClick={() => toggleFavorite(recipe.id)} />
              }
              
            </div>
            <h4 className="recipeName">{recipe.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
