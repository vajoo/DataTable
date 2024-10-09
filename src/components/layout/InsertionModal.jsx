import React, { useState } from "react";
import { cross } from '../../assets/icons';
import SearchableDropdown from '../common/SearchableDropdown';

// Example dynamic field configuration
const fieldConfig = [
    { label: "Name", name: "name", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "Job", name: "job", type: "dropdown", options: ["Software Engineer", "Data Scientist", "Project Manager", "UX Designer"] },
    { label: "Favorite Color", name: "favorite_color", type: "dropdown", options: ["Blue", "Green", "Red", "Yellow", "Purple", "Orange", "Pink"] },
    { label: "City", name: "city", type: "text" },
    { label: "Hobbies", name: "hobbies", type: "text" },
    { label: "Salary", name: "salary", type: "number" },
    { label: "Married", name: "married", type: "checkbox" },
    { label: "Children", name: "children", type: "number" },
    { label: "Date", name: "date", type: "date" },
];

const InsertionModal = ({ isOpen, onClose, onSave }) => {
    // Initialize formData state dynamically based on fieldConfig
    const createInitialState = () => {
        const initialState = {};
        fieldConfig.forEach(field => {
            initialState[field.name] = field.type === 'checkbox' ? false : '';
        });
        return initialState;
    };

    const [formData, setFormData] = useState(createInitialState());

    // Handle input changes for both text, number, checkbox, and date inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleDropdownChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle the insertion of new data
    const handleInsert = () => {
        const savedData = { ...formData };
        onSave(savedData);
        setFormData(createInitialState()); // Reset form fields after saving
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-1/3">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                    <img src={cross} alt="Close" className="w-6 h-6 transition-transform duration-200 transform hover:scale-110" />
                </button>

                <h2 className="text-xl font-bold mb-4">Insert New Data</h2>

                {fieldConfig.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                        </label>

                        {field.type === "checkbox" ? (
                            <input
                                type="checkbox"
                                name={field.name}
                                checked={formData[field.name]}
                                onChange={handleInputChange}
                                className="w-5 h-5"
                            />
                        ) : field.type === "dropdown" ? (
                            <SearchableDropdown
                                options={field.options}
                                placeholder={`Select ${field.label}`}
                                onChange={(value) => handleDropdownChange(field.name, value)}
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                placeholder={`Fill in ${field.label}`}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        )}
                    </div>
                ))}

                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleInsert}
                        className="bg-blue-500 text-white rounded-md px-4 py-2 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                    >
                        Insert
                    </button>
                </div>
            </div>
        </div>
    );

};

export default InsertionModal;
