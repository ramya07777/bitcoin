import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Coins from './components/Coins';
import News from './components/News';
import Linechart from './components/Linechart';

function App() {
  return (
    <BrowserRouter>
    <Routes>
 <Route path="/" element={<div className='app'><Header /><Coins /></div>} /> 
 <Route path="/new" element={<div className='app__new'><Header /><News /></div>} /> 
 <Route path="/crypto" element={<div className='app__new'><Header /><Linechart /></div>} /> 
     </Routes>
      </BrowserRouter>
  );
}

export default App;
