import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import EventCard from '../components/EventCard'
import { getUserBookings } from '../services/bookingService'

const statusColors = {
  Confirmed: 'glass-badge border-green-500/30 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.2)]',
  Pending: 'glass-badge border-yellow-500/30 text-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.2)]',
  Cancelled: 'glass-badge border-red-500/30 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.2)]',
}

const getStatusLabel = (status) => {
  if (!status) return 'Confirmed'
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
}

const getSafeDate = (dateValue) => {
  if (!dateValue) return null
  const parsed = new Date(dateValue)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export default function Dashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [authError, setAuthError] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) return

    try {
      const parsed = JSON.parse(userData)
      setUserRole(parsed.role || '')
    } catch {
      setUserRole('')
    }
  }, [])

  const loadBookings = async () => {
    setLoading(true)
    setError('')

    try {
      const bookingData = await getUserBookings()
      setBookings(Array.isArray(bookingData) ? bookingData : [])
    } catch (fetchError) {
      setError(fetchError.message || 'Failed to load your bookings.')
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBookings()
  }, [])

  const handleManageEventsClick = (e) => {
    if (!localStorage.getItem('token')) {
      e.preventDefault()
      setAuthError('Please login to manage events')
      setTimeout(() => setAuthError(''), 3000)
    }
  }

  const todayStart = useMemo(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])

  const upcomingBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const eventDate = getSafeDate(booking.event_id?.date)
        return eventDate && eventDate >= todayStart
      }),
    [bookings, todayStart]
  )

  const pastBookings = useMemo(
    () =>
      bookings.filter((booking) => {
        const eventDate = getSafeDate(booking.event_id?.date)
        return !eventDate || eventDate < todayStart
      }),
    [bookings, todayStart]
  )

  const totalSpent = useMemo(
    () =>
      bookings.reduce((sum, booking) => {
        const label = getStatusLabel(booking.status)
        if (label === 'Cancelled') return sum
        return sum + (booking.total_price || 0)
      }, 0),
    [bookings]
  )

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((a, b) => {
      const aDate = getSafeDate(a.booking_date || a.createdAt)
      const bDate = getSafeDate(b.booking_date || b.createdAt)
      return (bDate?.getTime() || 0) - (aDate?.getTime() || 0)
    })
  }, [bookings])

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400 text-lg animate-pulse font-medium">Preparing your dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 bg-red-900/20 border border-red-800/30 rounded-2xl flex items-center justify-center text-4xl mb-6">
          !
        </div>
        <h3 className="text-2xl font-black text-white mb-2">Failed to load dashboard</h3>
        <p className="text-gray-400 mb-8 max-w-md">{error}</p>
        <button onClick={loadBookings} className="btn-primary px-8">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-10">
          <span className="glass-badge mb-5 px-4 py-1.5 shadow-sm">Dashboard Overview</span>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">My Dashboard</h1>
              <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                View your upcoming events, booking activity, and booking history in one place.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link to="/events" className="glass-btn whitespace-nowrap shadow-lg">
                Browse Events
              </Link>
              {(userRole === 'organizer' || userRole === 'admin') && (
                <div className="relative inline-flex flex-col items-center">
                  <Link
                    to="/manage-events"
                    onClick={handleManageEventsClick}
                    className="glass-btn whitespace-nowrap shadow-lg border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    Manage Events
                  </Link>
                  {authError && (
                    <div className="absolute top-full mt-2 px-3 py-1.5 glass-panel bg-red-500/10 border-red-500/30 text-red-200 text-xs font-semibold shadow-[0_0_15px_rgba(239,68,68,0.1)] whitespace-nowrap animate-slide-up z-20">
                      {authError}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <div className="glass-panel p-6 shadow-2xl">
            <p className="text-sm font-semibold text-gray-400 mb-3">Total Bookings</p>
            <h2 className="text-3xl font-black text-white">{bookings.length}</h2>
            <p className="text-sm text-gray-500 mt-2">All booking records</p>
          </div>

          <div className="glass-panel p-6 shadow-2xl">
            <p className="text-sm font-semibold text-gray-400 mb-3">Upcoming Events</p>
            <h2 className="text-3xl font-black text-white">{upcomingBookings.length}</h2>
            <p className="text-xs text-gray-500 mt-2 font-medium">Future events</p>
          </div>

          <div className="glass-panel p-6 shadow-2xl">
            <p className="text-sm font-semibold text-gray-400 mb-3">Past Events</p>
            <h2 className="text-3xl font-black text-white">{pastBookings.length}</h2>
            <p className="text-xs text-gray-500 mt-2 font-medium">Completed</p>
          </div>

          <div className="glass-panel p-6 shadow-2xl">
            <p className="text-sm font-semibold text-gray-400 mb-3">Total Spent</p>
            <h2 className="text-3xl font-black text-white">LKR {totalSpent.toLocaleString()}</h2>
            <p className="text-xs text-gray-500 mt-2 font-medium">Active bookings</p>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Upcoming Events</h2>
              <p className="text-gray-400 text-sm">Your next scheduled experiences</p>
            </div>
            <Link to="/my-bookings" className="text-primary-400 hover:text-primary-300 text-sm font-bold flex items-center gap-1 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {upcomingBookings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <EventCard
                  key={booking._id}
                  id={booking.event_id?._id}
                  title={booking.event_id?.title || 'Event Unavailable'}
                  date={booking.event_id?.date}
                  location={booking.event_id?.location}
                  price={booking.event_id?.ticket_price ?? booking.total_price ?? 0}
                  image={booking.event_id?.image || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80'}
                  category={booking.event_id?.category || 'Event'}
                />
              ))}
            </div>
          ) : (
            <div className="glass-panel p-10 text-center shadow-2xl">
              <div className="text-5xl mb-4 drop-shadow-md">[]</div>
              <h3 className="text-xl font-bold text-white mb-2 drop-shadow-sm">No upcoming events</h3>
              <p className="text-gray-300 mb-6">You have not booked any future events yet.</p>
              <Link to="/events" className="glass-btn shadow-lg">
                Explore Events
              </Link>
            </div>
          )}
        </section>

        <section className="glass-panel p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Booking History</h2>
              <p className="text-gray-400 text-sm">Your recent records and receipts</p>
            </div>
            <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
              {bookings.length} Total
            </span>
          </div>

          {sortedBookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead>
                  <tr className="border-b border-white/20 text-gray-300 text-sm">
                    <th className="py-4 pr-4 font-semibold">Booking ID</th>
                    <th className="py-4 pr-4 font-semibold">Event</th>
                    <th className="py-4 pr-4 font-semibold">Date</th>
                    <th className="py-4 pr-4 font-semibold">Tickets</th>
                    <th className="py-4 pr-4 font-semibold">Amount</th>
                    <th className="py-4 pr-4 font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {sortedBookings.map((booking) => {
                    const statusLabel = getStatusLabel(booking.status)
                    const statusClass = statusColors[statusLabel] || 'glass-badge bg-white/5 border-white/10'
                    const eventDate = getSafeDate(booking.event_id?.date)
                    const bookingDate = getSafeDate(booking.booking_date || booking.createdAt)

                    return (
                      <tr key={booking._id} className="border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors">
                        <td className="py-4 pr-4 text-sm text-gray-300 font-medium">{booking.bookingId || booking._id?.slice(-8)}</td>

                        <td className="py-5 pr-6">
                          <div className="flex flex-col">
                            <p className="text-white font-bold leading-tight mb-1">
                              {booking.event_id?.title || booking.eventTitle || 'Unknown Event'}
                            </p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                              Booked on {bookingDate ? bookingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                            </p>
                          </div>
                        </td>

                        <td className="py-5 pr-6">
                          <p className="text-sm text-gray-400 font-medium">
                            {eventDate ? eventDate.toLocaleDateString() : 'TBD'}
                          </p>
                        </td>

                        <td className="py-5 pr-6 text-center">
                          <span className="bg-gray-800/50 py-1 px-3 rounded-md text-xs text-gray-300 font-bold">
                            {booking.ticket_quantity || 0}
                          </span>
                        </td>

                        <td className="py-5 pr-6 text-right">
                          <p className="text-sm text-white font-black">
                            LKR {(booking.total_price || 0).toLocaleString()}
                          </p>
                        </td>

                        <td className="py-5 px-6 text-center">
                          <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${statusClass}`}>
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-500 font-medium">No booking activity found.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
