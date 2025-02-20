import { useRef, useState } from "react";
import { connect } from "react-redux";
import { Stage, Layer, Image, Line } from "react-konva";
import {
  uploadImageAction,
  uploadMaskImgAction,
  eraseObjectAction,
} from "../redux/actions";

const ImageCanvasEditor = ({
  uploadImage,
  uploadMaskImg,
  uploadedMaskImgUrl,
  uploadedImageUrl,
  eraseObject,
}) => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [isErasing, setIsErasing] = useState(false);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    clearCanvas();
    if (file) {
      uploadImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result;
        img.onload = () => setImage(img);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Drawing
  const handleMouseDown = (e) => {
    if (isErasing) return; // Don't draw while erasing
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current || isErasing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    setLines([...lines.slice(0, -1), lastLine]);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  // Toggle Eraser Mode
  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  // Erase a Line by Clicking
  const handleErase = (index) => {
    if (isErasing) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  // Clear All Drawings
  const clearCanvas = () => {
    setLines([]);
  };

  // Extract the image inside the drawn shape
  const extractImage = () => {
    if (!image || lines.length === 0) return;

    const stage = stageRef.current;
    const originalCanvas = stage.toCanvas();

    // Create a new canvas with transparency
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = originalCanvas.width;
    croppedCanvas.height = originalCanvas.height;
    const ctx = croppedCanvas.getContext("2d");

    // Draw the mask
    ctx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
    ctx.beginPath();

    // Use the first drawn line as the shape boundary
    const shape = lines[0].points;
    ctx.moveTo(shape[0], shape[1]);
    for (let i = 2; i < shape.length; i += 2) {
      ctx.lineTo(shape[i], shape[i + 1]);
    }
    ctx.closePath();
    ctx.clip(); // Clip to the drawn shape

    // Draw the image within the clipped region
    ctx.drawImage(image, 0, 0, croppedCanvas.width, croppedCanvas.height);

    croppedCanvas.toBlob(async (blob) => {
      if (!blob) return;

      // Convert Blob to File
      const file = new File([blob], "cropped-image.png", { type: "image/png" });

      // Send file to API
      // const formData = new FormData();
      // formData.append("file", file);

      uploadMaskImg(file);
    }, "image/png");

    // Convert to image and download
    // const croppedImageURL = croppedCanvas.toDataURL("image/png");
    // const link = document.createElement("a");
    // link.href = croppedImageURL;
    // link.download = "cropped_shape.png";
    // link.click();
  };

  const eraseObj = () => {
    console.log("erase obj called", uploadedMaskImgUrl, uploadedImageUrl);
    eraseObject(uploadedMaskImgUrl.imageUrl, uploadedImageUrl.imageUrl);
  };

  return (
    <div className="p-4 space-y-4">
      <input type="file" onChange={handleImageUpload} className="mb-2" />
      <div className="border rounded-lg">
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
      <div className="flex space-x-2">
        <button
          onClick={toggleEraser}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          {isErasing ? "Disable Eraser" : "Enable Eraser"}
        </button>
        <button
          onClick={clearCanvas}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Clear All
        </button>
        <button
          onClick={extractImage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Extract Shape
        </button>
        <button
          onClick={eraseObj}
          disabled={!uploadedMaskImgUrl || !uploadedImageUrl}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Erase Selected Image
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    uploadedMaskImgUrl: state.data.uploadMaskImgUrl,
    uploadedImageUrl: state.data.uploadImageUrl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadImage: (imageFile) => dispatch(uploadImageAction(imageFile)),
  uploadMaskImg: (imageFile) => dispatch(uploadMaskImgAction(imageFile)),
  eraseObject: (imageUrl, maskUrl) =>
    dispatch(eraseObjectAction(imageUrl, maskUrl)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageCanvasEditor);
