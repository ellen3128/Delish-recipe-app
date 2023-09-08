import { FaSearch } from "react-icons/fa";
import {useState} from 'react';
import "./Search.css";
import {useNavigate} from 'react-router-dom';

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    // console.log('submit');
    e.preventDefault();
    navigate("/searched/" + input) // http://localhost:3000/searched/apple%20pie
   
  };

  return (
    <div className="searchContainer">
      <form className="searchForm" onSubmit={submitHandler}>
        <FaSearch className="searchIcon" />
        <input
          onChange={(e) => setInput(e.target.value)}
          className="searchInput"
          type="text"
          value={input}
          placeholder="Search"
        />
      </form>
    </div>
  );
}

export default Search;