import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Vegies() {
  const [vegies, setVegies] = useState([]);

  useEffect(() => {
    getVegies();
  }, []);

  const getVegies = async () => {
    const check = localStorage.getItem("vegies");

    if (check && check !== "undefined") {
      try {
        const parsedData = JSON.parse(check);
        if (Array.isArray(parsedData) && parsedData.length) {
          setVegies(parsedData);
        } else {
          fetchFromAPI();
        }
      } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        fetchFromAPI();
      }
    } else {
      fetchFromAPI();
    }
  };

  const fetchFromAPI = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
    );
    const data = await api.json();
    localStorage.setItem("vegies", JSON.stringify(data.recipes));
    setVegies(data.recipes);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="topic">
        <h3 className="picks2">Veggie Picks</h3>
        </div>

        <Splide options={{
            fixedWidth: '270px',
            fixedHeight: '400px',
            arrows: false,
            pagination: false,
            drag: 'free',
            gap: '4rem',
            width: '90vw'
          }}
        >
          {vegies.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className="random-card">
                  <Link to={"/recipe/" + recipe.id}>
                    <img src={recipe.image} alt={recipe.title} />
                  </Link>
                </div>
                <p className="random-title">{recipe.title}</p>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
}
