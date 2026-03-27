import React from 'react';

const TicketQuantitySelector = ({ quantity, setQuantity }) => {
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center space-x-4 my-4">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 transition font-bold text-xl"
        type="button"
      >
        -
      </button>
      <span className="text-xl font-bold text-gray-500 w-8 text-center">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition font-bold text-xl"
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default TicketQuantitySelector;
