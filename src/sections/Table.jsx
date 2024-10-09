import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library
import { TableHeader, TableBody, TableFooter, ColumnSelector } from '../components/special';
import { EditModal, ConfirmModal, InsertionModal } from '../components/layout';

const Table = ({ initialData = [], customColumnNames = {}, rowsPerPage = 50 }) => {
  // Initialize the table data with unique IDs
  const [tableData, setTableData] = useState(() =>
    initialData.map(data => ({ ...data, id: uuidv4() })) // Assign a unique ID
  );
  const [filters, setFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [insertModalOpen, setInsertModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(() => () => {});
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [checkedRows, setCheckedRows] = useState([]);

  const headers = Object.keys(initialData[0]);

  const getUniqueValues = (key) => {
    return [...new Set(initialData.map(data => data[key]))];
  };

  const sortData = (key) => {
    setCurrentPage(1);
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
    setCurrentPage(1);
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

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setEditModalOpen(true); 
  };

  const handleCheckboxToggle = (rowData, isChecked) => {
    setCheckedRows((prevCheckedRows) => {
      if (isChecked) {
        return [...prevCheckedRows, rowData];
      } else {
        return prevCheckedRows.filter(row => row.id !== rowData.id);
      }
    });
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedRowData(null);
  };

  const handleInsertModalClose = () => {
    setInsertModalOpen(false);
  };

  const handleEditSave = (updatedRowData) => {
    const updatedData = tableData.map((row) =>
      row.id === updatedRowData.id ? updatedRowData : row
    );
    setTableData(updatedData); 
    handleEditModalClose(); 
  };

  const handleInsertSave = (newRowData) => {
    const updatedData = [...tableData, { ...newRowData, id: uuidv4() }]; // Assign a unique ID for the new row
    setTableData(updatedData);
    handleInsertModalClose();
  };

  const sendCheckedRows = () => {
    console.log("Checked Rows:", checkedRows);
  };

  const deleteCheckedRows = () => {
    setTableData((prevData) => prevData.filter(row => !checkedRows.includes(row)));
    setCheckedRows((prevCheckedRows) => prevCheckedRows.filter(row => !checkedRows.includes(row)));
  };

  const handleOpenSendModal = () => {
    setConfirmAction(() => sendCheckedRows); // Set dynamic onSave to sendCheckedRows
    setConfirmModalOpen(true);
  };

  const handleOpenDeleteModal = () => {
    setConfirmAction(() => deleteCheckedRows); // Set dynamic onSave to deleteCheckedRows
    setConfirmModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };

  return (
    <div className="overflow-x-auto">
      <p>Number of items: {tableData.length}</p>
      <div className="w-full flex flex-row justify-between">
        <ColumnSelector headers={headers} visibleColumns={visibleColumns} toggleColumnVisibility={toggleColumnVisibility} />
        <div className="flex">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out my-4" onClick={() => handleOpenSendModal(true)}>Send Checked Rows</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out my-4 ml-4" onClick={() => setInsertModalOpen(true)}>Insert new Row</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out my-4 ml-4" onClick={() => handleOpenDeleteModal(true)}>Delete Checked Rows</button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <TableHeader
          headers={finalVisibleColumns}
          sortData={sortData}
          getUniqueValues={getUniqueValues}
          filterData={filterData}
          customColumnNames={customColumnNames}
        />
        <TableBody data={currentData} displayedHeaders={finalVisibleColumns} onRowClick={handleRowClick} onCheckboxToggle={handleCheckboxToggle} />
        {currentData.length > 0 && (
          <TableFooter
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </table>
      <EditModal 
        isOpen={editModalOpen} 
        onClose={handleEditModalClose} 
        rowData={selectedRowData} 
        onSave={handleEditSave}
      />
      <ConfirmModal 
        isOpen={confirmModalOpen} 
        onClose={() => setConfirmModalOpen(false)} 
        onSave={confirmAction}
      />
      <InsertionModal
        isOpen={insertModalOpen}
        onClose={handleInsertModalClose}
        onSave={handleInsertSave}
      />
    </div>
  );
};

export default Table;
