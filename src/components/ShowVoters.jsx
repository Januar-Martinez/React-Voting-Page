import React from "react";
import { UseVoters } from "../hook/UseVoters";
import VoterTable from "../components/VoterTable";
import Modal from "../components/GenericModal";

const ShowVoters = () => {
  const {
    voters, name, setName, email, setEmail,
    title, showModal, openModal, validar,
    deleteVoter, setShowModal,
  } = UseVoters();

  return (
    <div className="show-voters">

      <div className="show-voters-header">
        <button onClick={() => openModal()} className="add-btn">
          + Añadir Votante
        </button>
      </div>

      <VoterTable
        data={voters}
        openModal={openModal}
        deleteVoter={deleteVoter}
      />

      {showModal && (
        <Modal
          title={title}
          onClose={() => setShowModal(false)}
          onSave={validar}
          fields={[
            { id: "name", placeholder: "Nombre", value: name, onChange: setName },
            { id: "email", placeholder: "Email", value: email, onChange: setEmail },
          ]}
        />
      )}

    </div>
  );
};

export default ShowVoters;