import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Dessert from "./Dessert";

function pages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine" element={<Cuisine />} />
        <Route path="/dessert" element={<Dessert />} />
      </Routes>
    </Router>
  );
}

export default pages;
