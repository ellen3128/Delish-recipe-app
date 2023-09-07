import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function Favorites({ isFavorited, toggleFavorite }) {
  return (
    <div className="heart-icon" onClick={toggleFavorite}>
      {isFavorited ? <AiFillHeart /> : <AiOutlineHeart />}
    </div>
  );
}

export default Favorites;
