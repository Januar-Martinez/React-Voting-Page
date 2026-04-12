import React from "react";
import "../css/Modal.css";

const Modal = ({ title, fields, onSave, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {fields.map((field) => (
            <input
              key={field.id}
              type={field.type || "text"}
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="modal-input"
            />
          ))}
          <div className="modal-save-btn-wrapper">
            <button onClick={onSave} className="modal-save-btn">Guardar</button>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="modal-cancel-btn">Cerrar</button>
        </div>

      </div>
    </div>
  );
};

export default Modal;