"use client";

import React from "react";

const RemoveAnimal = ({ animal, onClose, onDeleted }) => {
  const handleDelete = () => {
    const allAnimals = JSON.parse(localStorage.getItem("animals")) || [];
    const updated = allAnimals.filter((a) => a.id !== animal.id);

    localStorage.setItem("animals", JSON.stringify(updated));
    onDeleted();
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ background: "#00000080" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header thm-bg-dark">
            <h5 className="modal-title text-danger">Delete Animal</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body thm-bg">
            Are you sure you want to delete animal with RFID{" "}
            <strong>{animal.RFIDTag}</strong>?
          </div>

          <div className="modal-footer thm-bg-dark">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveAnimal;
