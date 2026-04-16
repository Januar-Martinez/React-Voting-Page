import React, { useMemo } from "react";
import GenericTable from "../components/GenericTable";
import GenerateColumns from "../components/GenerateColumns";

const CandidateTable = ({ data, deleteCandidate }) => {
  const columns = useMemo(
    () =>
      GenerateColumns([
        { type: "text", label: "Id", accessor: "id" },
        { type: "text", label: "Nombre", accessor: "name" },
        {
          type: "text",
          label: "Partido",
          accessor: "party",
          render: (row) => row.original.party || "Sin partido",
        },
        { type: "text", label: "Votos", accessor: "votes" },
        {
          type: "actions",
          label: "Eliminar",
          renderActions: (row) => (
            <button
              onClick={() =>
                deleteCandidate(row.original.id, row.original.name)
              }
              className="action-btn"
            >
              🗑
            </button>
          ),
        },
      ]),
    [],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default CandidateTable;
