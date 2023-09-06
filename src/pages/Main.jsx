import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Dessert from "./Dessert";

function Main() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisines" element={<Cuisine />} />
        <Route path="/desserts" element={<Dessert />} />
      </Routes>
    
  );
}

export default Main;
