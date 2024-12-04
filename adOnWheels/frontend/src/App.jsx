// app.jsx

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./pages/landingpage/LandingPage";
// import Navbarr from "./pages/navbar/Navbarr";
import Navbarr from "./pages/navbar/Navbarr";
import Login from "./pages/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./pages/home/home";
import Signup from "./pages/signup/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CreateAd from "./pages/AdvertiserPages/CreateAd/CreateAd";
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageAds from './components/Admin/ManageAds';
import ManagePublishers from './components/Admin/ManagePublishers';
import ManageBodyShops from './components/Admin/ManageBodyShops';
import AssignTasks from './components/Admin/AssignTasks';

import BodyShopDashboard from "./pages/bodyShop/BodyShopDashboard"; // Import the BodyShopDashboard component
import { loadToken } from "./redux/slices/authSlice";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadToken()); // Load token from localStorage when app starts
  }, [dispatch]);

  return (
    <Router>
      {/* <Navbarr /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateAd />} />
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-ads" element={<ManageAds />} />
        <Route path="/admin/manage-publishers" element={<ManagePublishers />} />
        <Route path="/admin/manage-bodyshops" element={<ManageBodyShops />} />
        <Route path="/admin/assign-tasks" element={<AssignTasks />} />
        <Route
          path="/bodyshop-dashboard"
          element={<BodyShopDashboard />}
        />{" "}
        {/* Add the route */}
      </Routes>
    </Router>
  );
};

export default App;
