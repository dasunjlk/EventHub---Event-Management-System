import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { createBooking } from '../services/bookingService';

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, quantity } = location.state || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('input'); // 'input', 'verifying', 'success'

  if (!event || !quantity) {
    return <Navigate to="/events" replace />;
  }

  const totalPrice = event.price * quantity;

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentStep('verifying');

    // Simulate network delay for payment verification
    setTimeout(async () => {
      try {
        const bookingData = {
          event_id: event._id || event.id,
          ticket_quantity: quantity
        };

        const response = await createBooking(bookingData);

        if (response.success) {
          setPaymentStep('success');
          setTimeout(() => {
            navigate('/booking-success', {
              state: {
                bookingDetails: response.booking
              }
            });
          }, 1500);
        }
      } catch (error) {
        alert(error.message || "Payment processing failed. Please try again.");
        setPaymentStep('input');
        setIsProcessing(false);
      }
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center">
      <div className="glass-panel w-full max-w-2xl overflow-hidden border-white/20 shadow-2xl p-8 md:p-12 relative">
        
        {paymentStep === 'verifying' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mb-6"></div>
            <h2 className="text-2xl font-bold text-white animate-pulse">Verifying Payment...</h2>
            <p className="text-gray-300 mt-2">Communicating with your bank</p>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-green-500/20 backdrop-blur-md">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
               <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Payment Successful!</h2>
            <p className="text-gray-200 mt-2">Redirecting to confirmation...</p>
          </div>
        )}

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white drop-shadow-md mb-2">Secure Checkout</h1>
          <p className="text-gray-300 font-medium">Complete your payment to finalize booking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div className="order-first md:order-last">
            <div className="glass-panel bg-white/5 p-6 border-white/10 h-full">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Event</span>
                  <span className="text-white font-medium truncate max-w-[150px]">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tickets</span>
                  <span className="text-white font-medium">x {quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Price per ticket</span>
                  <span className="text-white font-medium">Rs {event.price.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-white font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    Rs {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
              <input
                type="text"
                required
                className="glass-input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  maxLength="19"
                  className="glass-input pr-10"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Expiry Date</label>
                <input
                  type="text"
                  required
                  maxLength="5"
                  className="glass-input"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                <input
                  type="text"
                  required
                  maxLength="3"
                  className="glass-input"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isProcessing}
              className="glass-btn w-full py-4 mt-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] border-white/20"
            >
              Pay Now (Rs {totalPrice.toLocaleString()})
            </button>
            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure 256-bit SSL Encrypted Payment
            </p>
          </form>
        </div>
      </div>

      <button 
        onClick={() => navigate(-1)} 
        className="mt-8 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to booking
      </button>
    </div>
  );
};

export default PaymentGateway;
