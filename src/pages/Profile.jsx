import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile');
        // If unauthorized (e.g. token expired/missing), redirect to login
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-white text-xl animate-pulse">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="p-4 w-full max-w-2xl text-red-200 bg-red-900/50 border border-red-800 rounded-xl shadow-2xl text-center">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-2xl p-8 sm:p-10 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl">
        <div className="mb-8 border-b border-gray-800 pb-6 flex items-center justify-between">
          <h2 className="text-3xl sm:text-4xl font-black text-white">My Profile</h2>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/login');
            }}
            className="px-4 py-2 text-sm font-semibold text-red-400 bg-red-900/20 rounded-lg hover:bg-red-900/50 border border-red-900 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="p-5 bg-gray-800/40 rounded-xl border border-gray-700/50">
            <p className="text-xs tracking-wider text-gray-500 uppercase font-bold mb-1">Full Name</p>
            <p className="text-xl text-white font-medium">{user?.name}</p>
          </div>
          
          <div className="p-5 bg-gray-800/40 rounded-xl border border-gray-700/50">
            <p className="text-xs tracking-wider text-gray-500 uppercase font-bold mb-1">Email Address</p>
            <p className="text-xl text-white font-medium">{user?.email}</p>
          </div>
          
          <div className="p-5 bg-gray-800/40 rounded-xl border border-gray-700/50">
            <p className="text-xs tracking-wider text-gray-500 uppercase font-bold mb-1">Account Role</p>
            <span className="inline-block mt-1 px-4 py-1.5 text-sm font-bold text-primary-300 bg-primary-900/40 rounded-full border border-primary-700/50">
              {user?.role?.toUpperCase() || 'USER'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
