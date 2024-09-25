import React from 'react';
import { SearchableDropdown } from '../common';
import { arrow_up, arrow_down } from '../../assets/icons';

const TableHeader = ({ headers, sortData, getUniqueValues, filterData, displayedHeaders }) => {
  return (
    <thead>
          <tr>
            {displayedHeaders.map((header) => (
              <th
                key={header}
                className="px-6 pt-3 text-left text-lg font-medium text-gray-700 uppercase tracking-wider border-l border-gray-300"
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}
                <button onClick={() => sortData(header)} className="ml-2">
                  <img src={arrow_up} alt="Sort Ascending" className="w-4 inline" />
                </button>
                <button onClick={() => sortData(header)} className="ml-1">
                  <img src={arrow_down} alt="Sort Descending" className="w-4 inline" />
                </button>
              </th>
            ))}
          </tr>
          <tr>
            {displayedHeaders.map((header) => (
              <th key={header} className="px-6 py-3 border-b border-l border-gray-300">
                <SearchableDropdown
                  options={getUniqueValues(header)}
                  placeholder={`Filter by ${header}`}
                  onChange={(value) => filterData(header, value)}
                />
              </th>
            ))}
          </tr>
        </thead>
  );
};

export default TableHeader;