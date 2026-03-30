import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import events from '../data/events';
import TicketQuantitySelector from '../components/TicketQuantitySelector';
import BookingSummary from '../components/BookingSummary';
import { createBooking } from '../services/bookingService';

const BookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    // Fetch event data
    const foundEvent = events.find(e => e.id === parseInt(eventId));
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate('/events');
    }
  }, [eventId, navigate]);

  if (!event) return <div className="min-h-screen py-20 text-center">Loading...</div>;

  const handleConfirmBooking = async () => {
    setIsBooking(true);
    try {
      const bookingData = {
        userId: "demoUser",
        eventId: event.id,
        ticketQuantity: quantity,
        totalPrice: event.price * quantity,
        eventTitle: event.title // passed to success page for display
      };
      
      const response = await createBooking(bookingData);
      
      if (response.success) {
        navigate('/booking-success', { 
          state: { 
            bookingDetails: response.booking 
          }
        });
      }
    } catch (error) {
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  const handleCancel = () => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-[calc(100vh-140px)]">
      <div className="glass-panel group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-accent-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="p-8 relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Book Tickets</h1>
          <p className="text-gray-400 mb-8">Secure your spot for this amazing event</p>
          
          <div className="glass-card p-6 mb-8">
            <h2 className="text-2xl font-bold text-primary-300 mb-4">{event.title}</h2>
            <div className="text-gray-300 space-y-3">
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4">
                <span className="font-semibold w-24 text-gray-400">Date & Time:</span> 
                <span>{event.date} at {event.time}</span>
              </p>
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4">
                <span className="font-semibold w-24 text-gray-400">Location:</span> 
                <span>{event.location}</span>
              </p>
            </div>
          </div>

          <div className="mb-8 relative z-10">
            <h3 className="text-lg font-bold text-white mb-4">Select Tickets</h3>
            <TicketQuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          <div className="relative z-10">
            <BookingSummary price={event.price} quantity={quantity} />
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-end mt-8 border-t border-white/10 relative z-10">
            <button
              onClick={handleCancel}
              disabled={isBooking}
              className="btn-outline px-6 py-3 text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isBooking}
              className="btn-primary min-w-[200px] disabled:opacity-75"
            >
              {isBooking ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
