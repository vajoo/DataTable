import React from 'react';
import { cross, check_mark } from '../../assets/icons';

const TableBody = ({ data, displayedHeaders, onRowClick }) => {
  return (
    <tbody>
      {data.map((rowData, index) => (
        <tr key={index} className="odd:bg-gray-50 even:bg-white hover:bg-gray-200 active:bg-gray-300" onClick={() => onRowClick(rowData)}>
          {displayedHeaders.map((header) => (
            <td key={header} className="px-6 py-2 border-b border-l border-gray-300">
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