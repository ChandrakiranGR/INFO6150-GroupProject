import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/landingpage/LandingPage";
import Navbarr from './pages/navbar/Navbarr';
import Login from './pages/login/Login';
import Footer from './footer';
import HowItWorks from "./pages/howitworks/Howitworks";
import Testimonials from "./pages/testimonials/Testimonials";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
const App = () => {
  return (
    <Router>
      <Navbarr />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      </Routes>
      <HowItWorks />
      <Testimonials/>
      <Footer/>
    </Router>
  );
};
export default App;
