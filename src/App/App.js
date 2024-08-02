import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from '../NavBar/NavBar';
import HomePage from '../HomePage/Homepage';
import ArcDetails from '../ArcDetails/ArcDetails';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arcs/:arcName" element={<ArcDetails />} />
      </Routes>
    </div>
  );
}

export default App;

