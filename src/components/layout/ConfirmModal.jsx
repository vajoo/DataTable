import React from 'react';
import { cross } from '../../assets/icons';

const ConfirmModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-11/12 lg:w-1/4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
          <img src={cross} alt="Close" className="w-6 h-6 transition-transform duration-200 transform hover:scale-110" />
        </button>

        <h2 className="text-xl font-bold mb-4">Bist du sicher?</h2>

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white rounded-md px-4 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95">Save</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
