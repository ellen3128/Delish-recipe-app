// import React from "react";
// import { useEffect, useState } from "react";
// // Splide = carousel & SplideSlide = each card in carousel
// import { Splide, SplideSlide } from "@splidejs/react-splide";
// // import '@splidejs/react-splide/css';
// import "@splidejs/splide/dist/css/themes/splide-default.min.css";
// import "./Card.css";
// import { Link } from "react-router-dom";

// export default function Popular() {
//   const [popular, setPopular] = useState([]);

//   useEffect(() => {
//     getPopular();
//   }, []);

//   const getPopular = async () => {
//     const check = localStorage.getItem("popular");
//     // to see if there's data in localStorage

//     if (check) {
//       try {
//         setPopular(JSON.parse(check));
//       } catch (error) {
//         console.error("Error parsing data from localStorage:", error);
//         // Handle the error as needed
//       }
//     } else {
//       // if not, fetch data (overall preventing unnecessary fetching every time)
//       const api = await fetch(
//         `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
//       );
//       const data = await api.json();
//       console.log(data);
//       localStorage.setItem("popular", JSON.stringify(data.recipes));
//       // in local storage, only strings are saved
//       setPopular(data.recipes);
//       console.log(data.recipes);
//     }
//   };

//   return (
//     <div>
//       <div className="wrapper">
//         <div className="picks">Our Picks</div>

//         <Splide
//           options={{
//             fixedWidth: "15rem",
//             arrows: false,
//             pagination: false,
//             drag: "free",
//             gap: "3rem",
//           }}
//         >
//           {popular.map((recipe) => {
//             return (
//               <SplideSlide key={recipe.id}>
//                 <div className="card">
//                   <Link to={"/recipe/" + recipe.id}>
//                     <img src={recipe.image} alt={recipe.title} />
//                     <div className="gradient"></div>
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
        <div className="picks">Our Picks</div>

        <Splide
          options={{
            fixedWidth: "15rem",
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "3rem",
          }}
        >
          {popular.map((recipe) => {
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
