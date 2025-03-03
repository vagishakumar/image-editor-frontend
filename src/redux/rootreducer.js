import { combineReducers } from "redux";

import generateImageReducer from "./reducers/generateImageReducer";
import maskImgReducer from "./reducers/maskImgReducer";
import modifyImageReducer from "./reducers/modifyImageReducer";
import eraseObjectReducer from "./reducers/eraseObjectReducer";
import uploadImgReducer from "./reducers/uploadReducer";
import removeBgReducer from "./reducers/removeBgReducer";
import historyListReducer from "./reducers/historyListReducer";
import BlurBg from "./reducers/blurBg";
import IncreaseResolution from "./reducers/increaseResolution";
import BgGeneration from "./reducers/bgGeneration";
import RemoveForeground from "./reducers/removeForeground";
import expandimg from "./reducers/expandimg";

const rootReducer = combineReducers({
  maskImg: maskImgReducer,
  generateimg: generateImageReducer,
  removeBg: removeBgReducer,
  eraseObj: eraseObjectReducer,
  modifyImg: modifyImageReducer,
  uploadImg: uploadImgReducer,
  List: historyListReducer,
  BlurBg: BlurBg,
  increaseRes: IncreaseResolution,
  bgGen: BgGeneration,
  remforeg: RemoveForeground,
  Expand: expandimg,
});

export default rootReducer;
