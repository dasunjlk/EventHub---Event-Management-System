import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-green-500/10' : 'bg-red-500/10';
  const borderColor = isSuccess ? 'border-green-500/50' : 'border-red-500/50';
  const textColor = isSuccess ? 'text-green-400' : 'text-red-400';
  
  const icon = isSuccess ? (
    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up">
      <div className={`flex items-center px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${bgColor} ${borderColor} ${textColor}`}>
        {icon}
        <span className="font-medium text-sm whitespace-nowrap">{message}</span>
        <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100 transition-opacity flex-shrink-0 focus:outline-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
