import axios from "axios";
import { api_url } from "../Common/config";
// import { api_url } from "../Common/config";
// import axios from "axios";

// export const uploadMaskImgAction = (imageFile) => {
//     const formData = new FormData();
//     formData.append("image", imageFile);

//     return {
//       type: "UPLOAD_MASK_IMG",
//       payload: new Promise((resolve, reject) => {
//         axios
//           .post(`${api_url}/api/ai/upload`, formData)
//           .then((response) => {
//             resolve(response.data);
//           })
//           .catch((error) => {
//             reject(error);
//           });
//       }),
//     };
//   };

//   export const eraseObjectAction = (imageUrl, maskUrl) => {
//     const formData = new FormData();
//     formData.append("imageUrl", imageUrl);
//     formData.append("maskUrl", maskUrl);

//     return {
//       type: "ERASE_OBJECT",
//       payload: new Promise((resolve, reject) => {
//         axios
//           .post(`${api_url}/api/ai/eraser`, formData, {
//             responseType: "blob",
//           })
//           .then((response) => {
//             resolve(URL.createObjectURL(response.data));
//           })
//           .catch((error) => {
//             reject(error);
//           });
//       }),
//     };
//   };
import { apiRequest } from "../Common/config";

export const uploadMaskImgAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "UPLOAD_MASK_IMG",
    payload: apiRequest("/api/ai/upload", "POST", formData),
  };
};

// export const eraseObjectAction = (imageUrl, maskUrl) => {
//   const formData = new FormData();
//   formData.append("imageUrl", imageUrl);
//   formData.append("maskUrl", maskUrl);

//   return {
//     type: "ERASE_OBJECT",
//     payload: apiRequest("/api/ai/eraser", "POST", formData, { responseType: "blob" }).then((blob) => URL.createObjectURL(blob))
//       .catch((error) => {
//         console.error("Erase API failed:", error);
//         throw error;
//       }),
//   };
// };

export const eraseObjectAction = ({ imageUrl, maskUrl }) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);
  formData.append("maskUrl", maskUrl);
  console.log(imageUrl, maskUrl);
  return {
    type: "ERASE_OBJECT",
    payload: new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api/ai/eraser`, formData, {
          responseType: "blob",
        })
        .then((response) => {
          resolve(URL.createObjectURL(response.data));
        })
        .catch((error) => {
          reject(error);
        });
    }),
  };
};
