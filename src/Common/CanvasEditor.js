
import React from "react";
import "./CSS/CanvasEditor.css"; 
import "./CSS/spinner.css";

const CanvasEditor = ({ imageSrc }) => {
  if(imageSrc.length===0)return null;
  return (
    <div className="canvas-editor-container">
      <div className="image-grid">
        {imageSrc.map((imgObj, index) => (
          <ImageBlock key={index} src={imgObj.url} download={imgObj.download}/>
        ))}
      </div>
    </div>
  );
};


// Component for each image inside a fixed box
const ImageBlock = ({ src ,download}) => {
  const handleDownload = () => {
    window.open(download, "_blank");
  };
  return (
    <div className="image-block">
      <div className="image-box">
        <img src={src} alt="Uploaded" className="image" />
        
        <div className="button-group-2">
          <button className="button-1" onClick={handleDownload}>Download</button>
          <button className="button-1 ">replace</button>
        </div>
      </div>
    </div>
  );
};

export default CanvasEditor;

