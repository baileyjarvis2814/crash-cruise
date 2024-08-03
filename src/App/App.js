import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from '../HomePage/Homepage';
import ArcDetails from '../ArcDetails/ArcDetails';
import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/arcs/:arcName" element={<ArcDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

