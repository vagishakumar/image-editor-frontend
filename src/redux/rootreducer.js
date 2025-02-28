import { combineReducers } from "redux";

import generateImageReducer from "./reducers/generateImageReducer";
import maskImgReducer from "./reducers/maskImgReducer";
import modifyImageReducer from "./reducers/modifyImageReducer";
import eraseObjectReducer from "./reducers/eraseObjectReducer";
import uploadImgReducer from "./reducers/uploadReducer";
import removeBgReducer from "./reducers/removeBgReducer";
import historyListReducer from "./reducers/historyListReducer";

const rootReducer = combineReducers({
  maskImg: maskImgReducer,
  generateimg: generateImageReducer,
  removeBg: removeBgReducer,
  eraseObj: eraseObjectReducer,
  modifyImg: modifyImageReducer,
  uploadImg: uploadImgReducer,
  List:historyListReducer
});

export default rootReducer;
