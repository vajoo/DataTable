import React, { useState } from 'react';
import { cross } from '../../assets/icons';

const SearchableDropdown = ({ options, placeholder, onChange }) => {
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      const filtered = options.filter(option =>
        option.toString().toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);

      setShowDropdown(value !== '' && filtered.length > 0);
      onChange(value);
    };

    const handleOptionSelect = (option) => {
      setInputValue(option.toString());
      setShowDropdown(false); 
      onChange(option); 
    };

    const clearFilter = () => {
      setInputValue('');
      setFilteredOptions(options);
      setShowDropdown(false);
      onChange('');
    };

    return (
      <div className="relative w-full">
          <input
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 font-normal placeholder:text-sm"
          />
          {showDropdown && (
              <ul className="absolute w-full mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg z-10 font-normal">
                {filteredOptions.map((option, index) => (
                  <React.Fragment key={index}>
                    <li 
                      onMouseDown={() => handleOptionSelect(option.toString())}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {option}
                    </li>
                    {/* Add dividers between items, but not after the last item */}
                    {index < filteredOptions.length - 1 && (
                      <div className="mx-4 border-t border-gray-200"></div>
                    )}
                  </React.Fragment>
                ))}
              </ul>
          )}
          <button 
            onClick={() => clearFilter()} 
            className="absolute right-2 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <img src={cross} alt="Clear Filter" className="w-5 h-5" />
          </button>
      </div>
  );
};

export default SearchableDropdown;