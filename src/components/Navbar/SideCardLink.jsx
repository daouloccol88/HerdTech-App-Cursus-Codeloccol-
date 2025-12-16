import React from "react";

const SideCardLink = ({ svg, title }) => {
  return (
    <div
      className="card thm-shadow-s thm-bg-light nav-card-link"
      style={{ border: "0" }}
    >
      <div className="card-body">
        <div className="d-flex ">
          <p className="text-center">{svg}</p>
          <div>
            <p className="text-center fw-bold text-nowrap ms-4">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCardLink;
