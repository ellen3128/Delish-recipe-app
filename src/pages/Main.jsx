import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cuisine from "../components/Category/Cuisine";
import Dessert from "./HealthyDessert/Dessert";
import Healthy from "./HealthyDessert/Healthy";
import Recipe from './Recipe/Recipe';
import Searched from './Recipe/Searched';
import MealPlan from "./Mealplan/MealPlan";
import Profile from '../pages/Profile/profile';

function Main() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path='/cuisines/:type' element={<Cuisine />} />  
        <Route path='/healthy' element={<Healthy />} />
        <Route path="/desserts" element={<Dessert />} />
        <Route path='/recipe/:name' element={<Recipe />}/>
        <Route path='/searched/:search' element={<Searched />} /> 
        <Route path='/mealplan' element={<MealPlan />} /> 
      </Routes>
    
  );
}

export default Main;
