"use client";

import React, { useMemo, useState } from "react";
import MaterialInput from "../MaterialInput";

const EditTag = ({ tag, onClose, onSaved, currentUserId }) => {
  const [label, setLabel] = useState(tag.label);

  // 🔍 Load animals once and filter those using this tag
  const animalsUsingTag = useMemo(() => {
    const animals = JSON.parse(localStorage.getItem("animals")) || [];
    return animals.filter(
      (a) => a.RFIDTag === tag.label && a.userId == currentUserId
    );
  }, [tag.label]);

  const handleSave = () => {
    if (!label.trim()) return;

    const tags = JSON.parse(localStorage.getItem("tags")) || [];
    const animals = JSON.parse(localStorage.getItem("animals")) || [];

    // Update tag label
    const updatedTags = tags.map((t) =>
      t.id === tag.id ? { ...t, label } : t
    );

    // Update animals using this tag
    const updatedAnimals = animals.map((a) =>
      a.RFIDTag === tag.label ? { ...a, RFIDTag: label } : a
    );

    localStorage.setItem("tags", JSON.stringify(updatedTags));
    localStorage.setItem("animals", JSON.stringify(updatedAnimals));

    onSaved();
    onClose();
  };

  return (
    <div className="modal fade show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header thm-bg-dark">
            <h5 className="modal-title">Modifier ce Tag RFID</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body thm-bg">
            {/* TAG LABEL */}
            <div className="mb-3">
              <label className="form-label">Tag label</label>
              <MaterialInput
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                width="80%"
              />
            </div>

            {/* ANIMALS USING THIS TAG */}
            <div className="mt-4">
              <h6 className="fw-semibold">
                Animals using this tag
                <span className="badge bg-secondary ms-2">
                  {animalsUsingTag.length}
                </span>
              </h6>

              {animalsUsingTag.length === 0 ? (
                <p className="text-muted mb-0">
                  Aucun animal assigné à ce tag.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-sm table-bordered mt-2">
                    <thead className="table-light">
                      <tr>
                        <th className="thm-bg-dark">
                          <span>ID</span>
                        </th>
                        <th className="thm-bg-dark">
                          <span>Category</span>
                        </th>
                        <th className="thm-bg-dark">
                          <span>Sex</span>
                        </th>
                        <th className="thm-bg-dark">
                          <span>Status</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {animalsUsingTag.map((a) => (
                        <tr key={a.id}>
                          <td className="thm-bg">
                            <span>{a.id}</span>
                          </td>
                          <td className="thm-bg">
                            <span>{a.category}</span>
                          </td>
                          <td className="thm-bg">
                            <span>{a.sex}</span>
                          </td>
                          <td className="thm-bg">
                            <span>{a.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer thm-bg-dark">
            <button className="btn btn-secondary" onClick={onClose}>
              Annulez
            </button>
            <button className="btn thm-bg-primary" onClick={handleSave}>
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTag;
