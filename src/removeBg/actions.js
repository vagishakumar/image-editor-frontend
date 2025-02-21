// import { api_url } from "../Common/config";
// import axios from "axios";


// export const removeBackgroundAction = (imageFile) => {
//     const formData = new FormData();
//     formData.append("image", imageFile);
  
//     return {
//       type: "REMOVE_BG",
//       payload: new Promise((resolve, reject) => {
//         axios
//           .post(`${api_url}/api/ai/removebg`, formData, {
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
import axios from "axios";
import { api_url } from "../Common/config";

export const removeBackgroundAction = (imageInput) => {
  let requestData;

  if (typeof imageInput === "string") {
    // If it's a string, assume it's a URL
    requestData = { imageUrl: imageInput };
  } else {
    // Otherwise, assume it's a file
    requestData = new FormData();
    requestData.append("image", imageInput);
  }
console.log("requestData",requestData)
  return {
    type: "REMOVE_BG",
    payload: new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api/ai/removebg`, requestData, {
          responseType: "blob",
          headers: typeof imageInput === "string" ? { "Content-Type": "application/json" } : {},
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
