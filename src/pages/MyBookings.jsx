import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserBookings } from '../services/bookingService';

const statusColors = {
    confirmed: 'bg-green-900/50 text-green-300 border border-green-800',
    pending: 'bg-yellow-900/50 text-yellow-300 border border-yellow-800',
    cancelled: 'bg-red-900/50 text-red-300 border border-red-800',
}

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getUserBookings();
                setBookings(data);
            } catch (err) {
                setError(err.message || 'Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400 text-lg animate-pulse font-medium">Loading your bookings...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4 text-center">
                <div className="w-20 h-20 bg-red-900/20 border border-red-800/30 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-2xl shadow-red-900/20">
                    ⚠️
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Something went wrong</h3>
                <p className="text-gray-400 mb-8 max-w-md">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="btn-primary shadow-lg shadow-primary-500/20"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-700/40 text-primary-300 text-sm font-medium mb-5">
                        Reservations
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                        My Bookings
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Access all your upcoming event passes and past experiences in one place.
                    </p>
                </header>

                {bookings.length === 0 ? (
                    <div className="card p-16 text-center border-dashed border-2 border-gray-800/50 bg-gray-900/20">
                        <div className="w-24 h-24 bg-gray-800/50 rounded-3xl flex items-center justify-center text-5xl mb-8 mx-auto shadow-inner">
                            🎟️
                        </div>
                        <h3 className="text-2xl font-black text-white mb-3">No bookings found</h3>
                        <p className="text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
                            Your itinerary is currently empty. Explore the latest events and start making memories!
                        </p>
                        <Link to="/events" className="btn-primary px-8 py-3 rounded-xl shadow-xl shadow-primary-500/20 transition-all hover:-translate-y-1">
                            Explore Events
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="card group overflow-hidden border border-gray-800/50 hover:border-primary-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/5">
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={booking.event_id?.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80'}
                                        alt={booking.event_id?.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60" />
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg ${statusColors[booking.status] || 'bg-gray-800/80 text-gray-300 border-gray-700'}`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <h3 className="text-xl font-bold text-white mb-4 line-clamp-1 group-hover:text-primary-300 transition-colors">
                                        {booking.event_id?.title || 'Event Unavailable'}
                                    </h3>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex items-center text-gray-400 text-sm font-medium gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            {booking.event_id?.date ? new Date(booking.event_id.date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            }) : 'Date TBD'}
                                        </div>
                                        <div className="flex items-center text-gray-400 text-sm font-medium gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            {booking.event_id?.location || 'Location TBD'}
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/30 rounded-2xl p-5 mb-8 border border-gray-800/50 backdrop-blur-sm">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5">Tickets</p>
                                                <p className="text-white font-bold text-sm">
                                                    {booking.ticket_quantity} × LKR {((booking.total_price || 0) / (booking.ticket_quantity || 1)).toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1.5">Total Paid</p>
                                                <p className="text-primary-400 font-black text-lg">
                                                    LKR {(booking.total_price || 0).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <Link
                                            to={`/events/${booking.event_id?._id}`}
                                            className="btn-outline flex-1 py-3 text-sm font-bold rounded-xl hover:bg-primary-500 hover:text-white transition-all transform active:scale-95"
                                        >
                                            View Details
                                        </Link>
                                    </div>

                                    <p className="mt-6 text-center text-[9px] text-gray-600 uppercase tracking-[0.2em] font-black">
                                        Booked on {new Date(booking.booking_date).toLocaleDateString()} • ID: {booking._id.slice(-6).toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
