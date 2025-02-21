import { combineReducers } from "redux";
import uploadImgReducer from "../imageUpload/uploadImgReducer";
import maskImgReducer from "../Maskimg/maskImgReducer";
import removeBgReducer from "../removeBg/removeBgReducer";

const rootReducer = combineReducers({
  uploadImg: uploadImgReducer,
  maskImg: maskImgReducer,
  removeBg: removeBgReducer,
});

export default rootReducer;
