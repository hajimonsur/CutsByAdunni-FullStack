import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('role');
    

  if (!isAdmin || isAdmin !== 'admin') {
    return <Navigate to="*" />; // Redirect to pagenotfound if not authenticated
  }

  return children; // Render protected component if authenticated
};

export default ProtectedRoute;
