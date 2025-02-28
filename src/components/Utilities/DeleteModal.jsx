import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div 
            className="relative w-full max-w-md p-6 transition-all duration-300 transform scale-105 rounded-lg shadow-lg opacity-0 bg-color-hover animate-modal-pop-up"
            style={{ animationFillMode: 'forwards' }}
        >
        <h3 className="mb-4 text-xl font-semibold text-color-primary">
          {title || "Konfirmasi Hapus"}
        </h3>
        <p className="mb-6 text-color-primary">
          {message || "Anda yakin ingin menghapus data ini?"}
        </p>
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 mr-2 transition duration-200 rounded text-color-hover bg-color-secondary hover:bg-color-yellow"
          >
            Batal
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 transition duration-200 rounded text-color-primary bg-color-red hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      {/* <div className="p-6 bg-white rounded w-96">
        </div> */}
      </div>
    </div>
  );
};

export default DeleteModal;
