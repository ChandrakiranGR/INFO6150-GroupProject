import { useState } from "react";
import LandingPage from "./pages/landingpage/LandingPage";
import Navbarr from "./pages/navbar/Navbarr";
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/login/Login.css';
import React from 'react';

function App() {
  return (
    <>
    <Navbarr />
    <LandingPage />
    <Footer/>
    </>
  );
  }
export default App;
