import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketQuantitySelector from '../components/TicketQuantitySelector';
import BookingSummary from '../components/BookingSummary';
import Toast from '../components/Toast';
import { getUserBookings } from '../services/bookingService';
import { eventAPI } from '../services/api';

const BookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [userBooking, setUserBooking] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await eventAPI.getEventById(eventId);
        setEvent(data);

        const token = localStorage.getItem('token');
        if (token) {
          const bookings = await getUserBookings();
          const existing = bookings.find((b) => (b.event_id?._id || b.event_id) === eventId && b.status === 'active');
          setUserBooking(existing);
        }
      } catch (err) {
        if (err.response?.status === 404) {
          navigate('/events');
        } else {
          setError('Failed to load events');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId, navigate]);

  if (loading) {
    return <div className="min-h-screen py-20 text-center text-gray-400">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen py-20 text-center">
        <p className="text-gray-500">Event not found</p>
      </div>
    );
  }

  const eventDate = new Date(event.date).toLocaleDateString();
  const eventTime = event.time ? ` at ${event.time}` : '';

  const handleConfirmBooking = async () => {
    if (quantity > event.seats) {
      setToast({ message: `Only ${event.seats} tickets available.`, type: 'error' });
      return;
    }

    setIsBooking(true);
    setTimeout(() => {
      const paymentState = userBooking
        ? {
            event,
            quantity,
            isUpdate: true,
            bookingId: userBooking._id,
            targetQuantity: Number(userBooking.ticket_quantity) + Number(quantity),
          }
        : {
            event,
            quantity,
          };

      navigate('/payment', { 
        state: paymentState
      });
      setIsBooking(false);
    }, 800);
  };

  const handleBack = () => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-[calc(100vh-140px)]">
      <div className="glass-panel overflow-hidden border-white/20 shadow-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-md mb-2">
            {userBooking ? 'Book More Tickets' : 'Book Tickets'}
          </h1>
          <p className="text-gray-300 font-medium mb-8">
            {userBooking
              ? `You already have ${userBooking.ticket_quantity} ticket(s). Choose how many more you'd like to add.`
              : 'Secure your spot for this amazing event'}
          </p>
          
          <div className="glass-panel p-6 mb-8 shadow-inner bg-white/10 border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">{event.title}</h2>
            <div className="text-gray-200 space-y-3">
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4 font-medium">
                <span className="font-semibold w-24 text-white drop-shadow-sm">Date & Time:</span> 
                <span>{eventDate}{eventTime}</span>
              </p>
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4 font-medium">
                <span className="font-semibold w-24 text-white drop-shadow-sm">Location:</span> 
                <span>{event.location}</span>
              </p>
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4 font-medium">
                <span className="font-semibold w-24 text-white drop-shadow-sm">Available:</span> 
                <span className={event.seats < 10 ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>
                  {event.seats} tickets left
                </span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 drop-shadow-sm">
              {userBooking ? 'Additional Tickets' : 'Select Tickets'}
            </h3>
            <TicketQuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          <BookingSummary price={event.price} quantity={quantity} />

          {userBooking && (
            <div className="glass-panel p-4 mb-6 bg-primary-500/5 border-primary-500/20 text-sm text-gray-200">
              Your existing booking stays active. This checkout will add more tickets to the same reservation.
              Manage cancellations from My Bookings in the dashboard.
            </div>
          )}

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-end mt-8 border-t border-white/20">
            <button
              onClick={handleBack}
              disabled={isBooking}
              className="glass-btn px-6 py-3 min-w-[120px]"
            >
              Back
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isBooking}
              className="glass-btn px-8 py-3 min-w-[200px] shadow-lg"
            >
              {isBooking ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : userBooking ? 'Continue to Payment' : 'Confirm Booking'}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default BookingPage;
