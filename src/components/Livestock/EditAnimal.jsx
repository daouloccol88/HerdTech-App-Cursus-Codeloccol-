"use client";

import React, { useState } from "react";

const EditAnimal = ({ animal, tags, onClose, onSaved }) => {
  const [form, setForm] = useState({
    RFIDTag: animal.RFIDTag,
    category: animal.category,
    sex: animal.sex,
    birthDate: animal.birthDate?.slice(0, 10),
    status: animal.status,
  });

  const handleSave = () => {
    if (!form.RFIDTag) {
      alert("Please select an RFID tag");
      return;
    }

    const animals = JSON.parse(localStorage.getItem("animals")) || [];

    const updatedAnimals = animals.map((a) =>
      a.id === animal.id ? { ...a, ...form } : a
    );

    localStorage.setItem("animals", JSON.stringify(updatedAnimals));

    onSaved();
    onClose();
  };

  return (
    <div className="modal fade show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header thm-bg-dark">
            <h5 className="modal-title">Edit Animal</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body thm-bg">
            {/* RFID TAG */}
            <div className="mb-3">
              <label className="form-label">RFID Tag</label>
              <select
                className="form-select"
                value={form.RFIDTag}
                onChange={(e) => setForm({ ...form, RFIDTag: e.target.value })}
              >
                <option value="">-- Select RFID --</option>
                {tags.map((tag) => (
                  <option key={tag.id} value={tag.label}>
                    {tag.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CATEGORY */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>vache</option>
                <option>taureau</option>
                <option>chèvre</option>
                <option>mouton</option>
              </select>
            </div>

            {/* SEX */}
            <div className="mb-3">
              <label className="form-label">Sex</label>
              <select
                className="form-select"
                value={form.sex}
                onChange={(e) => setForm({ ...form, sex: e.target.value })}
              >
                <option>male</option>
                <option>female</option>
              </select>
            </div>

            {/* BIRTH DATE */}
            <div className="mb-3">
              <label className="form-label">Birth Date</label>
              <input
                type="date"
                className="form-control"
                value={form.birthDate}
                onChange={(e) =>
                  setForm({ ...form, birthDate: e.target.value })
                }
              />
            </div>

            {/* STATUS */}
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option>sain</option>
                <option>malade</option>
                <option>vendu</option>
              </select>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer thm-bg-dark">
            <button className="btn btn-secondary" onClick={onClose}>
              Annulez
            </button>
            <button className="btn thm-bg-primary" onClick={handleSave}>
              Sauvegarder les changements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAnimal;
