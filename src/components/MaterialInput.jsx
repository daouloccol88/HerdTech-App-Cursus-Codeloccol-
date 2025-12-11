import React from "react";

const MaterialInput = ({ value, onChange, placeholder, type, width }) => {
  return (
    <div>
      <div className="outlined-input bg-primary">
        <input
          type={type}
          name={placeholder}
          placeholder=""
          value={value}
          onChange={onChange}
          style={{ width: width }}
        />
        <label htmlFor="test">{placeholder}</label>
      </div>
    </div>
  );
};

export default MaterialInput;
