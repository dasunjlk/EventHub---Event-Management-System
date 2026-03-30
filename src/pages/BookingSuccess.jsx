import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state?.bookingDetails;

  if (!bookingDetails) {
    // Redirect if a user lands here without a valid booking state
    return <Navigate to="/events" replace />;
  }

  const {
    eventTitle,
    ticketQuantity,
    totalPrice,
    bookingId,
    bookingDate
  } = bookingDetails;

  const formattedDate = new Date(bookingDate).toLocaleString();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 min-h-[calc(100vh-200px)] flex flex-col justify-center">
      <div className="glass-panel group text-center p-8 md:p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="relative z-10 w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(74,222,128,0.3)] border border-green-400/50 backdrop-blur-md">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="relative z-10 text-3xl font-bold text-white mb-3">Booking Confirmed!</h1>
        <p className="relative z-10 text-gray-400 mb-8 text-lg">Thank you for your purchase. Your tickets are ready.</p>
        
        <div className="relative z-10 glass-card p-6 mb-8 text-left max-w-md mx-auto">
          <h3 className="font-bold text-xl text-gray-200 mb-4 pb-4 border-b border-white/10">
            {eventTitle}
          </h3>
          
          <div className="space-y-4 text-gray-400 text-base">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Booking ID</span>
              <span className="font-medium text-gray-200 bg-white/10 px-2 py-1 rounded text-sm border border-white/10">{bookingId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Date</span>
              <span className="font-medium text-gray-200">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Quantity</span>
              <span className="font-medium inline-flex items-center justify-center bg-primary-900/40 text-primary-300 border border-primary-500/30 w-8 h-8 rounded-full shadow-sm">{ticketQuantity}</span>
            </div>
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/10">
              <span className="font-semibold text-gray-300">Total Paid</span>
              <span className="font-bold text-green-400 text-xl">Rs {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() => navigate('/')}
            className="btn-outline min-w-[160px]"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/events')}
            className="btn-primary min-w-[160px]"
          >
            Browse More Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
