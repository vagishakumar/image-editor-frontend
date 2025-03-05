import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import useImage from "use-image";
import { Stage, Layer, Image, Line } from "react-konva";
import {
  Wand2,
  Scissors,
  Expand,
  ImageUpscale,
  Eraser,
  Edit3,
  ZoomIn,
  ZoomOut,
  Trash,
  Ban,
} from "lucide-react";
import { ReactComponent as EraseAll } from "../../assets/broom-svgrepo-com.svg";
import { ReactComponent as EraserSvg } from "../../assets/eraser-icon.svg";
import { ReactComponent as PenSvg } from "../../assets/pencil-svg.svg";
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
  expandImg,
} from "../actions";
import { useEffect } from "react";
import Buttonvalue from "../../Common/Buttonvalue";
import "./Editor.scss";
import CanvasEditor from "../../Common/CanvasEditor";
import bg from "../../Common/transparent.png";
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
  const [isUploading, setIsUploading] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [scalePercentage, setScalePercentage] = useState(20);

  const menuItems = [
    { name: "Generate", icon: <Wand2 size={24} color="black" /> },
    { name: "Background", icon: <Scissors size={24} color="black" /> },
    { name: "Modify", icon: <Edit3 size={24} color="black" /> },
    { name: "Eraseobj", icon: <Eraser size={24} color="black" /> },
    { name: "Enhance", icon: <ImageUpscale size={24} color="black" /> },
    { name: "Foreground", icon: <Scissors size={24} color="black" /> },
    { name: "Expand", icon: <Expand size={24} color="black" /> },
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
      })
      .finally(() => setIsLoading(false));
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
        setImageWidth(img.width);
        setImageHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setIsUploading(true);
        setIsFileUploading(true);
        setIsLoading(false);
      };
    };
    reader.readAsDataURL(file);
  };
  const [bgImage] = useImage(bg);

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
        originalWidth: imageWidth,
        originalHeight: imageHeight,
        expectedWidth: width,
        expectedHeight: height,
      }).finally(() => setIsLoading(false));
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
    removeBackground(uploadImgUrl).finally(() => setIsLoading(false));
  };
  const removefg = () => {
    if (!uploadImgUrl) return;
    setIsLoading(true);
    removeFg(uploadImgUrl).then(() => setIsLoading(false));
  };
  const bgblured = () => {
    if (!uploadImgUrl) return;
    setIsLoading(true);
    bgblur(uploadImgUrl).finally(() => setIsLoading(false));
  };
  const incresolution = () => {
    if (!uploadImgUrl) return;
    setIsLoading(true);
    incResoln(uploadImgUrl).finally(() => setIsLoading(false));
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
      uploadMaskImg(file).finally(() => setIsLoading(false));
    }, "image/png");
  };

  const eraseObj = () => {
    setIsLoading(true);
    eraseObject({
      maskUrl: uploadedMaskImgUrl,
      imageUrl: uploadImgUrl,
    }).finally(() => setIsLoading(false));
    emptyMaskImg();
  };
  useEffect(() => {
    if (generatedurl) {
      uploadnewImg(generatedurl);
      const img = new window.Image();
      img.src = generatedurl;
      img.onload = () => {
        clearCanvas();
        setImage(img);
        setImageWidth(img.width);
        setImageHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setIsUploading(true);
        setInputValue("");
      };
    } // eslint-disable-next-line
  }, [generatedurl]);
  const handleReplace = (imageId) => {
    const selectedImage = Lists.find((img) => img.id === imageId);

    if (selectedImage) {
      setIsLoading(true);
      setSelectedImageUrl(selectedImage.url);
      uploadnewImg(selectedImage.url);
      setIsLoading(false);
      emptyMaskImg();
      clearCanvas();
    }
  };
  useEffect(() => {
    setInputValue("");
  }, [activeItem]);
  useEffect(() => {
    if (selectedImageUrl) {
      const img = new window.Image();
      img.src = selectedImageUrl;
      img.onload = () => {
        clearCanvas();
        setImage(img);
        setImageWidth(img.width);
        setImageHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
      };
    }
  }, [selectedImageUrl]);

  const generateImage = () => {
    setIsLoading(true);
    generateImg(inputValue)
      .then(() => setIsUploading(true))
      .finally(() => setIsLoading(false));
  };

  const modifyImage = () => {
    setIsLoading(true);
    modifyImg({
      maskUrl: uploadedMaskImgUrl,
      imageUrl: uploadImgUrl,
      prompt: inputValue,
    }).finally(() => setIsLoading(false), emptyMaskImg());
    setInputValue("");
  };
  const stageHeight = 465;
  const stageWidth = 700;
  const bggenerated = () => {
    setIsLoading(true);
    bgGenerate({
      imageUrl: uploadImgUrl,
      prompt: inputValue,
    })
      .then(() => setInputValue(""))
      .finally(() => setIsLoading(false));
  };
  const Spinnerarea = () => {
    return <div className="loading loading--full-height"></div>;
  };

  const increaseSize = () => {
    setScalePercentage((prev) => Math.min(prev + 5, 100));
  };

  const decreaseSize = () => {
    setScalePercentage((prev) => Math.max(prev - 5, 5));
  };
  return (
    <>
      <div className="editor-container d-flex flex-column">
        <div className="editor-header">
          <div className="editor-text">
            AI Image Editor {isLoading && Spinnerarea()}{" "}
          </div>
        </div>
        <div className="content-container row">
          <div className="sidebar col-lg-2">
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
          <div className="box col-lg-2">
            {activeItem === "Generate" && (
              <>
                <div className="button-group">
                  <input
                    className="prompt"
                    type="text"
                    value={inputValue}
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
                  type="text"
                  value={inputValue}
                  placeholder="Enter prompt..."
                  onChange={handleChange}
                />

                <Buttonvalue
                  text="Generate Background"
                  onClick={bggenerated}
                  disabled={!isUploading || !inputValue}
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
                    type="text"
                    value={inputValue}
                    placeholder="Enter prompt..."
                    onChange={handleChange}
                  />
                  <Buttonvalue
                    text="Mark Selection"
                    onClick={() => {
                      extractImage();
                    }}
                    disabled={!isUploading}
                  />
                  <Buttonvalue
                    text="Modify"
                    onClick={modifyImage}
                    disabled={!uploadedMaskImgUrl}
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
                    disabled={!uploadedMaskImgUrl}
                  />
                </div>
              </>
            )}
            {activeItem === "Enhance" && (
              <>
                <div className="button-group">
                  <Buttonvalue
                    text="Increase Resolution"
                    onClick={incresolution}
                    disabled={!isUploading}
                  />
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
                  <label className="block text-sm font-medium text-gray-700">
                    Width
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    disabled={!isUploading}
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-2">
                    Height
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    disabled={!isUploading}
                  />

                  <button onClick={handleExpand} disabled={!isUploading}>
                    Expand
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="box-image">
            <div className="toolbar">
              <button className="icon-btn" onClick={clearCanvas}>
                <Trash size={20} stroke="black" />
              </button>
              <button className="icon-btn" onClick={toggleEraser}>
                {isErasing ? (
                  <Ban size={20} stroke="gray" />
                ) : (
                  <Eraser size={20} stroke="green" />
                )}
              </button>

              <input
                type="file"
                onChange={handleImageUpload}
                disabled={!isFileUploading}
                className="file-input"
              />

              {uploadImgUrl && (
                <span className="zoom-controls">
                  <button className="icon-btn" onClick={decreaseSize}>
                    <ZoomOut size={20} />
                  </button>
                  <span className="icon-text"> {scalePercentage}%</span>
                  <button className="icon-btn" onClick={increaseSize}>
                    <ZoomIn size={20} />
                  </button>
                </span>
              )}
            </div>

            <Stage
              ref={stageRef}
              width={stageWidth}
              height={stageHeight}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <Layer>
                {bgImage && (
                  <Image
                    image={bgImage}
                    width={stageWidth}
                    height={stageHeight}
                  />
                )}
                {image && (
                  <Image
                    image={image}
                    x={50}
                    width={(scalePercentage / 100) * imageWidth}
                    height={(scalePercentage / 100) * imageHeight}
                  />
                )}
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
Editor.propTypes = {
  uploadedMaskImgUrl: PropTypes.string,
  emptyMaskImg: PropTypes.func,
  uploadImage: PropTypes.func,
  uploadMaskImg: PropTypes.func,
  eraseObject: PropTypes.func,
  removeBackground: PropTypes.func,
  generateImg: PropTypes.func,
  modifyImg: PropTypes.func,
  uploadImgUrl: PropTypes.string,
  Lists: PropTypes.array,
  generatedurl: PropTypes.string,
  uploadnewImg: PropTypes.func,
  incResoln: PropTypes.func,
  removeFg: PropTypes.func,
  bgblur: PropTypes.func,
  bgGenerate: PropTypes.func,
  expandimage: PropTypes.func,
};
