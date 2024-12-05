import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import ListAllAds from '../src/components/Advertiser/ListAllAds'
import BodyShopDashboard from "./pages/bodyShop/BodyShopDashboard";
import PublisherDashboard from './pages/Publisher/PublisherDashboard';
import AdOpportunities from './components/Publisher/AdOpportunities';
import UpdateAdStatus from './components/Publisher/UpdateAdStatus';
import PaymentDetails from './components/Publisher/PaymentDetails';
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/manage-ads" element={<ManageAds />} />
        <Route path="/admin/manage-publishers" element={<ManagePublishers />} />
        <Route path="/admin/manage-bodyshops" element={<ManageBodyShops />} />
        <Route path="/admin/assign-tasks" element={<AssignTasks />} />
        <Route path="/ads" element={<ListAllAds />} />

        <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
        <Route path="/publisher/ad-opportunities" element={<AdOpportunities />} />
        <Route path="/publisher/update-ad-status" element={<UpdateAdStatus />} />
        <Route path="/publisher/payment-details" element={<PaymentDetails />} />
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
