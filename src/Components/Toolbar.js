// src/components/Toolbar.js
import React from "react";

const Toolbar = ({ onUpload, onResize }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <input type="file" accept="image/*" onChange={onUpload} />
      <button onClick={onResize}>Resize Image</button>
    </div>
  );
};

export default Toolbar;
