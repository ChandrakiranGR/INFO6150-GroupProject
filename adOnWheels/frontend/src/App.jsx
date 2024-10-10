import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/landingpage/LandingPage";
import Navbarr from "./pages/navbar/Navbarr";
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './pages/login/Login.css';
import Login from './pages/login/Login'
import React from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
      <Footer/>
      <Navbarr />
      <LandingPage />
    </>
  );

export default App;
