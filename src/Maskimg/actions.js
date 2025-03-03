import { apiRequest } from "../Common/config";

export const uploadMaskImgAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "UPLOAD_MASK_IMG",
    payload: apiRequest("/api/ai/upload", "POST", formData),
  };
};
export const emptyMask = () => {
  return {
    type: "UPLOAD_MASK_IMG",
  };
};

export const eraseObjectAction = ({ imageUrl, maskUrl }) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);
  formData.append("maskUrl", maskUrl);

  return {
    type: "ERASE_OBJECT",
    payload: apiRequest("/api/ai/eraser", "POST", formData)
  
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
  };
};
export const uploadImageAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "UPLOAD_IMG",
    payload: apiRequest("/api/ai/upload", "POST", formData),
  };
};
export const increaseResolution = (imageUrl) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);
    console.log("imageFile",imageUrl)
  return {
    type: "INCREASE_RESOLUTION_IMG",
    payload: apiRequest("/api/ai/increaseResolution", "POST", formData),
  };
};
export const removeForeground = (imageUrl) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);

  return {
    type: "REMOVE_FOREGROUND_IMG",
    payload: apiRequest("/api/ai/removeForeground", "POST", formData),
  };
};
export const blurBg = (imageUrl) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);

  return {
    type: "BLUR_BG_IMG",
    payload: apiRequest("/api/ai/blurBg", "POST", formData),
  };
};
export const generateImgAction = (prompt) => {
  const formData = new FormData();
  formData.append("prompt", prompt);

  return {
    type: "GENERATE_IMG",
    payload: apiRequest("/api/ai/generator", "POST", formData),
  };
};

export const modifyImgAction = ({ prompt, imageUrl, maskUrl }) => {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("imageUrl", imageUrl);
  formData.append("maskUrl", maskUrl);

  return {
    type: "MODIFY_IMG",
    payload: apiRequest("/api/ai/modifier", "POST", formData),
  };
};
export const expandImg = ({ imageUrl, originalWidth,originalHeight,expectedWidth,expectedHeight }) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);
  formData.append("originalWidth", originalWidth);
  formData.append("originalHeight", originalHeight);
  formData.append("expectedWidth", expectedWidth);
  formData.append("expectedHeight", expectedHeight);

  return {
    type: "EXPAND_IMG",
    payload: apiRequest("/api/ai/expand", "POST", formData),
  };
};
export const backgroundgeneration = ({ prompt, imageUrl }) => {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("imageUrl", imageUrl);

  return {
    type: "BG_GENERATION_IMG",
    payload: apiRequest("/api/ai/backgroundGen", "POST", formData),
  };
};

export const setUploadedImgUrl = (imageUrl) => ({
  type: "SET_UPLOADED_IMG_URL",
  payload: imageUrl,
});

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
