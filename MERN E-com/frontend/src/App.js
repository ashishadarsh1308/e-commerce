import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WebFont from 'webfontloader';
import ProductDetails from './components/Product/ProductDetails.jsx';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.jsx';
import Products from './components/Product/Products';
import Search from './components/Product/Search.jsx';
import LoginSignup from './components/User/LoginSignup';
import Profile from './components/User/Profile.jsx';
import UpdateProfile from './components/User/UpdateProfile.jsx';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions.jsx';
import { useSelector } from 'react-redux';


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes> {/* Wrap routes with <Routes> */}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route
          exact
          path="/account"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/me/update"
          element={isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />}
        />
        <Route exact path='/login' element={<LoginSignup />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
