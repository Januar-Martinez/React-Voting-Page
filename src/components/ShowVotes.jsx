import React from "react";
import { UseVotes } from "../hook/UseVotes";
import VoteTable from "../components/VotesTable";
import Modal from "../components/GenericModal";

const ShowVotes = ({ showVoteButton = true }) => {
  const {
    statistics,
    voterId,
    setVoterId,
    candidateId,
    setCandidateId,
    title,
    showModal,
    openModal,
    validar,
    setShowModal,
  } = UseVotes();

  return (
    <div className="show-voters">
      <div className="show-voters-header">
        {showVoteButton && (
          <button onClick={() => openModal()} className="add-btn">
            + Votar
          </button>
        )}

        <button className="add-btn">
          Total de votos : {statistics?.totalVotesCast || 0}
        </button>
      </div>

      <VoteTable data={statistics.results} openModal={openModal} />

      {showModal && (
        <Modal
          title={title}
          onClose={() => setShowModal(false)}
          onSave={validar}
          fields={[
            {
              id: "voterId",
              placeholder: "ID Votante",
              value: voterId,
              onChange: setVoterId,
            },
            {
              id: "candidateId",
              placeholder: "ID Candidato",
              value: candidateId,
              onChange: setCandidateId,
            },
          ]}
        />
      )}
    </div>
  );
};

export default ShowVotes;
