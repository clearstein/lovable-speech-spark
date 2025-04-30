
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const AdminSignupPage = () => {
  // Admin signup has been completed, redirect to login page
  return <Navigate to="/login" replace />;
};

export default AdminSignupPage;
