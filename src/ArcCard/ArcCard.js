import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ArcCard.css';

const ArcCard = ({ arc, onToggleFavorite }) => {
  const handleToggleFavorite = () => {
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
        {arc.isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  );
};

ArcCard.propTypes = {
  arc: PropTypes.shape({
    Arc: PropTypes.string.isRequired,
    Image: PropTypes.string,
    TotalChapters: PropTypes.number,
    TotalEpisodes: PropTypes.number,
    isFavorite: PropTypes.bool
  }).isRequired,
  onToggleFavorite: PropTypes.func.isRequired
};

export default ArcCard;


