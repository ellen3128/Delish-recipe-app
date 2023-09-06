
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Recipe.css";

function Recipe() {
    let params = useParams();
    const [details, setDetails] = useState(null);
    const [activeTab, setActiveTab] = useState("instructions");
  
    const fetchDetails = async () => {
      try {
        const data = await fetch(
          `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        if (!data.ok) {
          throw new Error(
            `Error fetching data: ${data.status} - ${data.statusText}`
          );
        }
        const detailData = await data.json();
        setDetails(detailData);
        console.log(detailData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDetails(null);
      }
    };
  
    useEffect(() => {
      fetchDetails();
    }, [params.name]);
  
    // Check if details is defined before rendering
    if (!details) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="detail-wrapper">
        <h2>{details.title}</h2>
        <div className="content-wrapper">
          <img src={details.image} alt="" />
          <div className="info">
            <button
              className={activeTab === "instructions" ? "active" : ""}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </button>
  
            <button
              className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </button>
            {activeTab === "instructions" && (
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                <h3
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                ></h3>
              </div>
            )}
            {activeTab === "ingredients" && (
              <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            )}
            ;
          </div>
        </div>
      </div>
    );
  }
  
  export default Recipe;