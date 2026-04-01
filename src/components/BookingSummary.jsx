import React from 'react';

const BookingSummary = ({ price, quantity }) => {
  const total = price * quantity;
  
  return (
    <div className="glass-panel p-6 my-6">
      <h3 className="text-lg font-bold mb-4 text-white drop-shadow-sm">Booking Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-200">
          <span>Ticket Price</span>
          <span className="font-medium">Rs {price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-200">
          <span>Quantity</span>
          <span className="font-medium">x {quantity}</span>
        </div>
      </div>
      <div className="flex justify-between border-t border-white/20 mt-4 pt-4">
        <span className="text-xl font-bold text-white">Total Price</span>
        <span className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Rs {total.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
