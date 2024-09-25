import React, { useState } from 'react';
import { people } from '../constants';
import { arrow_up, arrow_down } from '../assets/icons';
import { SearchableDropdown } from '../components/common';

const Table2 = () => {
  const [data, setData] = useState(people); // State for table data
  const [filters, setFilters] = useState({}); // State for column filters
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [visibleColumns, setVisibleColumns] = useState([]); // State for visible columns

  const headers = Object.keys(people[0]);

  const getUniqueValues = (key) => {
    return [...new Set(people.map(person => person[key]))];
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const filterData = (key, value) => {
    // Update the filter for the current column
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [key]: value,
      };

      // After updating the filter, apply all active filters
      const filteredData = people.filter((person) =>
        headers.every((header) => {
          const filterValue = newFilters[header];
          if (!filterValue) return true; // If no filter for this header, show all
          return person[header].toString().toLowerCase().includes(filterValue.toLowerCase());
        })
      );

      setData(filteredData);
      return newFilters; // Return updated filters
    });
  };

  const toggleColumnVisibility = (header) => {
    setVisibleColumns((prevColumns) =>
      prevColumns.includes(header)
        ? prevColumns.filter((col) => col !== header)
        : [...prevColumns, header]
    );
  };

  const displayedHeaders = visibleColumns.length > 0 ? visibleColumns : headers;

  return (
    <div>
      <h2>People Information</h2>

      {/* Column Selector */}
      <div>
        <h4>Select Columns to Display</h4>
        {headers.map((header) => (
          <label key={header} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={visibleColumns.includes(header)}
              onChange={() => toggleColumnVisibility(header)}
            />
            {header.charAt(0).toUpperCase() + header.slice(1)}
          </label>
        ))}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            {displayedHeaders.map((header) => (
              <th key={header}>
                {header.charAt(0).toUpperCase() + header.slice(1)}
                <button onClick={() => sortData(header)}>
                  <img src={arrow_up} alt="Sort Ascending" style={{ width: '15px' }} />
                </button>
                <button onClick={() => sortData(header)}>
                  <img src={arrow_down} alt="Sort Descending" style={{ width: '15px' }} />
                </button>
              </th>
            ))}
          </tr>
          <tr>
            {displayedHeaders.map((header) => (
              <th key={header}>
                <SearchableDropdown
                  options={getUniqueValues(header)}
                  placeholder={`Filter by ${header}`}
                  onChange={(value) => filterData(header, value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              {displayedHeaders.map((header) => (
                <td key={header}>{person[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table2;
