import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/layout/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WebFont from 'webfontloader';



function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka' ],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
