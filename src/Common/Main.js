import React, { useState } from "react";
// import { connect } from "react-redux";
// import { uploadImageAction, removeBackgroundAction } from "./redux/actions";
import CanvasEditor from "./CanvasEditor";
import MaskImage from "../Maskimg/containers/Maskimgcontainer";

const Main = ({ uploadImageAction, removeBackgroundAction ,uploadedImageurl}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [image,setImage]=useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [isuploaded, setIsUploaded] = useState(true);
  // useEffect(() => {
  //   if (data.uploadImageAction) {
  //     setIsUploaded(true);
  //   }
  // }, [data.uploadImageAction]);
  // const handleUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImageFile(file);
  //     setSelectedImage(URL.createObjectURL(file));
  //     setIsUploaded(false);
  //     uploadImageAction(file);
  //   }
  // };
  // const handleUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedImage(URL.createObjectURL(file));
  //     setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onload = () => setImageSrc(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file)
    // clearCanvas();
    if (file) {
      uploadImageAction(file);
     
    }
  }
  
  const processImage = () => {
    if (!imageFile) return;
    removeBackgroundAction(imageFile);
  };
  // const processImage = async () => {
  //   if (!imageFile) return;

  //   try {
  //     const result = await removeBackground(imageFile);
  //     setEditedImage(result);
  //   } catch (error) {
  //     console.error("Error processing the image:", error);
  //   }
  // };

  return (
    <>
      <div className="App">
        <h1>AI Background Remover</h1>
        {/* <input type="file" onChange={handleImageUpload} /> */}
{/* {console.log("hi",uploadedImageurl)} */}
        {/* {uploadedImageurl && <CanvasEditor imageSrc={uploadedImageurl} />} */}
        {/* {console.log(editedImage)}
        {editedImage && (
          <div>
            <h2>Image with Background Removed</h2>
            <CanvasEditor imageSrc={editedImage} />
          </div>
        )} */}

        {/* <button onClick={processImage}>Remove BG</button> */}
      </div> 

       {/* <button onClick={processImage}disabled={!isuploaded}>Remove BG</button> */}
      <MaskImage />
    </>
  );
};


export default (Main);
