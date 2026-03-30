import React from 'react';

const TicketQuantitySelector = ({ quantity, setQuantity }) => {
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center space-x-4 my-4">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-10 h-10 flex items-center justify-center rounded-full glass-button !p-0 text-xl font-bold disabled:opacity-50"
        type="button"
      >
        -
      </button>
      <span className="text-xl font-bold text-gray-200 w-8 text-center">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="w-10 h-10 flex items-center justify-center rounded-full glass-button !p-0 text-xl font-bold"
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default TicketQuantitySelector;
