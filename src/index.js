import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithNavigate from './components/Auth/AuthProvider' 
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Auth0ProviderWithNavigate>
    <App />
    </Auth0ProviderWithNavigate>
  </Router>
);
