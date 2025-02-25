
import { apiRequest } from "../Common/config";

export const uploadMaskImgAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "UPLOAD_MASK_IMG",
    payload: apiRequest("/api/ai/upload", "POST", formData),
  };
};


export const eraseObjectAction = ({ imageUrl, maskUrl }) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);
  formData.append("maskUrl", maskUrl);

  return {
    type: "ERASE_OBJECT",
    payload: apiRequest("/api/ai/eraser", "POST", formData)
      .then((response) =>{
         return response})
  };
};
export const removeBackgroundAction = (imageInput) => {
  let requestData;

  if (typeof imageInput === "string") {
    requestData = { imageUrl: imageInput }; 
  } else {
    requestData = new FormData();
    requestData.append("image", imageInput);
  }

  return {
    type: "REMOVE_BG",
    payload: apiRequest("/api/ai/removebg", "POST", requestData)
      .then((response) => {
        // console.log(response); 
        return response;
      }),
  };
};
export const uploadImageAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "Upload_Image",
    payload: apiRequest("/api/ai/upload", "POST", formData),
  };
};

export const resizeImage = (imageFile, width, height) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("width", width);
  formData.append("height", height);

  return {
    type: "Resize_Image",
    payload: apiRequest("/api/resize", "POST", formData),
  };
};
