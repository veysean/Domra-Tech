import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const user = auth?.user;

  if (!user) {
    // Not logged in
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Logged in but wrong role
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
