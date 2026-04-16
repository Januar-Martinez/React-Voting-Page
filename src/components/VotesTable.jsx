import React, { useMemo } from "react";
import GenericTable from "../components/GenericTable";
import GenerateColumns from "../components/GenerateColumns";

const VoteTable = ({ data }) => {
  const columns = useMemo(
    () =>
      GenerateColumns([
        { type: "text", label: "Candidato", accessor: "candidateName" },
        { type: "text", label: "Votos recibidos", accessor: "votesReceived" },
        { type: "text", label: "Porcentaje", accessor: "percentage" },
      ]),
    [],
  );

  return <GenericTable columns={columns} data={data} />;
};

export default VoteTable;
