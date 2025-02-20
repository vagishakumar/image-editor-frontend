import React, { useState } from "react";
import { connect } from "react-redux";
import { uploadImageAction, removeBackgroundAction } from "./redux/actions";
import CanvasEditor from "./Components/CanvasEditor";
import MaskImage from "./Components/MaskImage";

const App = ({ uploadImageAction, removeBackground, data }) => {
  const [imageSrc, setImageSrc] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [isuploaded, setIsUploaded] = useState(false);
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
  const processImage = () => {
    if (!imageFile) return;
    removeBackground(imageFile);
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
      {/* <div className="App">
        <h1>AI Background Remover</h1>

        <input type="file" onChange={handleUpload} />

        {selectedImage && <CanvasEditor imageSrc={selectedImage} />}
        {console.log(editedImage)}
        {editedImage && (
          <div>
            <h2>Image with Background Removed</h2>
            <CanvasEditor imageSrc={editedImage} />
          </div>
        )}

        <button onClick={processImage}>Remove BG</button>
      </div> */}

      {/* <button onClick={processImage}disabled={!isuploaded}>Remove BG</button> */}
      <MaskImage />
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    data: state.data,
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadImageAction: (imageFile) => dispatch(uploadImageAction(imageFile)),
  removeBackground: (imageFile) => dispatch(removeBackgroundAction(imageFile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
