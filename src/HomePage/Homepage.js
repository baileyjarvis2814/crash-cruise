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
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        const updatedData = data.map(arc => ({
          ...arc,
          isFavorite: favorites[arc.Arc] || false
        }));
        setArcs(updatedData);
        setFilteredArcs(updatedData);
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

  const handleToggleFavorite = (arcName) => {
    const updatedArcs = arcs.map(arc => {
      if (arc.Arc === arcName) {
        const isFavorite = !arc.isFavorite;
        const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
        favorites[arc.Arc] = isFavorite;
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return { ...arc, isFavorite };
      }
      return arc;
    });
    setArcs(updatedArcs);
    setFilteredArcs(updatedArcs);
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
          <ArcCard key={arc.Arc} arc={arc} onToggleFavorite={handleToggleFavorite} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
