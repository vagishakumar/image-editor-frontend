// // import { Stage, Layer, Image, Line } from "react-konva";
// // import useImage from "use-image";
// // import CanvasEditor from "../../Common/CanvasEditor"
// // const ImageCanvasEditor = ({
// //   lines,
// //   isErasing,
// //   uploadedMaskImgUrl,
// //   uploadedImageUrl,
// //   handleImageUpload,
// //   handleMouseDown,
// //   handleMouseMove,
// //   handleMouseUp,
// //   toggleEraser,
// //   handleErase,
// //   clearCanvas,
// //   extractImage,
// //   eraseObj,
// //   stageRef,
// // }) => {
// //   const [image] = useImage(uploadedImageUrl);
// //   const maskimg=uploadedMaskImgUrl;
// //   return (
// //     <div className="p-4 space-y-4">
// //       <input type="file" onChange={handleImageUpload} className="mb-2" />
// //       <div className="border rounded-lg">
// //         <Stage
// //           ref={stageRef}
// //           width={500}
// //           height={400}
// //           onMouseDown={handleMouseDown}
// //           onMouseMove={handleMouseMove}
// //           onMouseUp={handleMouseUp}
// //         >
// //           <Layer>
// //             {image && <Image image={image} width={500} height={400}  />}
// //             {lines.map((line, i) => (
// //               <Line
// //                 key={i}
// //                 points={line.points}
// //                 stroke="red"
// //                 strokeWidth={2}
// //                 onClick={() => handleErase(i)}
// //               />
// //             ))}
// //           </Layer>
// //         </Stage>
// //       </div>
// //       <div className="flex space-x-2">
// //         <button onClick={toggleEraser} className="bg-yellow-500 text-white p-2 rounded">
// //           {isErasing ? "Disable Eraser" : "Enable Eraser"}
// //         </button>
// //         <button onClick={clearCanvas} className="bg-gray-500 text-white p-2 rounded">
// //           Clear All
// //         </button>
// //         <button onClick={extractImage} className="bg-blue-500 text-white p-2 rounded">
// //           Extract Shape
// //         </button>
// //         <button
// //           onClick={eraseObj}
// //           disabled={!uploadedMaskImgUrl || !uploadedImageUrl}
// //           className="bg-blue-500 text-white p-2 rounded"
// //         >
// //           Erase Selected Image
// //         </button>
// //       </div>
// // {      console.log(uploadedMaskImgUrl)}
// //         {uploadedMaskImgUrl && <CanvasEditor imageSrc={maskimg} />}

// //     </div>
// //   );
// // };

// // export default ImageCanvasEditor;
// import React from "react";
// import { Stage, Layer, Image, Line } from "react-konva";
// import useImage from "use-image";
// import CanvasEditor from "../../Common/CanvasEditor";
// import "../CSS/ImageCanvasEditor.css"; 

// const ImageCanvasEditor = ({
//   lines,
//   isErasing,
//   uploadedMaskImgUrl,
//   uploadedImageUrl,
//   handleImageUpload,
//   handleMouseDown,
//   handleMouseMove,
//   handleMouseUp,
//   toggleEraser,
//   handleErase,
//   clearCanvas,
//   extractImage,
//   eraseObj,
//   stageRef,
// }) => {
//   const [image] = useImage(uploadedImageUrl);
//   const maskimg = uploadedMaskImgUrl;

//   return (
//     <div className="image-editor-container">
//       <input type="file" onChange={handleImageUpload} className="mb-2" />
//       <div className="canvas-container">
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
//       <div className="button-group">
//         <button onClick={toggleEraser} className="button button-yellow">
//           {isErasing ? "Disable Eraser" : "Enable Eraser"}
//         </button>
//         <button onClick={clearCanvas} className="button button-gray">
//           Clear All
//         </button>
//         <button onClick={extractImage} className="button button-blue">
//           Extract Shape
//         </button>
//         <button
//           onClick={eraseObj}
//           disabled={!uploadedMaskImgUrl || !uploadedImageUrl}
//           className="button button-blue"
//         >
//           Erase Selected Image
//         </button>
//       </div>
//       {uploadedMaskImgUrl && <CanvasEditor imageSrc={maskimg} />}
//     </div>
//   );
// };

// export default ImageCanvasEditor;
import React from "react";
import { Stage, Layer, Image, Line } from "react-konva";
import useImage from "use-image";
import CanvasEditor from "../../Common/CanvasEditor";
import Spinner from "../../Common/spinner";
import "../CSS/ImageCanvasEditor.css"; 
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
  removebg
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
          { image && <Image image={image} width={500} height={400} />}
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
        {/* <button onClick={toggleEraser} className="button button-yellow">
          {isErasing ? "Disable Eraser" : "Enable Eraser"}
        </button>
        <button onClick={clearCanvas} className="button button-gray">
          Clear All
        </button>
        <button onClick={extractImage} className="button button-blue">
          Extract Shape
        </button>
        <button
          onClick={eraseObj}
          disabled={!uploadedMaskImgUrl || !uploadedImageUrl}
          className="button button-blue"
        >
          Erase Selected Image
        </button> */}
        <div className="button-group">
  <Buttonvalue text={isErasing ? "Disable Eraser" : "Enable Eraser"} className="button-yellow" onClick={toggleEraser} />
  <Buttonvalue text="RemoveBg" className="button-yellow" onClick={removebg} />
  <Buttonvalue text="Clear All" className="button-gray" onClick={clearCanvas} />

  <Buttonvalue text="Extract Shape" className="button-blue" onClick={extractImage} />

  <Buttonvalue text="Erase Selected Image" className="button-blue" onClick={eraseObj} disabled={!uploadedMaskImgUrl || !uploadedImageUrl} />
</div>
      </div>

      {uploadedMaskImgUrl && <CanvasEditor loading={loading} imageSrc={maskimg} />}
    </div>
  );
};

export default ImageCanvasEditor;
