import { combineReducers } from "redux";
import uploadImgReducer from "../imageUpload/uploadImgReducer";
import maskImgReducer from "../Maskimg/maskImgReducer";
import removeBgReducer from "../removeBg/removeBgReducer";
import EditingReducer from "../Maskimg/EditingReducer";

const rootReducer = combineReducers({
  maskImg: maskImgReducer,
  editImg:EditingReducer
});

export default rootReducer;
