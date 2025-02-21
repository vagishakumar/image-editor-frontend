import React from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import useImage from "use-image";
import CanvasEditor from "../../Common/CanvasEditor";
import Spinner from "../../Common/spinner";
import Buttonvalue from "../../Common/Buttonvalue";

const ImageCanvasEditor = ({
  lines,
  isErasing,
  uploadedMaskImgUrl,
  uploadedImageUrl,
  handleImageUpload,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  toggleEraser,
  handleErase,
  clearCanvas,
  extractImage,
  eraseObj,
  stageRef,
  loading,
  isloading,
  removebg,
}) => {
  const [image] = useImage(uploadedImageUrl);
  const maskimg = uploadedMaskImgUrl;

  return (
    <div className="image-editor-container">
      <input type="file" onChange={handleImageUpload} className="mb-2" />

      <div className="canvas-container">
        {isloading && (
          <div className="spinner-overlay">
            <Spinner />
          </div>
        )}
        <Stage
          ref={stageRef}
          width={500}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {image && <Image image={image} width={500} height={400} />}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="red"
                strokeWidth={2}
                onClick={() => handleErase(i)}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <div className="button-group">
        
        <div className="button-group">
          <Buttonvalue
            text={isErasing ? "Disable Eraser" : "Enable Eraser"}
            className="button-yellow"
            onClick={toggleEraser}
          />
          <Buttonvalue
            text="RemoveBg"
            className="button-yellow"
            onClick={removebg}
          />
          <Buttonvalue
            text="Clear All"
            className="button-gray"
            onClick={clearCanvas}
          />

          <Buttonvalue
            text="Extract Shape"
            className="button-blue"
            onClick={extractImage}
          />

          <Buttonvalue
            text="Erase Selected Image"
            className="button-blue"
            onClick={eraseObj}
            disabled={!uploadedMaskImgUrl || !uploadedImageUrl}
          />
        </div>
      </div>

      {uploadedMaskImgUrl && (
        <CanvasEditor loading={loading} imageSrc={maskimg} />
      )}
    </div>
  );
};

export default ImageCanvasEditor;
