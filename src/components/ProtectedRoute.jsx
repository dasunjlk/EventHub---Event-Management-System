import { Navigate } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const ProtectedRoute = ({ children, allowedRoles = null, redirectTo = '/dashboard' }) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const [isValid, setIsValid] = useState(!!token);
  const [loading, setLoading] = useState(!!token);
  const [userRole, setUserRole] = useState(() => {
    if (!storedUser) return '';

    try {
      return JSON.parse(storedUser).role || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const response = await authAPI.getProfile();
          setIsValid(true);
          setUserRole(response.data?.role || '');
        } catch {
          setIsValid(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    checkToken();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md">
        <div className="text-white text-xl animate-pulse">Verifying session...</div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
