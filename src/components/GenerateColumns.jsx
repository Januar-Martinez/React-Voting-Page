const GenerateColumns = (columnsConfig) => {
  return columnsConfig
    .map((col) => {
      switch (col.type) {
        case "text":
          return {
            header: col.label,
            accessorKey: col.accessor,
            ...(col.render && {
              cell: ({ row }) => col.render(row),
            }),
          };

        case "email":
          return {
            header: col.label,
            accessorKey: col.accessor,
            cell: ({ getValue }) => (
              <a href={`mailto:${getValue()}`} className="email-link">
                {getValue()}
              </a>
            ),
          };

        case "boolean":
          return {
            header: col.label,
            accessorKey: col.accessor,
            enableSorting: false,
            filterFn: (row, id, filterValue) => {
              if (!filterValue) return true;
              return row.getValue(id) === (filterValue === "true");
            },
            meta: {
              filterElement: (column) => (
                <select
                  value={column.getFilterValue() ?? ""}
                  onChange={(e) =>
                    column.setFilterValue(e.target.value || undefined)
                  }
                  className="column-filter-input"
                >
                  <option value="">Todos</option>
                  <option value="true">Sí</option>
                  <option value="false">No</option>
                </select>
              ),
            },
            cell: ({ getValue }) => (getValue() ? "Sí" : "No"),
          };

        case "actions":
          return {
            header: col.label,
            id: "acciones",
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => col.renderActions(row),
          };

        default:
          return null;
      }
    })
    .filter(Boolean);
};

export default GenerateColumns;
