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

  const extractImage = () => {
    if (!image || lines.length === 0 || !stageRef.current) return;

    const stage = stageRef.current;
    const originalCanvas = stage.toCanvas();

    // Get the original image dimensions
    const originalWidth = image.naturalWidth;
    const originalHeight = image.naturalHeight;

    // Maintain aspect ratio while fitting inside the stage (500x400)
    let maskWidth = 500;
    let maskHeight = (originalHeight / originalWidth) * 500;

    if (maskHeight > 400) {
      maskHeight = 400;
      maskWidth = (originalWidth / originalHeight) * 400;
    }

    // Create a new canvas for the mask with correct aspect ratio
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = maskWidth;
    maskCanvas.height = maskHeight;
    const maskCtx = maskCanvas.getContext("2d");

    // Fill entire mask canvas with black (0,0,0) - Keeps everything unchanged
    maskCtx.fillStyle = "black";
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    // Draw the user-defined shape in white (255,255,255) - Marks the area to be removed
    maskCtx.fillStyle = "white";
    maskCtx.beginPath();

    lines.forEach((line) => {
      const points = line.points;
      if (points.length < 4) return; // Skip invalid lines

      // Scale points to match the mask canvas size
      maskCtx.moveTo(
        (points[0] / 500) * maskCanvas.width,
        (points[1] / 400) * maskCanvas.height
      );

      for (let i = 2; i < points.length; i += 2) {
        maskCtx.lineTo(
          (points[i] / 500) * maskCanvas.width,
          (points[i + 1] / 400) * maskCanvas.height
        );
      }
      maskCtx.closePath();
    });

    maskCtx.fill(); // Fill the shape with white (removal area)

    // Convert the mask to a Blob and upload
    maskCanvas.toBlob((blob) => {
      if (!blob) return;

      const file = new File([blob], "mask-image.png", { type: "image/png" });

      // Upload or process the mask file
      uploadMaskImg(file);
    }, "image/png");
  };

  const eraseObj = () => {
    console.log("erase obj called", uploadedMaskImgUrl, uploadedImageUrl);
    eraseObject({
      maskUrl: uploadedMaskImgUrl.imageUrl,
      imageUrl: uploadedImageUrl.imageUrl,
    });
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
  eraseObject: (data) => dispatch(eraseObjectAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageCanvasEditor);
