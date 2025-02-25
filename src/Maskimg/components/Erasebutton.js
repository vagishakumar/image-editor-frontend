
import React from "react";
import "../pages/erasespinner.css"

const EraseButton = ({ eraseObj,isUploaded,isExtracted }) => {

const Spinnererase = () => {
  return (
    <div className="loading loading--full-height"></div>
  );
};

  return (
    <div className="flex items-center gap-2"> 
      <button
className="button button-blue" onClick={eraseObj}
        disabled={!isUploaded }
      >
        Erase Selected Image
      </button>

      {isExtracted && Spinnererase() }
    </div>
  );
};

export default EraseButton;
