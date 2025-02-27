import { connect } from "react-redux";
import {uploadMaskImgAction, eraseObjectAction } from "../actions";
import {uploadImageAction} from "../../imageUpload/actions";
import MaskImage from "../pages/MaskImage";
import {removeBackgroundAction} from "../../removeBg/actions"

const mapStateToProps = (state) => ({
  uploadedMaskImgUrl: state.maskImg.uploadMaskImgUrl,
  uploadedImageUrl: state.uploadImg.uploadImageUrl,
  loading:state.maskImg.loading,
  isloading:state.uploadImg.isloading
});

const mapDispatchToProps = (dispatch) => ({
  uploadImageAction: (imageFile) => dispatch(uploadImageAction(imageFile)),
  uploadMaskImg: (imageFile) => dispatch(uploadMaskImgAction(imageFile)),
  eraseObject: (imageUrl, maskUrl) => dispatch(eraseObjectAction(imageUrl, maskUrl)),
  removeBackgroundAction:(imageUrl)=>dispatch(removeBackgroundAction(imageUrl))
});

export default connect (mapStateToProps, mapDispatchToProps)(MaskImage) ;
