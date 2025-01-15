import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Display splash screen for 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div>
      {showSplash ? <Splash /> :   <div>
      <NavComp />
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
        <Route path="/adminOrder" element={<AdminOrder/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/users" element={<AllUsers/>}/>
        <Route path="/testimony" element={<UploadTestimony/>}/>
        <Route path="/admintestimony/" element={<AdminTestimony/>}/>
        
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
      </div>}
    
    
    </div>
  );
};

export default App;
