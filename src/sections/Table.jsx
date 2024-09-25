import React, { useState } from 'react';
import { people } from '../constants';
import { TableHeader, TableBody, ColumnSelector } from '../components/special';

const Table = () => {
  const [data, setData] = useState(people);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [visibleColumns, setVisibleColumns] = useState([]);

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
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [key]: value };

      const filteredData = people.filter((person) =>
        headers.every((header) => {
          const filterValue = newFilters[header];
          if (!filterValue) return true;
          return person[header].toString().toLowerCase().includes(filterValue.toLowerCase());
        })
      );

      setData(filteredData);
      return newFilters;
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
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">People Information</h2>
      <ColumnSelector headers={headers} visibleColumns={visibleColumns} toggleColumnVisibility={toggleColumnVisibility} />
      <table className="min-w-full bg-white border border-gray-300">
        <TableHeader
          headers={headers}
          sortData={sortData}
          getUniqueValues={getUniqueValues}
          filterData={filterData}
          displayedHeaders={displayedHeaders}
        />
        <TableBody data={data} displayedHeaders={displayedHeaders} />
      </table>
    </div>
  );
};

export default Table;