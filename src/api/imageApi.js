import axios from "axios";
// src/api/imageApi.js

export const resizeImage = async (imageFile, width, height) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("width", width);
  formData.append("height", height);

  const response = await fetch("http://localhost:5000/api/resize", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to process image");
  }

  return await response.blob();
};

export const removeBackground = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axios.post(
    "http://localhost:5000/api/ai/removebg",
    formData,
    {
      responseType: "blob",
    }
  );

  return URL.createObjectURL(response.data); // Convert response to image URL
};
