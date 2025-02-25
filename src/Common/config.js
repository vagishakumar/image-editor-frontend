import axios from "axios";
export const api_url='http://localhost:5000'


export const apiRequest = (endpoint, method = "POST", data = {}, options = {}) => {
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
