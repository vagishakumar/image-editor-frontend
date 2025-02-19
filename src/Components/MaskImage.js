// src/components/CanvasEditor.js
import React, { useState, useRef, useMemo } from "react";
import { Stage, Layer, Image as KonvaImage, Line } from "react-konva";
import useImage from "use-image";

const CanvasEditor = ({ imageSrc }) => {
  // Load the image from the provided URL
  const [image] = useImage(imageSrc);

  // Keep an array of lines drawn by the user
  const [lines, setLines] = useState([]);
  // Using a ref to track drawing status without causing re-renders
  const isDrawing = useRef(false);

  // Refs to access Konva nodes for compositing later
  const stageRef = useRef(null);
  const imageLayerRef = useRef(null);
  const drawingLayerRef = useRef(null);
  const outputRef = useRef(null);

  // Calculate the scale factor to fit the image in a 500x500 area.
  const scale = useMemo(() => {
    if (!image) return 1;
    // Calculate scaling factor to fit within 500x500 while preserving aspect ratio
    const scaleX = 500 / image.width;
    const scaleY = 500 / image.height;
    return Math.min(scaleX, scaleY);
  }, [image]);

  // Mouse down: start a new line
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    setLines((prevLines) => [...prevLines, { points: [pos.x, pos.y] }]);
  };

  // Mouse move: update the current line with new points
  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    // Update the last line with new point
    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      return [...prevLines.slice(0, prevLines.length - 1), lastLine];
    });
  };

  // Mouse up: finish drawing
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // When Apply Mask is clicked, composite the image and the mask strokes.
  const applyMask = () => {
    // Access the underlying canvas elements of each layer
    const imageCanvas = imageLayerRef.current.getCanvas()._canvas;
    const maskCanvas = drawingLayerRef.current.getCanvas()._canvas;
    const width = imageCanvas.width;
    const height = imageCanvas.height;

    // Create an offscreen canvas to do the compositing
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = width;
    outputCanvas.height = height;
    const ctx = outputCanvas.getContext("2d");

    // Draw the image from the image layer first
    ctx.drawImage(imageCanvas, 0, 0);
    // Use destination-in to keep only the pixels where the mask is drawn
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(maskCanvas, 0, 0);
    // Reset the composite operation
    ctx.globalCompositeOperation = "source-over";

    // Show the composited result by appending the offscreen canvas to the DOM
    if (outputRef.current) {
      outputRef.current.innerHTML = "";
      outputRef.current.appendChild(outputCanvas);
    }
  };

  return (
    <div>
      <h2>Draw a Mask over the Image (Konva)</h2>
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
        style={{ border: "1px solid grey" }}
      >
        {/* Layer for the image */}
        <Layer ref={imageLayerRef}>
          {image && (
            <KonvaImage
              image={image}
              x={0}
              y={0}
              // Scale the image to fit within 500x500
              scale={{ x: scale, y: scale }}
            />
          )}
        </Layer>
        {/* Layer for the user's drawing (mask) */}
        <Layer ref={drawingLayerRef}>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={20}
              lineCap="round"
              lineJoin="round"
              opacity={1}
            />
          ))}
        </Layer>
      </Stage>
      <br />
      <button onClick={applyMask}>Apply Mask</button>
      <div ref={outputRef} style={{ marginTop: "20px" }} />
    </div>
  );
};

export default CanvasEditor;
