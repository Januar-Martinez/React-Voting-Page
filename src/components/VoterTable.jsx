import React, { useMemo } from "react";
import GenericTable from "../components/GenericTable";
import GenerateColumns from "../components/GenerateColumns";

const VoterTable = ({ data, deleteVoter }) => {

  const columns = useMemo(() => GenerateColumns([
    { type: "text", label: "Id", accessor: "id" },
    { type: "text", label: "Nombre", accessor: "name" },
    { type: "email", label: "Correo", accessor: "email" },
    { type: "boolean", label: "Ha votado", accessor: "hasVoted" },
    {
      type: "actions",
      label: "Eliminar",
      renderActions: (row) => (
        <button
          onClick={() => deleteVoter(row.original.id, row.original.name)}
          className="action-btn"
        >
          🗑
        </button>
      ),
    },
  ]), []);

  return <GenericTable columns={columns} data={data} />;
};

export default VoterTable;