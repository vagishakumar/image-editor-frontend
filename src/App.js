// src/App.js
import React, { useState } from "react";
// import Toolbar from "./components/Toolbar";
import Toolbar from "./Components/Toolbar";
import CanvasEditor from "./Components/CanvasEditor";
// import { resizeImage, removeBackground } from "./api/imageApi";
import { resizeImage,removeBackground } from "./redux/actions";
import { connect } from "react-redux";

const App=() => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // const handleResize = async () => {
  //   if (!imageFile) return;
  //   try {
  //     // Example resize dimensions; you can add UI to select these values
  //     const blob = await resizeImage(imageFile, 300, 300);
  //     const url = URL.createObjectURL(blob);
  //     setImageSrc(url);
  //   } catch (error) {
  //     console.error("Resize failed:", error);
  //   }
  // };

  // const processImage = async () => {
  //   if (!imageFile) return;
  //   // const result = await removeBackground(imageFile);
  //   // setEditedImage(result);
  //   const result=removeBackground(imageFile)
  //   setEditedImage(result)
  // };
  const processImage = async () => {
    if (!imageFile) return;
  
    try {
      const result = await removeBackground(imageFile); 
      
      setEditedImage(result);
    } catch (error) {
      console.error("Error processing the image:", error);
    }
  };
  
  return (
    <div className="App">
      {/* <Toolbar onUpload={handleUpload} onResize={handleResize} /> */}
      {/* Pass imageSrc to CanvasEditor once integrated */}
      {/* <CanvasEditor imageSrc={imageSrc} /> */}
      <div>
        <h1>AI Background Remover</h1>
        <input type="file" onChange={handleUpload} />
        {selectedImage && <CanvasEditor imageSrc={selectedImage} />}
        {/* <img src={selectedImage} alt="Original" width="300px" /> */}
        {editedImage && <CanvasEditor imageSrc={editedImage} />}
        {/* {editedImage && <img src={editedImage} alt="Edited" width="300px" />} */}
        <button onClick={processImage}>Remove BG</button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data:state.data.editedImage,
});
const mapStateToDispatch = (dispatch) => ({
  removeBackground:(imageFile)=>dispatch(removeBackground(imageFile))
});

export default connect(mapStateToProps,mapStateToDispatch)(App);
