import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'
import './pages/login/Login.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer';

function App() {
  return (
    <div className='app'>

     <Login />
     <Footer/>
</div>
  )

}

export default App
