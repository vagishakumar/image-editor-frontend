import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import { Stage, Layer, Image, Line } from "react-konva";
import { Wand2, Scissors,Expand,ImageUpscale , Eraser, Edit3 } from "lucide-react";
import {
  uploadImageAction,
  uploadMaskImgAction,
  eraseObjectAction,
  removeBackgroundAction,
  generateImgAction,
  modifyImgAction,
  emptyMask,
  setUploadedImgUrl,
  increaseResolution,
  removeForeground,
  blurBg,
  backgroundgeneration,
  expandImg
} from "../actions";
import { useEffect } from "react";
import Buttonvalue from "../../Common/Buttonvalue";
import "./Editor.css";
import CanvasEditor from "../../Common/CanvasEditor";

const Editor = ({
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
  uploadnewImg,
  incResoln,
  removeFg,
  bgblur,
  bgGenerate,
  expandimage,
}) => {
  const [activeItem, setActiveItem] = useState("Generate");
  const [image, setImage] = useState(null);
  const [lines, setLines] = useState([]);
  const [isErasing, setIsErasing] = useState(false);
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const textRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracting, setIsExtracting] = useState(true);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [width, setWidth] = useState(0);
const [height, setHeight] = useState(0);
const [imageWidth, setImageWidth] = useState(0);
const [imageHeight, setImageHeight] = useState(0);

  const menuItems = [
    { name: "Generate", icon: <Wand2 size={24} color="black" /> },
    { name: "Background", icon: <Scissors size={24} color="black" /> },
    { name: "Modify", icon: <Edit3 size={24} color="black" /> },
    { name: "Eraseobj", icon: <Eraser size={24} color="black" /> },
    { name: "Enhance", icon: <ImageUpscale  size={24} color="black" /> },
    { name: "Foreground", icon: <Scissors  size={24} color="black" /> },
    { name: "Expand", icon: <Expand   size={24} color="black" /> },
  ];
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setIsLoading(true);
  setIsFileUploading(false);
  uploadImage(file)
  .then(() => {
    setIsUploading(true);
    setIsFileUploading(true);
    setIsLoading(false);
  })
  const reader = new FileReader();
  reader.onload = () => {
    const img = new window.Image();
    img.src = reader.result;
    img.onload = () => {
      setImage(img);
      setImageWidth(img.width);  
      setImageHeight(img.height); 
      setWidth(img.width );   
      setHeight(img.height); 
      setIsUploading(true);
      setIsFileUploading(true);
      setIsLoading(false);
    };
  };
  reader.readAsDataURL(file);

  
    
};

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleMouseDown = (e) => {
    if (isErasing) return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
  };
  
  
  const handleExpand = () => {
    if (width > imageWidth && height > imageHeight) {
      setIsLoading(true);
      expandimage({
        imageUrl: uploadImgUrl,
        originalWidth:imageWidth,
        originalHeight:imageHeight,
        expectedWidth:width,
        expectedHeight:height,
      }).then(()=>setIsLoading(false))
    } else {
      alert("Width & Height must be greater than the original image!");
    }
  };
  
  const handleMouseMove = (e) => {
    if (!isDrawing.current || isErasing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    setLines([...lines.slice(0, -1), lastLine]);
  };
  const removebg = () => {
    if (!uploadImgUrl) return;
    setIsLoading(true);
    // console.log(uploadImgUrl);
    removeBackground(uploadImgUrl).then(() => setIsLoading(false));
  };
  const removefg = () => {
    if (!uploadImgUrl) return;
    setIsLoading(true);
    // console.log(uploadImgUrl);
    removeFg(uploadImgUrl).then(() => setIsLoading(false));
  };
  const bgblured = () => {
    if (!uploadImgUrl) return;
    setIsLoading(true);
    // console.log(uploadImgUrl);
    bgblur(uploadImgUrl).then(() => setIsLoading(false));
  };const incresolution = () => {
    console.log(uploadImgUrl);
    if (!uploadImgUrl) return;
    setIsLoading(true);
    incResoln(uploadImgUrl).then(() => setIsLoading(false));
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

  const extractImage = () => {
    if (!image || lines.length === 0 || !stageRef.current) return;

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
    setIsLoading(true);
    // Convert the mask to a Blob and upload
    maskCanvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "mask-image.png", { type: "image/png" });
      uploadMaskImg(file).then(
        () => setIsExtracting(false),
        setIsLoading(false)
      );
    }, "image/png");
  };
  console.log("first", uploadedMaskImgUrl);
  const eraseObj = () => {
    console.log(uploadImgUrl);
    console.log("mask", uploadedMaskImgUrl);
    setIsLoading(true);
    eraseObject({
      maskUrl: uploadedMaskImgUrl,
      imageUrl: uploadImgUrl,
    }).then(() => setIsLoading(false), setIsExtracting(false));
  };
  useEffect(() => {
    if (generatedurl) {
      console.log("Generated Image URL updated:", generatedurl);
      uploadnewImg(generatedurl);
      const img = new window.Image();
      img.src = generatedurl;
      img.onload = () => {
        clearCanvas();
        setImage(img);
        setIsLoading(false);
        setIsUploading(true);
        setInputValue("")
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedurl]);
  const handleReplace = (imageId) => {
    console.log("Replacing image with ID:", imageId);
    const selectedImage = Lists.find((img) => img.id === imageId);

    if (selectedImage) {
      setIsLoading(true);
      setSelectedImageUrl(selectedImage.url);
      uploadnewImg(selectedImage.url);
       setIsLoading(false)
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
    console.log("firstenerate");
    setIsLoading(true);
    generateImg(textRef.current.value).then(() => setIsUploading(true));
  };

  const modifyImage = () => {
    setIsLoading(true);
    modifyImg({
      maskUrl: uploadedMaskImgUrl,
      imageUrl: uploadImgUrl,
      prompt: textRef.current.value,
    }).then(() => setIsLoading(false));
  };
  console.log("url-out",uploadImgUrl)

  const bggenerated = () => {
    setIsLoading(true);
    console.log("url",uploadImgUrl)
    bgGenerate({
      imageUrl: uploadImgUrl,
      prompt: textRef.current.value,
    }).then(() => setIsLoading(false));
    setInputValue("")

  };
  const Spinnerarea = () => {
    return <div className="loading loading--full-height"></div>;
  };
  return (
    <>
      <div className="editor-container">
        <div className="editor-header">
          <div className="editor-text">
            AI Image Editor {isLoading && Spinnerarea()}{" "}
          </div>
        </div>
        <div className="content-container">
          <div className="sidebar">
            <ul className="menu">
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={activeItem === item.name ? "active" : ""}
                  onClick={() => setActiveItem(item.name)}
                >
                  <div className="menu-item">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="box">
            {activeItem === "Generate" && (
              <>
                <div className="button-group">
                  <input
                    className="prompt"
                    ref={textRef}
                    type="text"
                    placeholder="Enter prompt..."
                    onChange={handleChange}
                  />
                  <Buttonvalue
                    text="Generate"
                    onClick={generateImage}
                    disabled={!inputValue}
                  />
                  
                </div>
              </>
            )}
            {activeItem === "Background" && (
              <div className="button-group">
                <input
                    className="prompt"
                    ref={textRef}
                    type="text"
                    placeholder="Enter prompt..."
                    onChange={handleChange}
                  />

                  <Buttonvalue
                    text="Generate Background"
                    onClick={bggenerated}
                    disabled={!isUploading||!inputValue }
                  />
                <Buttonvalue
                  text="Remove Background"
                  onClick={removebg}
                  disabled={!isUploading}
                />
                <Buttonvalue
                  text="Blur Background"
                  onClick={bgblured}
                  disabled={!isUploading}
                />
              </div>
            )}
            {activeItem === "Modify" && (
              <>
                <div className="button-group">
                  <input
                    className="prompt"
                    ref={textRef}
                    type="text"
                    placeholder="Enter prompt..."
                    onChange={handleChange}
                  />
                  <Buttonvalue
                    text="Mark Selection"
                    onClick={() => {
                      setIsExtracting(true);
                      extractImage();
                    }}
                    disabled={!isUploading}
                  />
                  <Buttonvalue 
                text="Modify" 
                onClick={modifyImage} 
                disabled={isExtracting} 
                // tooltipText={isExtracting ? "Mark selection first" : ""} 
                />

                  <Buttonvalue text="Clear All" onClick={clearCanvas} />
                  <Buttonvalue
                    text={isErasing ? "Disable Eraser" : "EnaEraser"}
                    onClick={toggleEraser}
                  />
                </div>
              </>
            )}
            {activeItem === "Eraseobj" && (
              <>
                <div className="button-group">
                  <Buttonvalue
                    text="Mark Selection"
                    onClick={() => {
                      extractImage();
                    }}
                    disabled={!isUploading}
                  />
                  <Buttonvalue
                    text="Erase Selected Image"
                    onClick={eraseObj}
                    disabled={isExtracting}
                  />
                  <Buttonvalue text="Clear All" onClick={clearCanvas} />
                  <Buttonvalue
                    text={isErasing ? "Disable Eraser" : "Enable Eraser"}
                    onClick={toggleEraser}
                  />
                </div>
              </>
            )}
            {activeItem === "Enhance" && (
              <>
                <div className="button-group">
                  <Buttonvalue text="Increase Resolution" onClick={incresolution} disabled={!isUploading}/>
                </div>
              </>
            )}
            {activeItem === "Foreground" && (
              <>
                <div className="button-group">
                  <Buttonvalue
                    text="Remove Foreground"
                    onClick={removefg}
                    disabled={!isUploading}
                  />
                </div>
              </>
            )}
            {activeItem === "Expand" && (
  <>
    <div className="button-group">
      <label className="block text-sm font-medium text-gray-700">Width</label>
      <input
        type="number"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
        disabled={!isUploading}
      />

      <label className="block text-sm font-medium text-gray-700 mt-2">Height</label>
      <input
        type="number"
        value={height}
        onChange={(e) => setHeight(Number(e.target.value))}
        disabled={!isUploading}
      />

      <button
      onClick={handleExpand}
      disabled={!isUploading }
    >
      Expand
    </button>
    </div>

    
  </>
)}

          </div>
          <div className="box-image">
            <div className="button-group">
              <input type="file" onChange={handleImageUpload} disabled={!isFileUploading} />
            </div>
            <Stage
              ref={stageRef}
              width={692}
              height={469}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <Layer>
                {image && <Image image={image} width={700} height={450} />}
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
        </div>
      </div>
      <div>
        {Lists && <CanvasEditor imageSrc={Lists} onReplace={handleReplace} />}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    uploadedMaskImgUrl: state.maskImg.uploadMaskImgUrl,
    uploadImgUrl: state.uploadImg.url,
    Lists: state.List.historyList,
    generatedurl: state.generateimg.url,
  };
};

const mapDispatchToProps = (dispatch) => ({

  uploadnewImg: (imageUrl) => dispatch(setUploadedImgUrl(imageUrl)),
  incResoln: (imageUrl) => dispatch(increaseResolution(imageUrl)),
  removeFg: (imageUrl) => dispatch(removeForeground(imageUrl)),
  bgblur: (imageUrl) => dispatch(blurBg(imageUrl)),
  emptyMaskImg: () => dispatch(emptyMask()),
  uploadImage: (imageFile) => dispatch(uploadImageAction(imageFile)),
  uploadMaskImg: (imageFile) => dispatch(uploadMaskImgAction(imageFile)),
  eraseObject: (data) => dispatch(eraseObjectAction(data)),
  bgGenerate: (data) => dispatch(backgroundgeneration(data)),
  removeBackground: (imageUrl) => dispatch(removeBackgroundAction(imageUrl)),
  generateImg: (prompt) => dispatch(generateImgAction(prompt)),
  modifyImg: (data) => dispatch(modifyImgAction(data)),
  expandimage: (data) => dispatch(expandImg(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
