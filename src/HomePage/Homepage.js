import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import ArcCard from '../ArcCard/ArcCard';
import './Homepage.css';

const HomePage = () => {
  const [arcs, setArcs] = useState([]);
  const [filteredArcs, setFilteredArcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    fetch('https://onepiecearcsapi3d2y-0729a9eea5cc.herokuapp.com/api/data')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
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

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const manifestUrl = `${baseUrl}/manifest.json`;
  
    console.log('Fetching manifest from:', manifestUrl);
  
    fetch(manifestUrl, { mode: 'cors' })
      .then(response => {
        console.log('Manifest Response Status:', response.status);
        response.headers.forEach((value, key) => {
          console.log(`Header: ${key}, Value: ${value}`);
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Manifest Data:', data);
      })
      .catch(error => {
        console.error('Manifest Fetch Error:', error);
      });
  }, []);  

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = arcs.filter(arc => arc.Arc.toLowerCase().includes(lowercasedTerm));
    setFilteredArcs(showFavorites ? filtered.filter(arc => arc.isFavorite) : filtered);
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
    setFilteredArcs(showFavorites ? updatedArcs.filter(arc => arc.isFavorite) : updatedArcs);
  };

  const handleToggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    if (showFavorites) {
      setFilteredArcs(arcs);
    } else {
      setFilteredArcs(arcs.filter(arc => arc.isFavorite));
    }
  };

  if (loading) {
    console.log('Loading data...');
    return <p>Loading...</p>;
  }

  if (error) {
    console.error('Error loading data:', error);
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div>
      <NavBar onSearch={handleSearch} />
      <h2>Welcome to One Piece Crash Cruise</h2>
      <p>Search for your favorite arcs and explore the adventures!</p>
      <button onClick={handleToggleShowFavorites}>
        {showFavorites ? 'Show All Arcs' : 'Show Favorite Arcs'}
      </button>
      <div className="arc-card-container">
        {filteredArcs.length > 0 ? (
          filteredArcs.map(arc => (
            <ArcCard key={arc.Arc} arc={arc} onToggleFavorite={handleToggleFavorite} />
          ))
        ) : (
          <p>No arcs found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
