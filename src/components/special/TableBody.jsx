import React, { useState, useEffect } from 'react';
import { cross, check_mark } from '../../assets/icons';

const TableBody = ({ data, displayedHeaders, onRowClick, onCheckboxToggle }) => {
  const [checkboxStates, setCheckboxStates] = useState({});

  // Initialize checkbox states when the data changes
  useEffect(() => {
    const newCheckboxStates = {};
    data.forEach(rowData => {
      newCheckboxStates[rowData.uuid] = checkboxStates[rowData.uuid] || false;
    });
    setCheckboxStates(newCheckboxStates);
  }, [data]); // Only depend on data

  const handleCheckboxToggle = (rowData) => {
    const newState = !checkboxStates[rowData.uuid];
    setCheckboxStates((prevState) => ({
      ...prevState,
      [rowData.uuid]: newState,
    }));

    onCheckboxToggle(rowData, newState);
  };

  return (
    <tbody>
      {data.map((rowData) => (
        <tr key={rowData.uuid} className="odd:bg-gray-50 even:bg-white hover:bg-gray-200 active:bg-gray-300">
          <td
            className="px-6 py-2 border-b border-l border-gray-300 cursor-pointer"
            onClick={() => handleCheckboxToggle(rowData)} 
          >
            <input
              type="checkbox"
              checked={checkboxStates[rowData.uuid] || false}  
              onChange={() => handleCheckboxToggle(rowData)}
              onClick={(e) => e.stopPropagation()} 
              className="cursor-pointer"
            />
          </td>
          {displayedHeaders.map((header) => (
            <td
              key={header}
              className="px-6 py-2 border-b border-l border-gray-300 cursor-pointer" 
              onClick={() => onRowClick(rowData)}
            >
              {typeof rowData[header] === 'boolean' ? (
                rowData[header] ? (
                  <img src={check_mark} alt="True" className="w-8 inline" />
                ) : (
                  <img src={cross} alt="False" className="w-7 inline" />
                )
              ) : (
                rowData[header] ? rowData[header].toString() : ''
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
