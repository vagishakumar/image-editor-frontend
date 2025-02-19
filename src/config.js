export const api_url='https://international-indoor-mel-rebecca.trycloudflare.com'

export const apiRequest = (url, method, formData) => {
    return new Promise((resolve, reject) => {
      const options = {
        method, 
      };
      
      if (method === "POST") {
        Object.assign(options,{body:formData})
      }
      console.log('hlo')
      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            reject(new Error("Failed to process request"));
          } else {
            console.log('response blob', response)
            return response.blob();
          }
        })
        .then(blob => resolve(URL.createObjectURL(blob))) 
        .catch(reject);  
    });
  };
  