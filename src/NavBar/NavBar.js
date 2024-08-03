import React from 'react';
import PropTypes from 'prop-types';
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

NavBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default NavBar;
