import React from 'react';

const BookingSummary = ({ price, quantity }) => {
  const total = price * quantity;
  
  return (
    <div className="glass-card p-6 my-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-300">Booking Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-400">
          <span>Ticket Price</span>
          <span>Rs {price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Quantity</span>
          <span>x {quantity}</span>
        </div>
      </div>
      <div className="flex justify-between border-t border-white/10 mt-4 pt-4">
        <span className="text-xl font-bold text-white">Total Price</span>
        <span className="text-xl font-bold text-primary-400">Rs {total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
