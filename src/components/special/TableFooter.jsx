import React from "react";

const TableFooter = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <tfoot>
            <tr>
                <td colSpan="100%">
                    <div className="flex justify-center py-4">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mx-2"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        <span className="mx-4 text-gray-700 font-medium">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mx-2"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </td>
            </tr>
        </tfoot>
    );
};

export default TableFooter;
