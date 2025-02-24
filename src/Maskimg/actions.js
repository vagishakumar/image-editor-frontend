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
    payload: apiRequest("/api/ai/eraser", "POST", formData).then((response) => {
      console.log("aa", response);
      return response;
    }),
  };
};

export const generateImgAction = (prompt) => {
  const formData = new FormData();
  formData.append("prompt", prompt);

  return {
    type: "ERASE_OBJECT",
    payload: apiRequest("/api/ai/generator", "POST", formData).then(
      (response) => {
        return response;
      }
    ),
  };
};

export const modifyImgAction = ({ prompt, imageUrl, maskUrl }) => {
  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("imageUrl", imageUrl);
  formData.append("maskUrl", maskUrl);

  return {
    type: "ERASE_OBJECT",
    payload: apiRequest("/api/ai/modifier", "POST", formData).then(
      (response) => {
        return response;
      }
    ),
  };
};
