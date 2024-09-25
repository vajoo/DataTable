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
        <div className="dropdown-container p-10 bg-red-500" style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              value={inputValue}
              placeholder={placeholder}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
            {showDropdown && (
                <ul className="dropdown-list" style={{
                  position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: '150px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #ccc', zIndex: 10, listStyle: 'none', padding: '0', margin: '0'
                }}>
                  {filteredOptions.map((option, index) => (
                    <li key={index} onClick={() => handleOptionSelect(option.toString())} style={{
                      padding: '8px', cursor: 'pointer'
                    }}>
                      {option}
                    </li>
                  ))}
                </ul>
            )}
            <button onClick={() => clearFilter()}>
              <img src={cross} alt="X" width="25px" height="25px" />
            </button>
        </div>
    );
};

export default SearchableDropdown;