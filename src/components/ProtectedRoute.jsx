import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait for auth state to finish loading
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Redirect unauthenticated users to /auth
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Allow authenticated users
  return children;
};

export default ProtectedRoute;
