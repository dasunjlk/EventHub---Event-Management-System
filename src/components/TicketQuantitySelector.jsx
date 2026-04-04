import React from 'react';

const TicketQuantitySelector = ({ quantity, setQuantity }) => {
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center space-x-4 my-4">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 disabled:opacity-50 transition-all duration-300 font-bold text-xl shadow-lg active:scale-95 disabled:active:scale-100"
        type="button"
      >
        -
      </button>
      <span className="text-xl font-bold text-white w-8 text-center drop-shadow-md">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all duration-300 font-bold text-xl shadow-lg active:scale-95"
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default TicketQuantitySelector;
