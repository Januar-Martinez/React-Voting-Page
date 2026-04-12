import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "../css/Table.css";

function ColumnFilter({ column }) {
  return (
    <input
      value={column.getFilterValue() ?? ""}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => column.setFilterValue(e.target.value || undefined)}
      placeholder="Buscar..."
      className="column-filter-input"
    />
  );
}

const GenericTable = ({
  columns,
  data = [],
  initialState = { pagination: { pageIndex: 0, pageSize: 5 } },
}) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState(initialState.pagination);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, pagination },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="table-wrapper">
      <div className="table-scroll">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="table-header-cell"
                  >
                    <div className="header-content">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted() === "asc" && " ▲"}
                        {header.column.getIsSorted() === "desc" && " ▼"}
                      </span>
                      {header.column.getCanFilter() && (
                        <div>
                          {header.column.columnDef.meta?.filterElement ? (
                            header.column.columnDef.meta.filterElement(
                              header.column,
                            )
                          ) : (
                            <ColumnFilter column={header.column} />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="table-row">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="table-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <td key={header.id} className="table-footer-cell">
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>

      <div className="pagination-bar">
        <div className="pagination-buttons">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="page-btn"
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="page-btn"
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="page-btn"
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="page-btn"
          >
            {">>"}
          </button>
          <span className="page-info">
            Página{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="page-size-select"
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              Mostrar {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GenericTable;
