import React, { useState, useEffect } from 'react';
import { cross } from '../../assets/icons';

const Modal = ({ isOpen, onClose, rowData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (rowData) {
      // Convert date strings to Date objects if applicable
      const convertedData = Object.keys(rowData).reduce((acc, key) => {
        const originalValue = rowData[key];
        
        // Check if the originalValue is a valid date string
        const isDate = typeof originalValue === 'string' && !isNaN(Date.parse(originalValue));
        
        // Store as Date if it's a date string; otherwise, store the original value
        acc[key] = isDate ? new Date(originalValue) : originalValue; 
        return acc;
      }, {});
      setFormData(convertedData);
    }
  }, [rowData]);

  if (!isOpen) return null;

  const handleInputChange = (e, key) => {
    const originalValue = rowData[key];
    let newValue = e.target.value;

    // Check if the original value is a date
    const isDate = typeof originalValue === 'string' && !isNaN(Date.parse(originalValue));

    if (typeof originalValue === 'number') {
      newValue = parseFloat(newValue) || 0;
    } else if (typeof originalValue === 'boolean') {
      newValue = e.target.checked; // Use e.target.checked for boolean values
    } else if (isDate) {
      newValue = new Date(newValue); // Convert to Date object
    }

    const newRowData = { ...formData, [key]: newValue };
    setFormData(newRowData);
  };

  const handleSave = () => {
    const savedData = { ...formData };
    
    // Format date fields as yyyy-MM-dd before saving
    Object.keys(savedData).forEach(key => {
      if (savedData[key] instanceof Date) {
        savedData[key] = savedData[key].toISOString().split('T')[0]; // Format to yyyy-MM-dd
      }
    });

    onSave(savedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
          <img src={cross} alt="Close" className="w-6 h-6 transition-transform duration-200 transform hover:scale-110" />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Row Data</h2>
        {Object.keys(formData).map((key) => {
          // Determine if the field is a date
          const isDate = typeof rowData[key] === 'string' && !isNaN(Date.parse(rowData[key]));
          const isBoolean = typeof rowData[key] === 'boolean';

          return (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{key}</label>
              {isBoolean ? (
                <input
                  type="checkbox"
                  checked={formData[key]}
                  onChange={(e) => handleInputChange(e, key)}
                  className="mt-1 w-5 h-5"
                />
              ) : (
                <input
                  type={isDate ? 'date' : 'text'}
                  value={isDate ? formData[key]?.toISOString().split('T')[0] : formData[key]} // Format to YYYY-MM-DD for date input
                  onChange={(e) => handleInputChange(e, key)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              )}
            </div>
          );
        })}

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95">Cancel</button>
          <button onClick={handleSave} className="bg-blue-500 text-white rounded-md px-4 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
