import React from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="glass-panel w-full max-w-md overflow-hidden border-white/20 shadow-2xl animate-in zoom-in-95 duration-300 relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              type === 'danger' ? 'bg-red-500/20 text-red-400' : 'bg-primary-500/20 text-primary-400'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white drop-shadow-sm">{title}</h3>
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            {message}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={onClose}
              className="glass-btn px-6 py-2.5 text-sm font-medium border-white/10 hover:bg-white/5"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`glass-btn px-8 py-2.5 text-sm font-bold shadow-lg ${
                type === 'danger' 
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-200 border-red-500/30' 
                  : 'bg-primary-500/20 hover:bg-primary-500/30 text-primary-200 border-primary-500/30'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
