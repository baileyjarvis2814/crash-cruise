import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import ArcCard from '../ArcCard/ArcCard';
import './Homepage.css'

const HomePage = () => {
  const [arcs, setArcs] = useState([]);
  const [filteredArcs, setFilteredArcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        setArcs(data);
        setFilteredArcs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = arcs.filter(arc => arc.Arc.toLowerCase().includes(lowercasedTerm));
    setFilteredArcs(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <h2>Welcome to One Piece Crash Cruise</h2>
      <p>Search for your favorite arcs and explore the adventures!</p>
      <div className="arc-card-container">
        {filteredArcs.map(arc => (
          <ArcCard key={arc.Arc} arc={arc} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
