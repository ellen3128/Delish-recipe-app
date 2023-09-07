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
        <h3 className="picks">Vegetarian Picks</h3>

        <Splide
          options={{
            fixedWidth: "15rem",
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "3rem",
          }}
        >
          {vegies.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <div className="card">
                  <Link to={"/recipe/" + recipe.id}>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="gradient"></div>
                  </Link>
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







// import React from "react";
// import { useEffect, useState } from "react";
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// import "@splidejs/splide/dist/css/themes/splide-default.min.css";
// import "./Card.css";
// import { Link } from "react-router-dom";

// export default function Vegies() {
//   const [vegies, setVegies] = useState([]);

//   useEffect(() => {
//     getVegies();
//   }, []);

//   const getVegies = async () => {
//     const check = localStorage.getItem("vegies");
//     // to see if there's data in localStorage

//     if (check) {
//       try {
//         setVegies(JSON.parse(check));
//       } catch (error) {
//         console.error("Error parsing data from localStorage:", error);
//         // Handle the error as needed
//       }
//     } else {
//       // if not, fetch data (overall preventing unnecessary fetching every time)
//       const api = await fetch(
//         `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
//       );
//       const data = await api.json();
//       console.log(data);
//       localStorage.setItem("vegies", JSON.stringify(data.recipes));
//       // in local storage, only strings are saved
//       setVegies(data.recipes);
//       console.log(data.recipes);
//     }
//   };

//   return (
//     <div>
//       <div className="wrapper">
//         <h3 className="picks">Vegetarian Picks</h3>

//         <Splide
//           options={{
//             fixedWidth: "15rem",
//             arrows: false,
//             pagination: false,
//             drag: "free",
//             gap: "3rem",
//           }}
//         >
//           {vegies.map((recipe) => {
//             return (
//               <SplideSlide key={recipe.id}>
//                 <div className="card">
//                   <Link to={"/recipe/" + recipe.id}>
//                     <img src={recipe.image} alt={recipe.title} />
//                   <div className="gradient"></div>
//                   </Link>
//                 </div>
//                 <p>{recipe.title}</p>
//               </SplideSlide>
//             );
//           })}
//         </Splide>
//       </div>
//     </div>
//   );
// }
