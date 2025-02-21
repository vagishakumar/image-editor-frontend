// import { api_url } from "../Common/config";
// import axios from "axios";

// export const uploadImageAction = (imageFile) => {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   return {
//     type: "Upload_Image",
//     payload: new Promise((resolve, reject) => {
//       axios
//         .post(`${api_url}/api/ai/upload`, formData)
//         .then((response) => {
//           resolve(response.data);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     }),
//   };
// };

// export const resizeImage = (imageFile, width, height) => {
//     const formData = new FormData();
//     formData.append("image", imageFile);
//     formData.append("width", width);
//     formData.append("height", height);
  
//     return {
//       type: "Resize_Image",
//       payload: new Promise((resolve, reject) => {
//         axios
//           .post(`${api_url}/api/resize`, formData)
//           .then((response) => {
//             resolve(response.data);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//       }),
//     };
//   };
import { apiRequest } from "../Common/config";

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
