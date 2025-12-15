"use client";

import React, { useEffect, useState } from "react";

const LivestockPage = () => {
  const [animals, setAnimals] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [newAnimal, setNewAnimal] = useState({
    RFIDTag: "",
    category: "vache",
    sex: "male",
    birthDate: "",
    status: "sain",
  });

  // Load animals + tags for current user
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userId = currentUser?.id;
    setCurrentUserId(userId);

    const storedAnimals = JSON.parse(localStorage.getItem("animals")) || [];
    const storedTags = JSON.parse(localStorage.getItem("tags")) || [];

    setAnimals(storedAnimals.filter((a) => a.userId === userId));
    setTags(storedTags.filter((t) => t.userId === userId));
  }, []);

  // Save animals
  const saveAnimals = (updatedAnimals) => {
    setAnimals(updatedAnimals);

    const allAnimals = JSON.parse(localStorage.getItem("animals")) || [];
    const others = allAnimals.filter((a) => a.userId !== currentUserId);

    localStorage.setItem(
      "animals",
      JSON.stringify([...others, ...updatedAnimals])
    );
  };

  // Add animal
  const handleAddAnimal = () => {
    if (!newAnimal.RFIDTag) {
      alert("Please select an RFID tag");
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...newAnimal,
      userId: currentUserId,
    };

    saveAnimals([...animals, newEntry]);

    setNewAnimal({
      RFIDTag: "",
      category: "vache",
      sex: "male",
      birthDate: "",
      status: "sain",
    });

    document.getElementById("closeAddAnimalModal").click();
  };

  return (
    <div className="container ">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn thm-bg-primary fs-4 text-white thm-shadow-s"
          data-bs-toggle="modal"
          data-bs-target="#addAnimalModal"
        >
          + Ajoutez un Animal
        </button>
      </div>

      {/* ADD ANIMAL MODAL */}
      <div
        className="modal fade"
        id="addAnimalModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header thm-bg-dark">
              <h5 className="modal-title">Add New Animal</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body thm-bg">
              {/* RFID DROPDOWN */}
              <div className="mb-3">
                <label className="form-label">RFID Tag</label>
                <select
                  className="form-select"
                  value={newAnimal.RFIDTag}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, RFIDTag: e.target.value })
                  }
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
                  value={newAnimal.category}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, category: e.target.value })
                  }
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
                  value={newAnimal.sex}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, sex: e.target.value })
                  }
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
                  value={newAnimal.birthDate}
                  onChange={(e) =>
                    setNewAnimal({
                      ...newAnimal,
                      birthDate: e.target.value,
                    })
                  }
                />
              </div>

              {/* STATUS */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={newAnimal.status}
                  onChange={(e) =>
                    setNewAnimal({ ...newAnimal, status: e.target.value })
                  }
                >
                  <option>sain</option>
                  <option>malade</option>
                  <option>vendu</option>
                </select>
              </div>
            </div>

            <div className="modal-footer thm-bg-dark">
              <button
                id="closeAddAnimalModal"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleAddAnimal}>
                Save Animal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestockPage;
