// const initialState = {
//     uploadImageUrl: null,
//     status: null,
//   };
  
//   const uploadImgReducer = (state = initialState, action) => {
//     console.log('action',action.type)
//     switch (action.type) {
//       case "Upload_Image_PENDING":
//         return { ...state, status: "pending" };
  
//       case "Upload_Image_FULFILLED":
//         console.log(action.payload)
//         return { ...state, uploadImageUrl: action.payload.imageUrl, status: "success" };
//       // console.log(uploadImgReducer)
//       case "Upload_Image_FAILED":
//         return { ...state, status: "failed" };
  
//       default:
//         return state;
//     }
//   };
  
//   export default uploadImgReducer;
const initialState = {
  uploadImageUrl: null,
  status: null,  // "pending", "success", "failed", or null (idle state)
  isloading: false,  // Explicit loading state
};

const uploadImgReducer = (state = initialState, action) => {
  console.log('action', action.type);

  switch (action.type) {
    case "Upload_Image_PENDING":
      return { ...state, status: "pending", isloading: true };

    case "Upload_Image_FULFILLED":
      console.log(action.payload);
      return { 
        ...state, 
        uploadImageUrl: action.payload.imageUrl, 
        status: "success",
        isloading: false 
      };

    case "Upload_Image_FAILED":
      return { ...state, status: "failed", isloading: false };

    default:
      return state;
  }
};

export default uploadImgReducer;
