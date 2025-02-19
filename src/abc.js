// import axios from "axios";
// import { api_url } from "../config";

// /**
//  * Generic API call function that returns a Promise
//  */
// export const api_promise = (url, method = "GET", body = null) =>
//   new Promise((resolve, reject) => {
//     const options = {
//       method,
//       body: body instanceof FormData ? body : JSON.stringify(body),
//     };

//     if (method === "GET") {
//       delete options.body; // GET requests shouldn't have a body
//     }

//     fetch(url, options)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`API Error: ${response.statusText}`);
//         }
//         return response.blob();
//       })
//       .then(resolve)
//       .catch((error) => reject(error));
//   });

// /**
//  * Resize Image Action
//  */
// export const resizeImage = (imageFile, width, height) => {
//   const formData = new FormData();
//   formData.append("image", imageFile);
//   formData.append("width", width);
//   formData.append("height", height);

//   return {
//     type: "Resize_Image",
//     payload: api_promise(`${api_url}/api/resize`, "POST", formData),
//   };
// };

// /**
//  * Remove Background Action
//  */
// export const removeBackground = (imageFile) => {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   return {
//     type: "Remove_bg",
//     payload: new Promise(async (resolve, reject) => {
//       try {
//         const response = await axios.post(`${api_url}/api/ai/removebg`, formData, {
//           responseType: "blob",
//         });
//         resolve(URL.createObjectURL(response.data)); // Convert blob to image URL
//       } catch (error) {
//         reject(new Error("Failed to remove background"));
//       }
//     }),
//   };
// };
import { api_url } from "../config";

/**
 * Generic API request function
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {FormData | Object | null} body - Request body
 * @returns {Promise<string>} - Resolves to an image URL (blob object URL)
 */
export const api_promise = (url, method = "GET", body = null) =>
  new Promise((resolve, reject) => {
    const options = {
      method,
      body: body instanceof FormData ? body : JSON.stringify(body),
    };

    if (method === "GET") {
      delete options.body; // Ensure GET requests don't have a body
    }

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }
        return response.blob();
      })
      .then((blob) => resolve(URL.createObjectURL(blob))) // Convert blob to image URL
      .catch(reject);
  });

/**
 * Resize Image Action
 * @param {File} imageFile - Image file
 * @param {number} width - Target width
 * @param {number} height - Target height
 * @returns {Object} Redux action object
 */
export const resizeImage = (imageFile, width, height) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("width", width);
  formData.append("height", height);

  return {
    type: "Resize_Image",
    payload: api_promise(`${api_url}/api/resize`, "POST", formData),
  };
};

/**
 * Remove Background Action (Using fetch)
 * @param {File} imageFile - Image file
 * @returns {Object} Redux action object
 */
export const removeBackground = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "Remove_bg",
    payload: api_promise(`${api_url}/api/ai/removebg`, "POST", formData),
  };
};
