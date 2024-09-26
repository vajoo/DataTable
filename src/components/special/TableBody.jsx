import React, { useState } from 'react';
import { cross, check_mark } from '../../assets/icons';

const TableBody = ({ data, displayedHeaders, onRowClick, onCheckboxToggle }) => {
  const [checkboxStates, setCheckboxStates] = useState(
    data.map(rowData => false)
  );

  const handleCheckboxToggle = (index, rowData) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates[index] = !updatedCheckboxStates[index];
    setCheckboxStates(updatedCheckboxStates);

    onCheckboxToggle(rowData, updatedCheckboxStates[index]);
  };

  return (
    <tbody>
      {data.map((rowData, index) => (
        <tr key={index} className="odd:bg-gray-50 even:bg-white hover:bg-gray-200 active:bg-gray-300">
          <td
            className="px-6 py-2 border-b border-l border-gray-300 cursor-pointer"
            onClick={() => handleCheckboxToggle(index, rowData)} 
          >
            <input
              type="checkbox"
              checked={checkboxStates[index]}
              onChange={() => handleCheckboxToggle(index, rowData)}
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
                rowData[header].toString()
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
