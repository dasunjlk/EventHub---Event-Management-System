import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const statusColors = {
  Confirmed: 'border-green-500/30 text-green-200 bg-green-500/10',
  Pending: 'border-yellow-500/30 text-yellow-200 bg-yellow-500/10',
  Cancelled: 'border-red-500/30 text-red-200 bg-red-500/10',
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('http://localhost:5000/api/bookings/user');

      if (!res.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      setCancellingId(id);

      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to cancel booking');
      }

      // Remove the cancelled booking from the UI immediately
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (err) {
      alert(err.message || 'Error occurred while cancelling booking');
    } finally {
      setCancellingId(null);
    }
  };

  // Helper function to safely render dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="glass-badge border-primary-500/30 text-primary-200 bg-primary-500/10 mb-5">
              My Profile
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 drop-shadow-md">
              My Bookings
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              View and manage all your upcoming and past event bookings.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/50"></div>
            </div>
          ) : error ? (
            <div className="glass-panel p-8 bg-red-500/5 border-red-500/20 text-center">
              <p className="text-red-300 text-lg mb-4">{error}</p>
              <button
                onClick={fetchBookings}
                className="glass-btn px-8"
              >
                Try Again
              </button>
            </div>
          ) : bookings.length === 0 ? (
            <div className="glass-panel p-12 text-center flex flex-col items-center justify-center">
              <div className="text-6xl mb-6 filter drop-shadow-lg">🎫</div>
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-sm">You have no bookings yet.</h3>
              <p className="text-gray-300 mb-8 max-w-md">
                Looks like you haven't booked any events. Discover amazing events happening around you and secure your spot!
              </p>
              <Link to="/events" className="glass-btn px-8 py-3">
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking) => {
                const event = booking.event || {};

                // Determine status class based on booking status, default to Confirmed format
                const statusLabel = booking.status
                  ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1)
                  : 'Confirmed';
                const statusClass = statusColors[statusLabel] || statusColors['Confirmed'];

                return (
                  <div key={booking._id} className="glass-panel p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-center relative shadow-2xl border-white/20">
                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                        <h2 className="text-2xl font-bold text-white drop-shadow-sm">
                          {event.title || 'Event Details Unavailable'}
                        </h2>
                        <span className={`glass-badge ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-gray-400 mb-6">
                        {event.date && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg opacity-80">📅</span>
                            <span className="text-gray-200">{formatDate(event.date)}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg opacity-80">📍</span>
                            <span className="text-gray-200">{event.location}</span>
                          </div>
                        )}
                        {event.category && (
                          <div className="glass-badge border-white/10 text-gray-300 bg-white/5">
                            {event.category}
                          </div>
                        )}
                      </div>

                      {/* Booking Meta Information */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Tickets</p>
                          <p className="font-bold text-white text-lg">{booking.ticket_quantity || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Total Paid</p>
                          <p className="font-bold text-white text-lg">
                            <span className="text-xs opacity-60 mr-1">LKR</span>{booking.total_price ? booking.total_price.toLocaleString() : '0'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Booked On</p>
                          <p className="font-bold text-white">
                            {formatDate(booking.booking_date)}
                          </p>
                        </div>
                        <div className="col-span-2 sm:col-span-1 border-l border-white/10 pl-4 hidden sm:block">
                          <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Booking ID</p>
                          <p className="font-mono text-gray-400 text-xs truncate" title={booking._id}>
                            #{booking._id.slice(-8).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions (Cancel button) */}
                    <div className="mt-4 md:mt-0 md:pl-6 md:border-l md:border-white/10 flex flex-col justify-center">
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        disabled={cancellingId === booking._id}
                        className="w-full md:w-auto px-6 py-3 glass-btn border-red-500/40 text-red-200 bg-red-500/10 hover:bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.15)] flex items-center justify-center gap-2"
                      >
                        {cancellingId === booking._id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Cancelling...
                          </>
                        ) : 'Cancel Booking'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
