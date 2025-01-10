import React from 'react'
import { useState, useEffect } from "react";
import NavComp from './components/Header'
import Splash from './components/splash/Splash'
import HomePage from './components/home/HomePage';
import { Routes, Route } from 'react-router-dom';
import ContactPage from './components/contact/Contact';
import OrderPage from './components/order/Order';
import PortfolioPage from './components/portfolio/Portfolio';
import Footer from './components/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import UpdatePortfolio from './components/portfolio/UpdatePortfolio';

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
      {showSplash ? <Splash /> : <NavComp />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/contact" element={<ContactPage />}/>
        <Route path="/portfolio" element={<PortfolioPage />}/>
        <Route path="/admin"element={<AdminDashboard />} />
        <Route path="*" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update" element={<UpdatePortfolio />} />

        
      </Routes>
      <Footer/>
    </div>
  )
}

export default App