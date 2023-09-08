import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from './Category/Category';
import { Link } from 'react-router-dom';
import './Cuisine.css';

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  
  const getCuisine = async (name) => {
  const data = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
  );

  const recipes = await data.json();
  setCuisine(recipes.results);
};

useEffect(() => {
  getCuisine(params.type);
  console.log(params.type);
}, [params.type]);

  return (
    <div>
      <Category />
      {cuisine.map((item) => (
        <div className="card-cuisine" key={item.id}>
          <div className="img-container">
           <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Cuisine;
