import { connect } from "react-redux";
import { removeBackgroundAction } from "../removeBg/actions";
import { uploadImageAction,} from "../imageUpload/actions";
import Main from "./Main";

const mapStateToProps = (state) => {
  return {
    uploadedImageurl:state.uploadImg.uploadImageUrl
  };
};

const mapDispatchToProps = (dispatch) => ({
  uploadImageAction: (imageFile) => dispatch(uploadImageAction(imageFile)),
  removeBackgroundAction: (imageFile) => dispatch(removeBackgroundAction(imageFile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
