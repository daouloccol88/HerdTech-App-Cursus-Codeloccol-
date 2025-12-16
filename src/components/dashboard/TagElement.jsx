import React, { useEffect } from "react";

const TagElement = ({ tags, animals }) => {
  const countAnimalsForTag = (label) => {
    return animals.filter((a) => a.RFIDTag === label).length;
  };

  return (
    <div
      className="thm-bg-light mt-4 thm-shadow-m  rounded-3 p-3"
      style={{ height: "300px" }}
    >
      <p>Listes des Tags RFID configuré</p>
      {tags.map((tag) => (
        <div key={tag.id} className="d-flex">
          <div>
            <p>{tag.label}:</p>
          </div>
          <div>
            <p className="ms-2">{countAnimalsForTag(tag.label)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagElement;
