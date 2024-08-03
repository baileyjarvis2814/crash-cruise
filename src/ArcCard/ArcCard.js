import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ArcCard.css';

const ArcCard = ({ arc, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(arc.isFavorite);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(arc.Arc);
  };

  return (
    <div className="arc-card">
      <Link to={`/arcs/${arc.Arc.toLowerCase().replace(/ /g, '-')}`}>
        <img
          src={arc.Image}
          alt={arc.Arc}
          className="arc-card-image"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Fallback to placeholder image
        />
        <h3>{arc.Arc}</h3>
        <p>Total Chapters: {arc.TotalChapters}</p>
        <p>Total Episodes: {arc.TotalEpisodes}</p>
      </Link>
      <button onClick={handleToggleFavorite}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

export default ArcCard;

