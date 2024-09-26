import React, { useState, useEffect } from 'react';

const Modal = ({ isOpen, onClose, rowData, onSave }) => {
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if (rowData) {
      setFormData(rowData);
    }
  }, [rowData]);

  if (!isOpen) return null;

  const handleInputChange = (e, key) => {
    const newRowData = { ...formData, [key]: e.target.value };
    setFormData(newRowData);
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Row Data</h2>
        {Object.keys(formData).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{key}</label>
            <input
              type="text"
              value={formData[key]}
              onChange={(e) => handleInputChange(e, key)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 bg-gray-300 text-gray-700 rounded-md px-4 py-2">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white rounded-md px-4 py-2">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
