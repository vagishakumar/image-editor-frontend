
const initialState = {
  status: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "Upload_Image_PENDING":
      return { ...state, status: "pending" };
    case "Upload_Image_FULFILLED":
      return {
        ...state,
        url: action.payload.imageUrl,  
        status: "success",
      };
    case "Upload_Image_FAILED":
      return { ...state, status: "failed" };
    case "SET_UPLOADED_IMAGE_URL":
      return { ...state, url: action.payload };
    default:
      return state;
  }
};

export default uploadReducer;
