import React, { useEffect, useState } from 'react';
import ArcCard from '../ArcCard/ArcCard';
import "./Homepage.css"

const HomePage = () => {
  const [arcs, setArcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setArcs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div>
      <h2>Welcome to One Piece Crash Cruise</h2>
      <p>Search for your favorite arcs and explore the adventures!</p>
      <div className="arc-card-container">
        {arcs.map(arc => (
          <ArcCard key={arc.Arc} arc={arc} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;