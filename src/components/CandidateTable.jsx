import React, { useMemo } from "react";
import GenericTable from "../components/GenericTable";
import GenerateColumns from "../components/GenerateColumns";

const CandidateTable = ({ data, deleteCandidate, showCandidateDelete = true }) => {
  const columns = useMemo(() => {
    const baseColumns = [
      { type: "text", label: "Id", accessor: "id" },
      { type: "text", label: "Nombre", accessor: "name" },
      {
        type: "text",
        label: "Partido",
        accessor: "party",
        render: (row) => row.original.party || "Sin partido",
      },
    ];

    if (showCandidateDelete) {
      baseColumns.push({
        type: "actions",
        label: "Eliminar",
        renderActions: (row) => (
          <button
            onClick={() => deleteCandidate(row.original.id, row.original.name)}
            className="action-btn"
          >
            🗑
          </button>
        ),
      });
    }

    return GenerateColumns(baseColumns);
  }, [showCandidateDelete, deleteCandidate]);

  return <GenericTable columns={columns} data={data} />;
};

export default CandidateTable;
