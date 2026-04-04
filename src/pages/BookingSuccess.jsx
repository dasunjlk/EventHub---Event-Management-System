import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    return <Navigate to="/events" replace />;
  }

  const {
    eventTitle,
    ticket_quantity: ticketQuantity,
    total_price: totalPrice,
    bookingId,
    booking_date: bookingDate
  } = bookingDetails;

  const formattedDate = new Date(bookingDate).toLocaleString();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 min-h-[calc(100vh-200px)] flex flex-col justify-center">
      <div className="glass-panel border-white/20 text-center p-8 md:p-12">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-white drop-shadow-md mb-3">Booking Confirmed!</h1>
        <p className="text-gray-200 font-medium mb-8 text-lg">Thank you for your purchase. Your tickets are ready.</p>
        
        <div className="glass-panel p-6 mb-8 text-left max-w-md mx-auto bg-white/10 shadow-inner">
          <h3 className="font-bold text-xl text-white mb-4 pb-4 border-b border-white/20 drop-shadow-sm">
            {eventTitle}
          </h3>
          
          <div className="space-y-4 text-gray-200 text-base">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Booking ID</span>
              <span className="font-medium text-white bg-white/20 px-2 py-1 rounded text-sm shadow-inner border border-white/10">{bookingId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Date</span>
              <span className="font-medium text-white">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">Quantity</span>
              <span className="font-medium inline-flex items-center justify-center bg-white/20 text-white shadow-inner border border-white/20 w-8 h-8 rounded-full">{ticketQuantity}</span>
            </div>
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/20">
              <span className="font-semibold text-gray-300 font-medium">Total Paid</span>
              <span className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] text-xl">Rs {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() => navigate('/')}
            className="glass-btn px-6 py-3 min-w-[160px]"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/events')}
            className="glass-btn px-6 py-3 min-w-[160px]"
          >
            Browse More Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
