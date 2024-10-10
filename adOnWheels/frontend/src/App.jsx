import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LandingPage from "./pages/landingpage/LandingPage";
import Navbarr from './pages/navbar/Navbarr';
import Login from './pages/login/Login';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from "./pages/home/home";
const App = () => {
  return (
    <Router>
      <Navbarr />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </Router>
  );
};
export default App;
