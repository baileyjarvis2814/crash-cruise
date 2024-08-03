import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>Get back on the ship or you'll get eaten by Sea Kings!!</p>
      <Link to="/" className="home-link">Back to the Cruise</Link>
    </div>
  );
};

export default NotFound;
