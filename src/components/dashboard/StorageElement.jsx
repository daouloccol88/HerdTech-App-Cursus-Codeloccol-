import React from "react";

const StorageElement = () => {
  return (
    <div className="thm-bg-light mt-4 thm-shadow-m  rounded-3 p-3">
      <div className="d-flex justify-content-between">
        <div>
          <span className="fw-bold">Status</span>
        </div>
        <div>
          <span>Status</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <span className="fw-bold">Condition</span>
        </div>
        <div>
          <span>Condition</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <span className="fw-bold">Power</span>
        </div>
        <div>
          <span>Power</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <span className="fw-bold">Door</span>
        </div>
        <div>
          <span>Door</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <span className="fw-bold">Temperature</span>
        </div>
        <div>
          <span>Temperature</span>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div>
          <span className="fw-bold">Humidity</span>
        </div>
        <div>
          <span>Humidity</span>
        </div>
      </div>
    </div>
  );
};

export default StorageElement;
