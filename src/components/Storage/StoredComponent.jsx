import React from "react";

const StoredComponent = ({ title, image, category }) => {
  return (
    <div className="thm-bg thm-shadow-m rounded-1 px-3 py-4 mt-4">
      <p className="fs-3">{title}</p>
      <div className="d-flex justify-content-between">
        <div>
          <p>Caméra de surveillance</p>
          <img src={image} alt="" height={125} />
          <p>Dernière mise à jour: 8 Dec @10:32</p>
        </div>
        <div>
          <p className="thm-text-primary fs-3">{category}</p>
          <div className="thm-bg-light thm-shadow-m px-2 rounded-3">
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-semibold">Status</span>
              </div>
              <div>
                <span className="ms-3">Status</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-semibold">Condition</span>
              </div>
              <div>
                <span className="ms-3">Condition</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-semibold">Power</span>
              </div>
              <div>
                <span className="ms-3">Power</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-semibold">Door</span>
              </div>
              <div>
                <span className="ms-3">Door</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-semibold">Temperature</span>
              </div>
              <div>
                <span className="ms-3">Temperature</span>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <span className="fw-semibold">Humidity</span>
              </div>
              <div>
                <span className="ms-3">Humidity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoredComponent;
