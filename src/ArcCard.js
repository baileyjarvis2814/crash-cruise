import React from 'react';
import { Link } from 'react-router-dom';
import './ArcCard.css';

const ArcCard = ({ arc }) => {
  console.log('Arc Image URL:', arc.Image); // Debugging line
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
    </div>
  );
};

export default ArcCard;
