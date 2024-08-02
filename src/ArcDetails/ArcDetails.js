import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArcDetails.css';

const ArcDetails = () => {
  const { arcName } = useParams();
  const [arc, setArc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        const arcData = data.find(arc => arc.Arc.toLowerCase().replace(/ /g, '-') === arcName);
        setArc(arcData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, [arcName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (!arc) {
    return <p>Arc not found</p>;
  }

  return (
    <div className="arc-details">
      <img src={arc.Image} alt={arc.Arc} className="arc-details-image" />
      <div className="arc-details-info">
        <h2>{arc.Arc}</h2>
        <p><strong>Start on Chapter:</strong> {arc['Start onChapter']}</p>
        <p><strong>Total Chapters:</strong> {arc.TotalChapters}</p>
        <p><strong>Start on Episode:</strong> {arc['Start onEpisode']}</p>
        <p><strong>Total Episodes:</strong> {arc.TotalEpisodes}</p>
        <p><strong>Major Players:</strong> {arc['Major players']}</p>
        <p><strong>Importance:</strong> {arc.Importance}</p>
        <p><strong>Major Spoiler Moment:</strong> {arc['Major Spoiler Moment']}</p>
      </div>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default ArcDetails;
