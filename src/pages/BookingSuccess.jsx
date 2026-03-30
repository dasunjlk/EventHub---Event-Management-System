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
    ticket_quantity: ticketQuantity,
    total_price: totalPrice,
    bookingId,
    booking_date: bookingDate
  } = bookingDetails;

  const formattedDate = new Date(bookingDate).toLocaleString();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 min-h-[calc(100vh-200px)] flex flex-col justify-center">
      <div className="bg-gray-100 rounded-2xl shadow-xl overflow-hidden border border-gray-100 text-center p-8 md:p-12">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Booking Confirmed!</h1>
        <p className="text-gray-500 mb-8 text-lg">Thank you for your purchase. Your tickets are ready.</p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left border border-gray-200 max-w-md mx-auto shadow-sm">
          <h3 className="font-bold text-xl text-gray-800 mb-4 pb-4 border-b border-gray-200">
            {eventTitle}
          </h3>
          
          <div className="space-y-4 text-gray-600 text-base">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-medium text-gray-800 bg-gray-200 px-2 py-1 rounded text-sm">{bookingId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-800">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Quantity</span>
              <span className="font-medium inline-flex items-center justify-center bg-blue-100 text-blue-700 w-8 h-8 rounded-full">{ticketQuantity}</span>
            </div>
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
              <span className="font-semibold text-gray-600">Total Paid</span>
              <span className="font-bold text-green-600 text-xl">Rs {totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition min-w-[160px]"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/events')}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition min-w-[160px]"
          >
            Browse More Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
