import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar.js';
import HomePage from './Homepage.js';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Other routes can be added here */}
      </Routes>
    </div>
  );
}

export default App;

