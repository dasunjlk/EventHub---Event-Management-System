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
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Tickets</h1>
          <p className="text-gray-500 mb-8">Secure your spot for this amazing event</p>
          
          <div className="bg-blue-50/50 rounded-lg p-6 mb-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{event.title}</h2>
            <div className="text-gray-600 space-y-3">
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4">
                <span className="font-semibold w-24 text-gray-800">Date & Time:</span> 
                <span>{eventDate}{eventTime}</span>
              </p>
              <p className="flex items-start md:items-center flex-col md:flex-row gap-1 md:gap-4">
                <span className="font-semibold w-24 text-gray-800">Location:</span> 
                <span>{event.location}</span>
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Select Tickets</h3>
            <TicketQuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>

          <BookingSummary price={event.price} quantity={quantity} />

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-end mt-8 border-t border-gray-100">
            <button
              onClick={handleCancel}
              disabled={isBooking}
              className="px-6 py-3 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition disabled:opacity-50 border border-transparent"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmBooking}
              disabled={isBooking}
              className="px-8 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg disabled:opacity-75 flex items-center justify-center min-w-[200px]"
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
