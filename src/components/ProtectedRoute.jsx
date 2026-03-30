import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const [isValid, setIsValid] = useState(!!token);
  const [loading, setLoading] = useState(!!token);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          await authAPI.getProfile();
          setIsValid(true);
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsValid(false);
        } finally {
          setLoading(false);
        }
      }
    };
    checkToken();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl animate-pulse">Verifying session...</div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
