import { useRef, useState } from "react";
import { connect } from "react-redux";
import { Stage, Layer, Image, Line } from "react-konva";
import { uploadImageAction,uploadMaskImgAction,eraseObjectAction,removeBackgroundAction,generateImgAction,modifyImgAction, emptyMask, setUploadedImgUrl } from "../actions";
import { useEffect } from "react";
import Buttonvalue from "../../Common/Buttonvalue";

import "./ImageCanvasEditor.css";
import CanvasEditor from "../../Common/CanvasEditor";
import EraseButton from "../components/Erasebutton";

const ImageCanvasEditor = ({
  uploadedMaskImgUrl,
  emptyMaskImg,
  uploadImage,
  uploadMaskImg,
  eraseObject,
  removeBackground,
  generateImg,
  modifyImg,
  uploadImgUrl,
  Lists,
  generatedurl,
  uploadnewImg
}) => {
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [isErasing, setIsErasing] = useState(false);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false); 
  const [isExtracting, setIsExtracting] = useState(false); 
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
const textRef=useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    clearCanvas();
    if(!file) return;
    
      setIsUploading(false); 
      uploadImage(file).then(() => setIsUploading(true));
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.src = reader.result;
        img.onload = () => setImage(img);
      };
      reader.readAsDataURL(file);
    
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

  // const lastItem = historyLists[historyLists.length - 1]; // Traditional way
  const removebg = () => {
    // console.log("removebg", uploadedImageUrl);
    if (!uploadImgUrl) return;
console.log(uploadImgUrl)
    removeBackground(uploadImgUrl);
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

    // const stage = stageRef.current;
    // const originalCanvas = stage.toCanvas();

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
    
      
      uploadMaskImg(file).then(() => setIsExtracting(false));
    }, "image/png");
  };
console.log("first",uploadedMaskImgUrl)
  const eraseObj = () => {
    console.log(uploadImgUrl)
    console.log("mask",uploadedMaskImgUrl)
    // console.log("erase obj called", uploadedMaskImgUrl, uploadedImageUrl);
    eraseObject({
      maskUrl: uploadedMaskImgUrl,
      imageUrl:uploadImgUrl,
    });
  };
  // const sortedimages = combinedimages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  // const handleReplace = (imageId) => {
    //    console.log("Replacing image with ID:", imageId);
//   const selectedImage = Lists.find(img => img.id === imageId);

//   if (selectedImage) {
//     // console.log("Selected Image URL:", selectedImage.url);
//     setSelectedImageUrl(selectedImage.url);
//     emptyMaskImg()
//     clearCanvas();

//     const img = new window.Image();
//     img.src = selectedImage.url;
//     img.onload = () => setImage(img);
//   }
// };
useEffect(() => {
  if (generatedurl) {
    console.log("Generated Image URL updated:", generatedurl);
    uploadnewImg(generatedurl)
    const img = new window.Image();

    img.src = generatedurl;

    img.onload = () => {
      clearCanvas();
      setImage(img);
      setIsUploading(true); 
    };
  }
}, [generatedurl]);
const handleReplace = (imageId) => {
  console.log("Replacing image with ID:", imageId);
  const selectedImage = Lists.find(img => img.id === imageId);

  if (selectedImage) {
    setSelectedImageUrl(selectedImage.url);
     uploadnewImg(selectedImage.url)
    emptyMaskImg();
    clearCanvas();
  }
};
useEffect(() => {
  if (selectedImageUrl) {
    console.log("Selected Image URL updated:", selectedImageUrl);
    const img = new window.Image();
    img.src = selectedImageUrl;

    img.onload = () => {
      clearCanvas();
      setImage(img);
    };
  }
}, [selectedImageUrl]); 

const generateImage = () => {
  console.log("firstenerate")
  generateImg(textRef.current.value).then(() => setIsUploading(true)); 
};

const modifyImage = () => {
  modifyImg({
    maskUrl: uploadedMaskImgUrl,
    imageUrl: uploadImgUrl,
    prompt: textRef.current.value,
  });
};
console.log(Lists)

  return (
    <div className="p-4 space-y-4 image-editor-container">
      <h1>AI Image Edior</h1>
      <div>
        <input type="file" onChange={handleImageUpload} className="mb-2" />
        <span>OR</span>
        <p>Write a prompt to Genrate one!</p>
        <input
          ref={textRef}
          type="text"
        />
        <button  onClick={generateImage}>
          Generate
        </button>
      </div>

      {/* <input type="file" onChange={handleImageUpload} className="mb-2" /> */}
      <div className="border rounded-lg canvas-container">
        
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
        <Buttonvalue
          text="Clear All"
          className="button-gray"
          onClick={clearCanvas}
          
        />
        <Buttonvalue
          text={isErasing ? "Disable Eraser" : "Enable Eraser"}
          className="button-yellow"
          onClick={toggleEraser}
        />
        <Buttonvalue
          text="Extract Shape" 
          className="button-yellow"
          onClick={()=>{ setIsExtracting(true);extractImage();}}
          disabled={!isUploading}  />
          {/* text="Extract Shape"
          className="button-yellow"
          onClick={extractImage}
          disabled={!isUploading}  */}
        
        <Buttonvalue
          text="RemoveBg"
          className="button-blue"
          onClick={removebg}
          disabled={!isUploading}
        />
        <Buttonvalue
          text="Modify"
          className="button-blue"
          onClick={modifyImage}
          disabled={!isUploading}
        />
        {/* {console.log("isExtracting",isExtracting)} */}
        <EraseButton eraseObj={eraseObj} isUploaded={isUploading} isExtracted={isExtracting}  />
      </div>      
      {Lists && <CanvasEditor imageSrc={Lists} onReplace={handleReplace}/>}      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    uploadedMaskImgUrl: state.maskImg.uploadMaskImgUrl,
    uploadImgUrl:state.uploadImg.url,
    Lists:state.List.historyList,
    generatedurl:state.generateimg.url
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadnewImg:(imageUrl)=>dispatch(setUploadedImgUrl(imageUrl)),
  emptyMaskImg:()=>dispatch(emptyMask()),
  uploadImage: (imageFile) => dispatch(uploadImageAction(imageFile)),
  uploadMaskImg: (imageFile) => dispatch(uploadMaskImgAction(imageFile)),
  eraseObject: (data) => dispatch(eraseObjectAction(data)),
  removeBackground: (imageUrl) => dispatch(removeBackgroundAction(imageUrl)),
  generateImg: (prompt) => dispatch(generateImgAction(prompt)),
  modifyImg: (prompt) => dispatch(modifyImgAction(prompt)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageCanvasEditor);
