import axios from "axios";
export const api_url = "https://willowy-lollipop-0f9ba9.netlify.app";

// export const apiRequest = (url, method, formData) => {
//     return new Promise((resolve, reject) => {
//       const options = {
//         method,
//       };

//       if (method === "POST") {
//         Object.assign(options,{body:formData})
//       }
//       console.log('hlo')
//       fetch(url, options)
//         .then(response => {
//           if (!response.ok) {
//             reject(new Error("Failed to process request"));
//           } else {
//             console.log('response blob', response)
//             return response.blob();
//           }
//         })
//         .then(blob => resolve(URL.createObjectURL(blob)))
//         .catch(reject);
//     });
//   };

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
