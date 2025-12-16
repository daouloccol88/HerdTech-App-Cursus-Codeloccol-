"use client";

import React, { useState } from "react";
import MaterialInput from "../MaterialInput";

const AddTag = ({ onAdded, userId }) => {
  const [label, setLabel] = useState("");
  const [show, setShow] = useState(false);

  const handleAdd = () => {
    const tags = JSON.parse(localStorage.getItem("tags")) || [];

    tags.push({
      id: Date.now(),
      label,
      userId,
    });

    localStorage.setItem("tags", JSON.stringify(tags));
    setLabel("");
    setShow(false);
    onAdded();
  };

  return (
    <>
      <button
        className="btn btn-success thm-bg-primary thm-shadow-m"
        onClick={() => setShow(true)}
      >
        <span className="text-white fs-4">
          <span className="text-white">+</span>{" "}
          <span className="text-white">
            Configurer un nouveau traqueur RFID
          </span>
        </span>
      </button>

      {show && (
        <div className="modal fade show d-block bg-dark bg-opacity-50">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header thm-bg-dark">
                <h5>Configurer un nouveau traqueur RFID</h5>
                <button
                  className="btn-close thm-bg-primary"
                  onClick={() => setShow(false)}
                />
              </div>

              <div className="modal-body thm-bg-light">
                <MaterialInput
                  placeholder="Veuillez entrez le TAG du nouveau traqueur"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  width="90%"
                />
              </div>

              <div className="modal-footer thm-bg-dark">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShow(false)}
                >
                  Annuler
                </button>
                <button className="btn thm-bg-primary" onClick={handleAdd}>
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTag;
