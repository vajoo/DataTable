import React, { useState } from 'react';
import { TableHeader, TableBody, ColumnSelector } from '../components/special';

const Table = ({ initialData = [], customColumnNames = {} }) => {
  const [tableData, setTableData] = useState(initialData);
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [visibleColumns, setVisibleColumns] = useState([]);

  const headers = Object.keys(initialData[0]);

  const getUniqueValues = (key) => {
    return [...new Set(initialData.map(data => data[key]))];
  };

  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setTableData(sortedData);
  };

  const filterData = (key, value) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters, [key]: value };

      const filteredData = initialData.filter((data) =>
        headers.every((header) => {
          const filterValue = newFilters[header];
          if (!filterValue) return true;
          return data[header].toString().toLowerCase().includes(filterValue.toLowerCase());
        })
      );

      setTableData(filteredData);
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

  const finalVisibleColumns = visibleColumns.length > 0 ? visibleColumns : headers;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">People Information</h2>
      <ColumnSelector headers={headers} visibleColumns={visibleColumns} toggleColumnVisibility={toggleColumnVisibility} />
      <table className="min-w-full bg-white border border-gray-300">
        <TableHeader
          headers={finalVisibleColumns}
          sortData={sortData}
          getUniqueValues={getUniqueValues}
          filterData={filterData}
          customColumnNames={customColumnNames}
        />
        <TableBody data={tableData} displayedHeaders={finalVisibleColumns} />
      </table>
    </div>
  );
};

export default Table;