import { api_url } from "../config";
import axios from "axios";

export const uploadImageAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "Upload_Image",
    payload: new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api/ai/upload`, formData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  };
};

export const uploadMaskImgAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "UPLOAD_MASK_IMG",
    payload: new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api/ai/upload`, formData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  };
};

export const removeBackgroundAction = (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  return {
    type: "Remove_bg",
    payload: new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api/ai/removebg`, formData, {
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

export const eraseObjectAction = ({ imageUrl, maskUrl }) => {
  const formData = new FormData();
  formData.append("imageUrl", imageUrl);
  formData.append("maskUrl", maskUrl);

  console.log({ imageUrl, maskUrl });

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
// export const removeBackground = async (imageFile) => {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   const response = await axios.post(
// `${api_url}/api/ai/removebg`,
//     formData,
//     {
//       responseType: "blob",
//     }
//   );

//   return URL.createObjectURL(response.data);
// }
export const resizeImage = (imageFile, width, height) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("width", width);
  formData.append("height", height);

  return {
    type: "Resize_Image",
    payload: new Promise((resolve, reject) => {
      axios
        .post(`${api_url}/api/resize`, formData)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  };
};
