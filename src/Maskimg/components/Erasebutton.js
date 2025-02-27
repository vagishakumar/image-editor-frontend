import React from "react";
import "../pages/erasespinner.css";

const EraseButton = ({ eraseObj, uploadedMaskImgUrl, isLoading }) => {
  const isDisabled = !uploadedMaskImgUrl;

  const Spinnererase = () => {
    return (
      // <div className="loading-area">
      <div className="loading loading--full-height"></div>
      // </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className={`button button-blue transition-opacity ${
          isDisabled ? "cursor-not-allowed opacity-50 hover:opacity-60" : ""
        }`}
        onClick={eraseObj}
        disabled={isDisabled}
      >
        Erase Selected Image
      </button>

      {isLoading && Spinnererase()}
    </div>
  );
};

export default EraseButton;
