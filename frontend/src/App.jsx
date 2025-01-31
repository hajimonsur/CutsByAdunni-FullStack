import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Router } from "react-router-dom";
import { isTokenExpired } from "./components/AuthUtility";
import NavComp from "./components/Header";
import Splash from "./components/splash/Splash";
import HomePage from "./components/home/HomePage";
import ContactPage from "./components/contact/Contact";
import OrderPage from "./components/order/Order";
import PortfolioPage from "./components/portfolio/Portfolio";
import Footer from "./components/Footer";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import UpdatePortfolio from "./components/portfolio/UpdatePortfolio";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component
import PageNotFound from "./components/error/PageNotFound";
import SingleOrder from "./components/order/SingleOrder";
import AdminOrder from "./components/order/AdminOrder";
import Profile from "./components/profile/Profile";
import AllUsers from "./components/profile/AllUsers";
import UploadTestimony from "./components/testimony/UploadTestimony";
import AdminTestimony from "./components/testimony/AdminTestimony";
import ProjectDetailPage from "./components/portfolio/ProjectDetailPage";
import ResetPassword from "./components/authentication/ResetPassword";
import EditPortfolioPage from "./components/portfolio/EditPortfolioPage";
import ReviewPopup from "./components/testimony/ReviewPopup";
// import VirtualTryOn from "./components/VirtualTryon/VirtualTryon";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Display splash screen for 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    // Periodically check if the token is expired
    const checkToken = () => {
      if (token && isTokenExpired(token)) {
        // Redirect to login if token is expired
        navigate("/login");
      }
    };

    // Run check immediately
    checkToken();

    // Optionally, set an interval to keep checking (e.g., every 1 minute)
    const interval = setInterval(checkToken, 60000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [navigate]);

  return (
    <div>
      {showSplash ? (
        <Splash />
      ) : (
        <div>
          <NavComp />

          <ReviewPopup />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/update" element={<UpdatePortfolio />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/order/:id" element={<SingleOrder />} />
            <Route path="/adminOrder" element={<AdminOrder />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/testimony" element={<UploadTestimony />} />
            <Route path="/admintestimony/" element={<AdminTestimony />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/editPortfolio/:id" element={<EditPortfolioPage />} />
            {/* <Route path="/tryon" element={<VirtualTryOn />} /> */}

            {/* ProtectedRoute for the /admin path */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard /> {/* Protected component */}
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
