// // src/components/CanvasEditor.js
// import React from "react";
// import { Stage, Layer, Image as KonvaImage } from "react-konva";
// import useImage from "use-image";

// const CanvasEditor = ({ imageSrc }) => {
//   console.log(imageSrc)
//   const [image] = useImage(imageSrc);
// console.log(image)
//   return (
//     <Stage width={700} height={700}>
//       <Layer>{image && <KonvaImage image={image} x={50} y={50} />}</Layer>
//     </Stage>
//   );
// };

// export default CanvasEditor;
// src/components/CanvasEditor.js
// import React from "react";
// import { Stage, Layer, Image as KonvaImage } from "react-konva";
// import useImage from "use-image";
// import "./CSS/CanvasEditor.css"; 
// import Spinner from "./spinner";
// const CanvasEditor = ({ imageSrc,loading }) => {
//   console.log(imageSrc);
//   const [image] = useImage(imageSrc);
//   console.log(image);

//   return (
//     <div className="canvas-editor-container">
//       {loading && (
//               <div className="spinner-overlay">
//                 <Spinner />
//               </div>
//             )}
//       <Stage width={700} height={700} className="canvas-stage">
//         <Layer>{image && <KonvaImage image={image} x={50} y={50} />}</Layer>
//       </Stage>
//     </div>
//   );
// };

// export default CanvasEditor;
import React from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";
import "./CSS/CanvasEditor.css"; 
import Spinner from "./spinner";

const CanvasEditor = ({ imageSrc }) => {
  const [image, status] = useImage(imageSrc); 

  return (
    <div className="canvas-editor-container">
      {status === "loading" && (
        <div className="spinner-overlay">
          <Spinner />
        </div>
      )}

      <Stage width={500} height={400} >
        <Layer>
          {status === "loaded" && <KonvaImage image={image} width={500} height={400}  />}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasEditor;
