import React from "react";
import { UseCandidates } from "../hook/UseCandidates";
import CandidateTable from "../components/CandidateTable";
import Modal from "../components/GenericModal";

const ShowCandidates = ({ showCandidateAdd = true, showCandidateDelete = true }) => {
  const {
    candidates,
    name,
    setName,
    party,
    setParty,
    title,
    showModal,
    openModal,
    validar,
    deleteCandidate,
    setShowModal,
  } = UseCandidates();

  return (
    <div className="show-voters">
      <div className="show-voters-header">
        {showCandidateAdd && (
          <button onClick={() => openModal()} className="add-btn">
            + Añadir Candidato
          </button>
        )}
      </div>

      <CandidateTable
        data={candidates}
        openModal={openModal}
        deleteCandidate={deleteCandidate}
        showCandidateDelete={showCandidateDelete}
      />

      {showModal && (
        <Modal
          title={title}
          onClose={() => setShowModal(false)}
          onSave={validar}
          fields={[
            {
              id: "name",
              placeholder: "Nombre",
              value: name,
              onChange: setName,
            },
            {
              id: "party",
              placeholder: "Partido",
              value: party,
              onChange: setParty,
            },
          ]}
        />
      )}
    </div>
  );
};

export default ShowCandidates;
