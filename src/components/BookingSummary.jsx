import React from 'react';

const BookingSummary = ({ price, quantity }) => {
  const total = price * quantity;
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg my-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Booking Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Ticket Price</span>
          <span>Rs {price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Quantity</span>
          <span>x {quantity}</span>
        </div>
      </div>
      <div className="flex justify-between border-t border-gray-200 mt-4 pt-4">
        <span className="text-xl font-bold text-gray-800">Total Price</span>
        <span className="text-xl font-bold text-blue-600">Rs {total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
