import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Recipe.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("instructions");

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteRecipes") || "[]")
  );

  const fetchDetails = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      if (!data.ok) {
        throw new Error(
          `Error fetching data: ${data.status} - ${data.statusText}`
        );
      }
      const detailData = await data.json();
      setDetails(detailData);
      console.log(detailData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDetails(null);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const toggleFavorite = (recipeId) => {
    const isFavorite = favorites.includes(recipeId);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== recipeId);
    } else {
      newFavorites = [...favorites, recipeId];
    }
    localStorage.setItem("favoriteRecipes", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="recipe-title">{details.title}</h2>
      <div className="recipe-wrapper">
        <div className="image-container">
          <img className="recipe-image" src={details.image} alt="" />
        </div>
        {favorites.includes(details.id) ? (
          <FaHeart
            className="favorited"
            onClick={() => toggleFavorite(details.id)}
          />
        ) : (
          <FaRegHeart onClick={() => toggleFavorite(details.id)} />
        )}
        <section className="contents">
          <button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </button>

          <button
            className={`${activeTab === "ingredients" ? "active" : ""} ingredients`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </button>
          {activeTab === "instructions" && (
            <div className="contents">
              <h3
                className="summary"
                dangerouslySetInnerHTML={{ __html: details.summary }}
              ></h3>
              <h3
                className="summary"
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h3>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul className="recipeIngredients">
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default Recipe;
