import React from 'react';
import './NavBar.css';

const NavBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <nav>
      <h1>One Piece Crash Cruise</h1>
      <input type="text" placeholder="Search for an arc..." onChange={handleSearch} />
    </nav>
  );
};

export default NavBar;