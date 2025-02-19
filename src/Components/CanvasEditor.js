// src/components/CanvasEditor.js
import React from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

const CanvasEditor = ({ imageSrc }) => {
  const [image] = useImage(imageSrc);

  return (
    <Stage width={500} height={500}>
      <Layer>{image && <KonvaImage image={image} x={50} y={50} />}</Layer>
    </Stage>
  );
};

export default CanvasEditor;
