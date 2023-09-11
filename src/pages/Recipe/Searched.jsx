import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Searched.css';

function Searched() {
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    let params = useParams();

    const getSearched = async (name) => {
        try {
            const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
            if (!data.ok) {
                throw new Error(`Error fetching data: ${data.status} - ${data.statusText}`);
            }
            const recipes = await data.json();
            setSearchedRecipes(recipes.results);
            setIsLoading(false); // Set loading state to false when data is fetched
        } catch (error) {
            console.error("Error fetching data:", error);
            setSearchedRecipes([]);
            setIsLoading(false); // Set loading state to false on error
        }
    };

    useEffect(() => {
        getSearched(params.search);
    }, [params.search]);
    console.log(params.search);

    return (
        <>
        <h4 className="classification"> Searched : <span style={{textTransform:'uppercase'}}>{params.search}</span> </h4>
        <div className="grid-container">
            
            {isLoading ? (
                <p>Loading...</p>
            ) : searchedRecipes.length > 0 ? (
                searchedRecipes.map((item) => (
                    <div className="card-searched" key={item.id}>
                        <Link to={'/recipe/' + item.id}>
                        <div className="img-container">
                            <img className="searchedImg" src={item.image} alt="" />
                        </div>
                        <h4 className="recipeName">{item.title}</h4>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No recipes found</p>
            )}
        </div>
        </>
    );
}

export default Searched;