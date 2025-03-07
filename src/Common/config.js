import axios from "axios";
export const api_url = "https://image-editor-backend-o4zg.onrender.com";

export const apiRequest = (
  endpoint,
  method = "POST",
  data = {},
  options = {}
) => {
  return new Promise((resolve, reject) => {
    axios({
      url: `${api_url}${endpoint}`,
      method,
      data,
      ...options,
    })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
