import { api_url,apiRequest } from "../config";
import axios from "axios";
export const resizeImage = async (imageFile, width, height) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("width", width);
    formData.append("height", height);
  
    return {
      type: "Resize_Image",
      payload: apiRequest(`${api_url}/api/resize`,"POST", formData),
    };
  };
  // export const removeBackground = async (imageFile) => {
  //   const formData = new FormData();
  //   formData.append("image", imageFile);
  
  //   return {
  //     type: "Remove_bg",
  //     // payload: apiRequest(`${api_url}/api/ai/removebg`,"POST", formData),
  //     // payload: apiRequest(`${api_url}/api/ai/removebg`,"POST", formData),
  //     payload:new Promise((resolve,reject)=>{
  //         axios.post(`${api_url}/api/ai/removebg`,formData,{
  //           responseType: "blob",
  //         })
  //     }
  //   )
  //   };
  // };
  export const removeBackground = (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
  
    return {
      type: "Remove_bg",
      payload: new Promise((resolve, reject) => {
        axios.post(
          `${api_url}/api/ai/removebg`, 
          formData,
          {
            responseType: "blob", 
          }
        )
        .then((response) => {
          resolve(URL.createObjectURL(response.data));
        })
        .catch((error) => {
          reject(error);
        });
      }),
    };
  };
  