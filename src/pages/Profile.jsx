import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');
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
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-xl animate-pulse">Loading profile...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="glass-panel p-6 w-full max-w-2xl text-red-200 bg-red-500/10 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] text-center">
                    {error}
                </div>
            </div>
        );
    }

    // Mock stats for visual enrichment (since API doesn't provide them yet)
    const stats = [
        { label: 'Attended', value: 12 },
        { label: 'Organized', value: 3 },
        { label: 'Following', value: 45 }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Profile Section */}
                <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl border-white/20">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl">
                            <img 
                                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} 
                                alt="Avatar" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 glass-panel bg-white/20 !p-2 !rounded-xl shadow-lg hover:bg-white/30 transition-all text-white border-white/30">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-black text-white drop-shadow-md">{user?.name}</h1>
                        <p className="text-gray-400 mt-1 font-medium italic">{user?.role?.toUpperCase() || 'MEMBER'}</p>
                        <p className="text-gray-400 mt-1 font-medium">{user?.email}</p>
                        <p className="text-gray-200 mt-4 leading-relaxed max-w-xl">
                            Member of the EventHub community. Passionate about participating in and organizing memorable experiences.
                        </p>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                            <button className="glass-btn text-sm py-2 px-6">Edit Profile</button>
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user');
                                    navigate('/login');
                                }}
                                className="glass-btn text-sm py-2 px-6 border-red-500/30 text-red-200 bg-red-500/10 hover:bg-red-500/20"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="glass-panel p-6 text-center shadow-xl border-white/10">
                            <p className="text-gray-400 font-semibold text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-panel p-8 shadow-2xl border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">Account Details</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-white/10 text-gray-100">
                                <span className="text-gray-400 font-semibold">User ID</span>
                                <span className="text-sm font-mono opacity-80">{user?._id || user?.id}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10 text-gray-100">
                                <span className="text-gray-400 font-semibold">Email Verified</span>
                                <span className="glass-badge border-green-500/30 text-green-200 bg-green-500/10">Yes</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 shadow-2xl border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">Quick Actions</h2>
                        <div className="flex flex-col gap-3">
                            <Link to="/dashboard" className="glass-btn text-sm text-center">Go to Dashboard</Link>
                            <Link to="/manage-events" className="glass-btn text-sm text-center">Manage My Events</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
