import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './pages/home/Home';
import Tier from './pages/tier/Tier';
import Rank from './pages/rank/Rank';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route exact path="/tiers/:tierId" element={<Tier/>} />
      <Route exact path="/rank/" element={<Rank/>} />              
      <Route exact path="/rank/:tierId" element={<Rank/>} />       
    </Routes>
    </Router>
  </React.StrictMode>);

reportWebVitals(sendToVercelAnalytics);
