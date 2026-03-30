import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TicketQuantitySelector from '../components/TicketQuantitySelector';
import BookingSummary from '../components/BookingSummary';
import { createBooking } from '../services/bookingService';
import { eventAPI } from '../services/api';

const BookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await eventAPI.getEventById(eventId);
        setEvent(data);
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

    fetchEvent();
  }, [eventId, navigate]);

  if (loading) {
    return <div className="min-h-screen py-20 text-center">Loading...</div>;
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
    setIsBooking(true);
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      const validUserId = user ? (user._id || user.id) : "000000000000000000000000";

      const bookingData = {
        user_id: validUserId,
        event_id: event._id || event.id,
        ticket_quantity: quantity
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
      <div className="glass-panel overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white drop-shadow-md mb-2">Book Tickets</h1>
          <p className="text-gray-300 font-medium mb-8">Secure your spot for this amazing event</p>
          
          <div className="glass-panel p-6 mb-8 shadow-inner bg-white/10">
            <h2 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">{event.title}</h2>
            <div className="text-gray-200 space-y-3">
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4">
                <span className="font-semibold w-24 text-white drop-shadow-sm">Date & Time:</span> 
                <span>{eventDate}{eventTime}</span>
              </p>
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4">
                <span className="font-semibold w-24 text-white drop-shadow-sm">Location:</span> 
                <span>{event.location}</span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 drop-shadow-sm">Select Tickets</h3>
            <TicketQuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          <BookingSummary price={event.price} quantity={quantity} />

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-end mt-8 border-t border-white/20">
            <button
              onClick={handleCancel}
              disabled={isBooking}
              className="glass-btn px-6 py-3 min-w-[120px]"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isBooking}
              className="glass-btn px-8 py-3 min-w-[200px]"
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
