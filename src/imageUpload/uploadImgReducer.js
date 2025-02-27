
const initialState = {
  uploadImageUrl: null,
  status: null,  
  isloading: false, 
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
