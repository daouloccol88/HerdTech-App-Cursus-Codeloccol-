import React from "react";

const NavCardLink = ({ svg, title }) => {
  return (
    <div
      className="card thm-shadow-s thm-bg-light nav-card-link"
      style={{ border: "0", height: "100px" }}
    >
      <div className="card-body">
        <div className="d-flex flex-column">
          <p className="text-center">{svg}</p>
          <div>
            <p className="text-center fw-bold text-nowrap">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCardLink;
