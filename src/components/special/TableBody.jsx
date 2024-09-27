import React, { useState, useEffect } from 'react';
import { cross, check_mark } from '../../assets/icons';

const TableBody = ({ data, displayedHeaders, onRowClick, onCheckboxToggle }) => {
  const [checkboxStates, setCheckboxStates] = useState({});

  useEffect(() => {
    const newCheckboxStates = {};
    data.forEach(rowData => {
      newCheckboxStates[rowData.id] = checkboxStates[rowData.id] || false;
    });
    setCheckboxStates(newCheckboxStates);
  }, [data]);

  const handleCheckboxToggle = (rowData) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [rowData.id]: !prevState[rowData.id],
    }));

    onCheckboxToggle(rowData, !checkboxStates[rowData.id]);
  };

  return (
    <tbody>
      {data.map((rowData, index) => (
        <tr key={rowData.id} className="odd:bg-gray-50 even:bg-white hover:bg-gray-200 active:bg-gray-300">
          <td
            className="px-6 py-2 border-b border-l border-gray-300 cursor-pointer"
            onClick={() => handleCheckboxToggle(rowData)} 
          >
            <input
              type="checkbox"
              checked={checkboxStates[rowData.id] || false}  
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
