import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    // Mock user data
    const user = {
        name: 'Kaveesha Ginodh',
        email: 'kaveesha@example.com',
        joinedDate: 'March 2024',
        bio: 'Event enthusiast and tech explorer. Love organizing workshops and musical evenings.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        stats: [
            { label: 'Attended', value: 12 },
            { label: 'Organized', value: 3 },
            { label: 'Following', value: 45 }
        ]
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Profile Section */}
                <div className="glass-panel p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl border-white/20">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl">
                            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-lg hover:bg-white/30 transition-all text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl font-black text-white drop-shadow-md">{user.name}</h1>
                        <p className="text-gray-400 mt-1 font-medium">{user.email}</p>
                        <p className="text-gray-200 mt-4 leading-relaxed max-w-xl">{user.bio}</p>
                        
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                            <button className="glass-btn text-sm py-2 px-6">Edit Profile</button>
                            <button className="glass-btn text-sm py-2 px-6 bg-white/5 border-white/10 hover:border-white/30">Settings</button>
                        </div>
                    </div>
                </div>

                {/* Stats & Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {user.stats.map((stat, i) => (
                        <div key={i} className="glass-panel p-6 text-center shadow-xl border-white/10">
                            <p className="text-gray-400 font-semibold text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Activity / Preferences Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-panel p-8 shadow-2xl border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">Account Information</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">Member Since</span>
                                <span className="text-white font-medium">{user.joinedDate}</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">Account Type</span>
                                <span className="text-white font-medium">Standard User</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/10">
                                <span className="text-gray-400">Location</span>
                                <span className="text-white font-medium">Colombo, Sri Lanka</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-8 shadow-2xl border-white/20">
                        <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-sm">Preferences</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-200">Email Notifications</span>
                                <div className="w-12 h-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full relative">
                                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-200">Dark Mode</span>
                                <div className="w-12 h-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full relative">
                                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-[0_0_8px_white]"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-200">Public Profile</span>
                                <div className="w-12 h-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full relative">
                                    <div className="absolute top-1 left-1 w-4 h-4 bg-gray-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
