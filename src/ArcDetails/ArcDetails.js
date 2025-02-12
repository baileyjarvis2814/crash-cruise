import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ArcDetails.css';

const ArcDetails = () => {
  const { arcName } = useParams();
  const [arc, setArc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImportance, setShowImportance] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(false);

  useEffect(() => {
    fetch('https://onepiecearcsapi3d2y-0729a9eea5cc.herokuapp.com/api/data')
      .then(response => {
        console.log('Response headers:', response.headers);
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
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
    console.log('Loading data...');
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error loading data:', error);
    return <p>Error loading data: {error.message}</p>;
  }

  if (!arc) {
    console.log('Arc not found');
    return <p>Arc not found</p>;
  }

  return (
    <div className="arc-details-container">
      <img src={arc.Image} alt={arc.Arc} className="arc-details-image" />
      <div className="arc-details">
        <h2>{arc.Arc}</h2>
        <p><strong>Start on Chapter:</strong> {arc['Start onChapter']}</p>
        <p><strong>Total Chapters:</strong> {arc.TotalChapters}</p>
        <p><strong>Start on Episode:</strong> {arc['Start onEpisode']}</p>
        <p><strong>Total Episodes:</strong> {arc.TotalEpisodes}</p>
        <p><strong>Major Players:</strong> {arc['Major players']}</p>
        <button onClick={() => setShowImportance(!showImportance)}>
          {showImportance ? 'Hide Importance' : 'Show Importance'}
        </button>
        {showImportance && <p><strong>Importance:</strong> {arc.Importance}</p>}
        <button onClick={() => setShowSpoiler(!showSpoiler)}>
          {showSpoiler ? 'Hide Major Spoiler Moment' : 'Show Major Spoiler Moment'}
        </button>
        {showSpoiler && <p><strong>Major Spoiler Moment:</strong> {arc['Major Spoiler Moment']}</p>}
      </div>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
};

export default ArcDetails;
