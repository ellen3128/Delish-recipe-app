import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cuisine from "../components/Cuisine";
import Dessert from "./Dessert";
import Healthy from "./Healthy";
import Recipe from './Recipe';

function Main() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/cuisines/:type' element={<Cuisine />} />  
        <Route path='/healthy' element={<Healthy />} />
        <Route path="/desserts" element={<Dessert />} />
        <Route path='/recipe/:name' element={<Recipe />}/>
      </Routes>
    
  );
}

export default Main;
