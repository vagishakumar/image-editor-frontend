
import React from "react";
import "../pages/erasespinner.css"
import Buttonvalue from "../../Common/Buttonvalue";

const EraseButton = ({ eraseObj,isUploaded,isExtracted }) => {

const Spinnererase = () => {
  return (
    <div className="loading loading--full-height"></div>
  );
};

  return (
    // <div> 
    <>
      <Buttonvalue
      onClick={eraseObj}
        disabled={!isUploaded }
        text="Erase Selected Image"
      />
        
        </>

     
  );
};

export default EraseButton;
