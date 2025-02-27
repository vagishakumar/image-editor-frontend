const initialState = {
  uploadMaskImgUrl: null,
  eraseImgUrl: [],
  status: null,
  error: null,
  loading: false,
};

const maskImgReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_MASK_IMG_PENDING":
      return { ...state, status: "pending", loading: true, error: null };

    case "UPLOAD_MASK_IMG_FULFILLED":
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

    case "ERASE_OBJECT_PENDING":
      return { ...state, status: "pending", loading: true, error: null };

    case "ERASE_OBJECT_FULFILLED":
      console.log("erase", action.payload);
      return {
        ...state,
        eraseImgUrl: [
          ...(state.eraseImgUrl || []),
          {
            download: action.payload.data.result_url,
            url: action.payload.resultUrl,
          },
        ],
        status: "success",
        loading: false,
        error: null,
      };

    case "ERASE_OBJECT_FAILED":
      return {
        ...state,
        status: "failed",
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default maskImgReducer;
