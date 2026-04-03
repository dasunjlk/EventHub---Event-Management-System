import React from 'react';

const AlertModal = ({ isOpen, onClose, title = 'Notification', message, type = 'info', buttonText = 'OK' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="glass-panel w-full max-w-md overflow-hidden border-white/20 shadow-2xl animate-in zoom-in-95 duration-300 relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              type === 'danger' ? 'bg-red-500/20 text-red-400' : 'bg-primary-500/20 text-primary-400'
            }`}>
              {type === 'danger' ? (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              ) : (
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-sm">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`glass-btn px-8 py-2.5 text-sm font-bold shadow-lg ${
                type === 'danger' 
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-200 border-red-500/30' 
                  : 'bg-primary-500/20 hover:bg-primary-500/30 text-primary-200 border-primary-500/30'
              }`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
