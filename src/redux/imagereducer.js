const initialstate = {
  data: {
    editedImage: null,
    uploadImageAction: null,
  },
};
const imageReducer = (state = initialstate, action) => {
  console.log("action.type", action.type);
  switch (action.type) {
    case "Resize_Image":
      return {
        ...state,
        data: {
          ...state.data,
          editedImage: action.payload,
        },
      };

    case "Upload_Image_PENDING":
      return {
        ...state,
        data: {
          ...state.data,
          status: "pending",
        },
      };

    case "Upload_Image_FULFILLED":
      return {
        ...state,
        data: {
          ...state.data,
          uploadImageUrl: action.payload,
          status: "success",
        },
      };

    case "Upload_Image_FAILED": {
      return {
        ...state,
        data: {
          ...state.data,
          status: "failed",
        },
      };
    }

    case "UPLOAD_MASK_IMG_FULFILLED":
      return {
        ...state,
        data: {
          ...state.data,
          uploadMaskImgUrl: action.payload,
          status: "success",
        },
      };

    case "Remove_bg_FULFILLED": {
      console.log("entered fulfilled");
      return {
        ...state,
        data: {
          ...state.data,
          editedImage: action.payload,
        },
      };
    }

    case "Remove_bg_PENDING":
      console.log("entered PEnding");
      break;

    default:
      return state;
  }
};
export default imageReducer;
