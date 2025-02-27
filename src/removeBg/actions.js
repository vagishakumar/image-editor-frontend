
import { apiRequest } from "../Common/config";


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
        console.log(response); 
        return response;
      }),
  };
};
