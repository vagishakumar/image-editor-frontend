// import { useRef, useState } from "react";
// import { connect } from "react-redux";
// import { Stage, Layer, Image, Line } from "react-konva";
// import {
//   uploadImageAction,
//   uploadMaskImgAction,
//   eraseObjectAction,
// } from "../../redux/actions";

// const ImageCanvasEditor = ({
//   uploadImage,
//   uploadMaskImg,
//   uploadedMaskImgUrl,
//   uploadedImageUrl,
//   eraseObject,
// }) => {
//   const [image, setImage] = useState(null);
//   const [lines, setLines] = useState([]);
//   const [isErasing, setIsErasing] = useState(false);
//   const isDrawing = useRef(false);
//   const stageRef = useRef(null);

//   // Handle Image Upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     clearCanvas();
//     if (file) {
//       uploadImage(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         const img = new window.Image();
//         img.src = reader.result;
//         img.onload = () => setImage(img);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle Drawing
//   const handleMouseDown = (e) => {
//     if (isErasing) return; // Don't draw while erasing
//     isDrawing.current = true;
//     const pos = e.target.getStage().getPointerPosition();
//     setLines([...lines, { points: [pos.x, pos.y] }]);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDrawing.current || isErasing) return;
//     const stage = e.target.getStage();
//     const point = stage.getPointerPosition();
//     let lastLine = lines[lines.length - 1];
//     lastLine.points = [...lastLine.points, point.x, point.y];
//     setLines([...lines.slice(0, -1), lastLine]);
//   };

//   const handleMouseUp = () => {
//     isDrawing.current = false;
//   };

//   // Toggle Eraser Mode
//   const toggleEraser = () => {
//     setIsErasing(!isErasing);
//   };

//   // Erase a Line by Clicking
//   const handleErase = (index) => {
//     if (isErasing) {
//       setLines(lines.filter((_, i) => i !== index));
//     }
//   };

//   // Clear All Drawings
//   const clearCanvas = () => {
//     setLines([]);
//   };

//   // Extract the image inside the drawn shape
//   const extractImage = () => {
//     if (!image || lines.length === 0) return;

//     const stage = stageRef.current;
//     const originalCanvas = stage.toCanvas();

//     // Create a new canvas with transparency
//     const croppedCanvas = document.createElement("canvas");
//     croppedCanvas.width = originalCanvas.width;
//     croppedCanvas.height = originalCanvas.height;
//     const ctx = croppedCanvas.getContext("2d");

//     // Draw the mask
//     ctx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
//     ctx.beginPath();

//     // Use the first drawn line as the shape boundary
//     const shape = lines[0].points;
//     ctx.moveTo(shape[0], shape[1]);
//     for (let i = 2; i < shape.length; i += 2) {
//       ctx.lineTo(shape[i], shape[i + 1]);
//     }
//     ctx.closePath();
//     ctx.clip(); // Clip to the drawn shape

//     // Draw the image within the clipped region
//     ctx.drawImage(image, 0, 0, croppedCanvas.width, croppedCanvas.height);

//     croppedCanvas.toBlob(async (blob) => {
//       if (!blob) return;

//       // Convert Blob to File
//       const file = new File([blob], "cropped-image.png", { type: "image/png" });

//       // Send file to API
//       // const formData = new FormData();
//       // formData.append("file", file);

//       uploadMaskImg(file);
//     }, "image/png");

//     // Convert to image and download
//     // const croppedImageURL = croppedCanvas.toDataURL("image/png");
//     // const link = document.createElement("a");
//     // link.href = croppedImageURL;
//     // link.download = "cropped_shape.png";
//     // link.click();
//   };

//   const eraseObj = () => {
//     console.log("erase obj called", uploadedMaskImgUrl, uploadedImageUrl);
//     eraseObject(uploadedMaskImgUrl.imageUrl, uploadedImageUrl.imageUrl);
//   };

//   return (
//     <div className="p-4 space-y-4">
//       <input type="file" onChange={handleImageUpload} className="mb-2" />
//       <div className="border rounded-lg">
//         <Stage
//           ref={stageRef}
//           width={500}
//           height={400}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//         >
//           <Layer>
//             {image && <Image image={image} width={500} height={400} />}
//             {lines.map((line, i) => (
//               <Line
//                 key={i}
//                 points={line.points}
//                 stroke="red"
//                 strokeWidth={2}
//                 onClick={() => handleErase(i)}
//               />
//             ))}
//           </Layer>
//         </Stage>
//       </div>
//       <div className="flex space-x-2">
//         <button
//           onClick={toggleEraser}
//           className="bg-yellow-500 text-white p-2 rounded"
//         >
//           {isErasing ? "Disable Eraser" : "Enable Eraser"}
//         </button>
//         <button
//           onClick={clearCanvas}
//           className="bg-gray-500 text-white p-2 rounded"
//         >
//           Clear All
//         </button>
//         <button
//           onClick={extractImage}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Extract Shape
//         </button>
//         <button
//           onClick={eraseObj}
//           disabled={!uploadedMaskImgUrl || !uploadedImageUrl}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Erase Selected Image
//         </button>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     data: state.data,
//     uploadedMaskImgUrl: state.data.uploadMaskImgUrl,
//     uploadedImageUrl: state.data.uploadImageUrl,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   uploadImage: (imageFile) => dispatch(uploadImageAction(imageFile)),
//   uploadMaskImg: (imageFile) => dispatch(uploadMaskImgAction(imageFile)),
//   eraseObject: (imageUrl, maskUrl) =>
//     dispatch(eraseObjectAction(imageUrl, maskUrl)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ImageCanvasEditor);
import { useRef, useState } from "react";

import ImageCanvasEditor from "../components/ImageCanvasEditor"; 
const MaskImage = ({ uploadImageAction, uploadMaskImg, uploadedMaskImgUrl, uploadedImageUrl, eraseObject,loading ,isloading,removeBackgroundAction}) => {
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
      console.log("hi")
      uploadImageAction(file);
      console.log("bye")

      // const reader = new FileReader();
      // reader.onload = () => {
      //   const img = new window.Image();
      //   img.src = reader.result;
      //   img.onload = () => setImage(img);
      // };
      // reader.readAsDataURL(file);
    }
  };

  // Handle Drawing
  const handleMouseDown = (e) => {
    if (isErasing) return;
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

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const handleErase = (index) => {
    if (isErasing) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  const clearCanvas = () => {
    setLines([]);
  };

//   const extractImage = () => {
//     if (!uploadedImageUrl || lines.length === 0) return;

//     const stage = stageRef.current;
//     const originalCanvas = stage.toCanvas();

//     const croppedCanvas = document.createElement("canvas");
//     croppedCanvas.width = originalCanvas.width;
//     croppedCanvas.height = originalCanvas.height;
//     const ctx = croppedCanvas.getContext("2d");

//     ctx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
//     ctx.beginPath();

//     const shape = lines[0].points;
//     ctx.moveTo(shape[0], shape[1]);
//     for (let i = 2; i < shape.length; i += 2) {
//       ctx.lineTo(shape[i], shape[i + 1]);
//     }
//     ctx.closePath();
//     ctx.clip();

//     ctx.drawImage(image, 0, 0, croppedCanvas.width, croppedCanvas.height);

//     croppedCanvas.toBlob(async (blob) => {
//       if (!blob) return;
//       const file = new File([blob], "cropped-image.png", { type: "image/png" });
//       uploadMaskImg(file);
//       // Send file to API
// //       // const formData = new FormData();
// //       // formData.append("file", file);
//     }, "image/png");
// const extractImage = async () => {
//     if (!uploadedImageUrl || lines.length === 0) return;

//     // Load image from URL
//     const image = await loadImage(uploadedImageUrl);
    
//     // Get canvas reference
//     const stage = stageRef.current;
//     const originalCanvas = stage.toCanvas();

//     // Create a new canvas for cropped image
//     const croppedCanvas = document.createElement("canvas");
//     croppedCanvas.width = originalCanvas.width;
//     croppedCanvas.height = originalCanvas.height;
//     const ctx = croppedCanvas.getContext("2d");

//     // Clear and clip the shape
//     ctx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
//     ctx.beginPath();

//     const shape = lines[0].points;
//     ctx.moveTo(shape[0], shape[1]);
//     for (let i = 2; i < shape.length; i += 2) {
//       ctx.lineTo(shape[i], shape[i + 1]);
//     }
//     ctx.closePath();
//     ctx.clip();

//     // Draw the image from URL onto the canvas
//     ctx.drawImage(image, 0, 0, croppedCanvas.width, croppedCanvas.height);

//     // Convert cropped canvas to blob and upload
//     croppedCanvas.toBlob(async (blob) => {
//       if (!blob) return;
      
//       const file = new File([blob], "cropped-image.png", { type: "image/png" });
//       uploadMaskImg(file);  // Upload or handle the cropped file

//     }, "image/png");
// };
// };
const loadImage = (src) => {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
  });
};

const extractImage = async () => {
  if (!uploadedImageUrl || lines.length === 0) return;

  const image = await loadImage(uploadedImageUrl);
  
  const stage = stageRef.current;
  const originalCanvas = stage.toCanvas();

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = originalCanvas.width;
  croppedCanvas.height = originalCanvas.height;
  const ctx = croppedCanvas.getContext("2d");

  ctx.clearRect(0, 0, croppedCanvas.width, croppedCanvas.height);
  ctx.beginPath();

  const shape = lines[0].points;
  ctx.moveTo(shape[0], shape[1]);
  for (let i = 2; i < shape.length; i += 2) {
    ctx.lineTo(shape[i], shape[i + 1]);
  }
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(image, 0, 0, croppedCanvas.width, croppedCanvas.height);

  
  croppedCanvas.toBlob(async (blob) => {
    if (!blob) return;
    
    const file = new File([blob], "cropped-image.png", { type: "image/png" });
    uploadMaskImg(file);  

  }, "image/png");
};

    // Convert to image and download
//     // const croppedImageURL = croppedCanvas.toDataURL("image/png");
//     // const link = document.createElement("a");
//     // link.href = croppedImageURL;
//     // link.download = "cropped_shape.png";
//     // link.click();
console.log('maskimg',uploadedMaskImgUrl)
  const eraseObj = () => {
    console.log("erase obj called", uploadedMaskImgUrl, uploadedImageUrl);
    eraseObject(uploadedMaskImgUrl, uploadedImageUrl);
  };
  const removebg = () => {
    console.log('removebg',uploadedImageUrl)
    if (!uploadedImageUrl) return;
    removeBackgroundAction(uploadedImageUrl);
  };
  // {console.log("hi",uploadedImageUrl)}
  return (
    <ImageCanvasEditor
      // image={image}
      removebg={removebg}
      lines={lines}
      isErasing={isErasing}
      uploadedMaskImgUrl={uploadedMaskImgUrl}
      uploadedImageUrl={uploadedImageUrl}
      handleImageUpload={handleImageUpload}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
      toggleEraser={toggleEraser}
      handleErase={handleErase}
      clearCanvas={clearCanvas}
      extractImage={extractImage}
      eraseObj={eraseObj}
      stageRef={stageRef}
      loading={loading}
      isloading={isloading}
    />
  );
};

// const mapStateToProps = (state) => ({
//   uploadedMaskImgUrl: state.data.uploadMaskImgUrl,
//   uploadedImageUrl: state.data.uploadImageUrl,
// });

// const mapDispatchToProps = (dispatch) => ({
//   uploadImage: (imageFile) => dispatch(uploadImageAction(imageFile)),
//   uploadMaskImg: (imageFile) => dispatch(uploadMaskImgAction(imageFile)),
//   eraseObject: (imageUrl, maskUrl) => dispatch(eraseObjectAction(imageUrl, maskUrl)),
// });

export default MaskImage;
