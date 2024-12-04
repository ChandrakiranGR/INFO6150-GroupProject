import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./pages/landingpage/LandingPage";
// import Navbarr from "./pages/navbar/Navbarr";
import Login from "./pages/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./pages/home/home";
import Signup from "./pages/signup/Signup";
import CreateAd from "./pages/AdvertiserPages/CreateAd/CreateAd";
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageAds from './components/Admin/ManageAds';
import ManagePublishers from './components/Admin/ManagePublishers';
import ManageBodyShops from './components/Admin/ManageBodyShops';
import AssignTasks from './components/Admin/AssignTasks';

const App = () => {
  return (
    <Router>
      {/* <Navbarr /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup></Signup>} />
        <Route path="/create" element={<CreateAd />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-ads" element={<ManageAds />} />
        <Route path="/admin/manage-publishers" element={<ManagePublishers />} />
        <Route path="/admin/manage-bodyshops" element={<ManageBodyShops />} />
        <Route path="/admin/assign-tasks" element={<AssignTasks />} />
      </Routes>
    </Router>
  );
};
export default App;
