import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/Home';
import Tier from './pages/tier/Tier';
import Test from './pages/test/Test';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route exact path="/tiers/:tierId" element={<Tier/>} /> 
      <Route exact path="/test" element={<Test/>} /> 
    </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
