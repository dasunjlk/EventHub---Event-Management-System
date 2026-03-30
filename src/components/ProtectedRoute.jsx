import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Redirect unauthenticated users to the login page
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
