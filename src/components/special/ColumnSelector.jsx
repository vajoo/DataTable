import React from 'react';

const ColumnSelector = ({ headers, visibleColumns, toggleColumnVisibility }) => {
    return (
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Select Columns to Display</h4>
        {headers.map((header) => (
          <label key={header} className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              checked={visibleColumns.includes(header)}
              onChange={() => toggleColumnVisibility(header)}
              className="mr-2"
            />
            {header.charAt(0).toUpperCase() + header.slice(1)}
          </label>
        ))}
      </div>
    );
};

export default ColumnSelector;