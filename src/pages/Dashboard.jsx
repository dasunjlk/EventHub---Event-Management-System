import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'

const mockBookings = [
    {
        id: 'BK-1001',
        eventId: 1,
        eventTitle: 'Colombo Music Festival 2026',
        category: 'Music',
        eventDate: '2026-04-18',
        location: 'Colombo',
        image:
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
        ticketQuantity: 2,
        totalPrice: 5000,
        bookingDate: '2026-03-20',
        status: 'Confirmed',
    },
    {
        id: 'BK-1002',
        eventId: 2,
        eventTitle: 'Sri Lanka Tech Summit',
        category: 'Tech',
        eventDate: '2026-04-05',
        location: 'Kandy',
        image:
            'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        ticketQuantity: 1,
        totalPrice: 3500,
        bookingDate: '2026-03-18',
        status: 'Pending',
    },
    {
        id: 'BK-1003',
        eventId: 3,
        eventTitle: 'Creative Art Expo',
        category: 'Art',
        eventDate: '2026-02-15',
        location: 'Galle',
        image:
            'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
        ticketQuantity: 3,
        totalPrice: 6000,
        bookingDate: '2026-02-01',
        status: 'Confirmed',
    },
    {
        id: 'BK-1004',
        eventId: 4,
        eventTitle: 'Startup Workshop Bootcamp',
        category: 'Workshop',
        eventDate: '2026-01-28',
        location: 'Negombo',
        image:
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
        ticketQuantity: 1,
        totalPrice: 2000,
        bookingDate: '2026-01-10',
        status: 'Cancelled',
    },
]

const statusColors = {
    Confirmed: 'bg-green-900/50 text-green-300 border border-green-800',
    Pending: 'bg-yellow-900/50 text-yellow-300 border border-yellow-800',
    Cancelled: 'bg-red-900/50 text-red-300 border border-red-800',
}

export default function Dashboard() {
    const [authError, setAuthError] = useState('')
    const today = new Date()

    const handleManageEventsClick = (e) => {
        if (!localStorage.getItem('token')) {
            e.preventDefault()
            setAuthError('Please login to manage events')
            setTimeout(() => setAuthError(''), 3000)
        }
    }

    const upcomingBookings = mockBookings.filter(
        (booking) => new Date(`${booking.eventDate}T00:00:00`) >= new Date(today.toDateString())
    )

    const pastBookings = mockBookings.filter(
        (booking) => new Date(`${booking.eventDate}T00:00:00`) < new Date(today.toDateString())
    )

    const totalSpent = mockBookings
        .filter((booking) => booking.status !== 'Cancelled')
        .reduce((sum, booking) => sum + booking.totalPrice, 0)

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <section className="mb-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-900/40 border border-primary-700/40 text-primary-300 text-sm font-medium mb-5">
                        Dashboard Overview
                    </span>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
                                My Dashboard
                            </h1>
                            <p className="text-gray-400 text-lg max-w-2xl">
                                View your upcoming events, booking activity, and booking history in one place.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link to="/events" className="btn-primary whitespace-nowrap">
                                Browse Events
                            </Link>
                            <div className="relative inline-flex flex-col items-center">
                                <Link 
                                    to="/manage-events" 
                                    onClick={handleManageEventsClick}
                                    className="btn-outline whitespace-nowrap shadow-lg hover:shadow-primary-500/20 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Manage Events
                                </Link>
                                {authError && (
                                    <div className="absolute top-full mt-2 px-3 py-1.5 bg-red-900/90 border border-red-800 text-red-200 text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap animate-slide-up z-20">
                                        {authError}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                    <div className="card p-6">
                        <p className="text-sm font-semibold text-gray-400 mb-3">Total Bookings</p>
                        <h2 className="text-3xl font-black text-white">{mockBookings.length}</h2>
                        <p className="text-sm text-gray-500 mt-2">All booking records</p>
                    </div>

                    <div className="card p-6">
                        <p className="text-sm font-semibold text-gray-400 mb-3">Upcoming Events</p>
                        <h2 className="text-3xl font-black text-white">{upcomingBookings.length}</h2>
                        <p className="text-sm text-gray-500 mt-2">Future event bookings</p>
                    </div>

                    <div className="card p-6">
                        <p className="text-sm font-semibold text-gray-400 mb-3">Past Events</p>
                        <h2 className="text-3xl font-black text-white">{pastBookings.length}</h2>
                        <p className="text-sm text-gray-500 mt-2">Completed events</p>
                    </div>

                    <div className="card p-6">
                        <p className="text-sm font-semibold text-gray-400 mb-3">Total Spent</p>
                        <h2 className="text-3xl font-black text-white">LKR {totalSpent.toLocaleString()}</h2>
                        <p className="text-sm text-gray-500 mt-2">Excluding cancelled bookings</p>
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="mb-10">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Upcoming Events</h2>
                            <p className="text-gray-400 text-sm">Reusable event cards for your next bookings</p>
                        </div>
                        <Link to="/events" className="text-primary-400 hover:text-primary-300 text-sm font-semibold">
                            View all events
                        </Link>
                    </div>

                    {upcomingBookings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {upcomingBookings.map((booking) => (
                                <EventCard
                                    key={booking.id}
                                    id={booking.eventId}
                                    title={booking.eventTitle}
                                    date={booking.eventDate}
                                    location={booking.location}
                                    price={booking.totalPrice}
                                    image={booking.image}
                                    category={booking.category}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="card p-10 text-center">
                            <div className="text-5xl mb-4">📅</div>
                            <h3 className="text-xl font-bold text-white mb-2">No upcoming events</h3>
                            <p className="text-gray-400 mb-6">You have not booked any future events yet.</p>
                            <Link to="/events" className="btn-primary">
                                Explore Events
                            </Link>
                        </div>
                    )}
                </section>

                {/* Booking History */}
                <section className="card p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Booking History</h2>
                            <p className="text-gray-400 text-sm">Your current and past bookings</p>
                        </div>
                        <span className="text-gray-500 text-sm">{mockBookings.length} total records</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left">
                            <thead>
                                <tr className="border-b border-gray-800 text-gray-400 text-sm">
                                    <th className="py-4 pr-4 font-semibold">Booking ID</th>
                                    <th className="py-4 pr-4 font-semibold">Event</th>
                                    <th className="py-4 pr-4 font-semibold">Date</th>
                                    <th className="py-4 pr-4 font-semibold">Tickets</th>
                                    <th className="py-4 pr-4 font-semibold">Amount</th>
                                    <th className="py-4 pr-4 font-semibold">Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {mockBookings.map((booking) => {
                                    const statusClass =
                                        statusColors[booking.status] ||
                                        'bg-gray-800 text-gray-300 border border-gray-700'

                                    return (
                                        <tr key={booking.id} className="border-b border-gray-900 last:border-b-0">
                                            <td className="py-4 pr-4 text-sm text-gray-300 font-medium">{booking.id}</td>

                                            <td className="py-4 pr-4">
                                                <div>
                                                    <p className="text-white font-semibold">{booking.eventTitle}</p>
                                                    <p className="text-gray-500 text-sm">Booked on {booking.bookingDate}</p>
                                                </div>
                                            </td>

                                            <td className="py-4 pr-4 text-sm text-gray-400">{booking.eventDate}</td>

                                            <td className="py-4 pr-4 text-sm text-gray-300">{booking.ticketQuantity}</td>

                                            <td className="py-4 pr-4 text-sm text-gray-300">
                                                LKR {booking.totalPrice.toLocaleString()}
                                            </td>

                                            <td className="py-4 pr-4">
                                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}
