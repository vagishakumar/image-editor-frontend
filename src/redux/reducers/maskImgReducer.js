const initialState = {
  uploadMaskImgUrl: null,
  status: null,
  error: null,
  loading: false,
};

const maskImgReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_MASK_IMG_PENDING":
      return { ...state, status: "pending", loading: true, error: null };

    case "UPLOAD_MASK_IMG_FULFILLED":
      console.log("before", action.payload.imageUrl);
      return {
        ...state,
        uploadMaskImgUrl: action.payload.imageUrl,
        status: "success",
        loading: false,
        error: null,
      };

    case "UPLOAD_MASK_IMG_FAILED":
      return {
        ...state,
        status: "failed",
        loading: false,
        error: action.payload,
      };
    case "EMPTY_UPLOAD_MASK_IMG":
      return { ...state, uploadMaskImgUrl: null };
    default:
      return state;
  }
};

export default maskImgReducer;
