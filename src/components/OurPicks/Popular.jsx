import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");

    if (check && check !== "undefined") {
      try {
        const parsedData = JSON.parse(check);
        if (Array.isArray(parsedData) && parsedData.length) {
          setPopular(parsedData);
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
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const data = await api.json();
    localStorage.setItem("popular", JSON.stringify(data.recipes));
    setPopular(data.recipes);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="grid-rows-1 topic">
          <h3 className="picks1">Our Picks</h3>
        </div>
        <div className="grid-rows-1">
          <Splide
            options={{
              fixedWidth: "270px",
              fixedHeight: "400px",
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "4rem",
              width: "90vw",
            }}
          >
            {popular.map((recipe) => {
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
    </div>
  );
}
