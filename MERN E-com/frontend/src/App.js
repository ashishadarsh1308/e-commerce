import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';

import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.jsx';



function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes> {/* Wrap routes with <Routes> */}
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
