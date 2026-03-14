import React from 'react';
import { AlertCircle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-teal-900 max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-300">
        
        <div className="p-8 text-center">
          
          <div className="mx-auto w-14 h-14 bg-teal-50 border-2 border-teal-100 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="text-teal-600" size={28} />
          </div>
          
          <h3 className="text-xl font-black text-teal-900 mb-3 uppercase tracking-tight">
            {title}
          </h3>

          <p className="text-teal-700/70 text-sm leading-relaxed px-4 font-medium">
            {message}
          </p>

        </div>
        
        <div className="flex border-t-2 border-teal-50">
          
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-4 text-xs font-bold text-teal-400 hover:text-teal-600 hover:bg-teal-50 transition border-r-2 border-teal-50"
          >
            CANCEL
          </button>

          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-6 py-4 text-xs font-black text-orange-600 hover:bg-orange-50 transition"
          >
            CONFIRM RESET
          </button>

        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;