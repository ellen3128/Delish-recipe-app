import React from "react";
import { useEffect, useState } from "react";
// Splide = carousel & SplideSlide = each card in carousel
import {Splide, SplideSlide} from '@splidejs/react-splide';
// import '@splidejs/react-splide/css';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import './Popular.css';

export default function Popular() {
    const [popular, setPopular] = useState([]);
  
    useEffect(() => {
      getPopular();
    }, []);
  
    const getPopular = async () => {
  
      const check = localStorage.getItem('popular');
      // to see if there's data in localStorage
  
     if (check) {
    try {
      setPopular(JSON.parse(check));
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      // Handle the error as needed
    }
  } else {
          // if not, fetch data (overall preventing unnecessary fetching every time)
          const api = await fetch(
              `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
            );
            const data = await api.json();
            // console.log(data);
            localStorage.setItem('popular', JSON.stringify(data.recipes));
            // in local storage, only strings are saved 
            setPopular(data.recipes);
            console.log(data.recipes);
      }
      
    };
  
    return (
      <div>
          <div className="wrapper">
              <h3>Popular Picks</h3>
  
              <Splide options={{
                  fixedWidth : '15rem',
                  arrows: false,
                  pagination: false,
                  drag: 'free',
                  gap: '5rem'
              }}>
              {popular.map((recipe) => {
                  return (
                      <SplideSlide key={recipe.id}>
                          <div className="card"> 
                              <img src={recipe.image} alt={recipe.title} />
                             
                              <div className="gradient"></div>
                          </div>
                          <p>{recipe.title}</p>
                      </SplideSlide>
                  );
              })}
              </Splide>
          </div>
      </div>
  );
  }