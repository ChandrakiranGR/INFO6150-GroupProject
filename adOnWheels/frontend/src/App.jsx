import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./pages/home/home";
import Signup from "./pages/signup/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CreateAd from "./pages/AdvertiserPages/CreateAd/CreateAd";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageAds from "./components/Admin/ManageAds";
import ManagePublishers from "./components/Admin/ManagePublishers";
import ManageBodyShops from "./components/Admin/ManageBodyShops";
import AssignTasks from "./components/Admin/AssignTasks";
import ListAllAds from "../src/components/Advertiser/ListAllAds";
// import AdvertiserDashboard from './pages/Advertiser/AdvertiserDashboard';
// import ManageAds from './components/Advertiser/ManageAds';
// import ViewProposals from './components/Advertiser/ViewProposals';

import BodyShopDashboard from "./pages/bodyShop/BodyShopDashboard"; // Import the BodyShopDashboard component
import { loadToken } from "./redux/slices/authSlice";
import AdOpportunities from "./components/Publisher/AdOpportunities";
import Navbarr from "./pages/navbar/Navbarr";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadToken()); // Load token from localStorage when app starts
  }, [dispatch]);

  return (
    <Router>
      <Navbarr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<CreateAd />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-ads" element={<ManageAds />} />
        <Route path="/admin/manage-publishers" element={<ManagePublishers />} />
        <Route path="/admin/manage-bodyshops" element={<ManageBodyShops />} />
        <Route path="/admin/assign-tasks" element={<AssignTasks />} />
        <Route path="/ads" element={<ListAllAds />} />
        <Route path="/publish" element={<AdOpportunities />} />
        {/* <Route path="/advertiser/dashboard" element={<AdvertiserDashboard />} />
        <Route path="/advertiser/manage-ads" element={<ManageAds />} />
        <Route path="/advertiser/view-proposals" element={<ViewProposals />} /> */}
        <Route path="/bodyshop-dashboard" element={<BodyShopDashboard />} />{" "}
        {/* Add the route */}
      </Routes>
    </Router>
  );
};

export default App;
