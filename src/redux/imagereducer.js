
// const initialstate={
//     data:[]
// }
// const imageReducer=(state=initialstate,action)=>{
//     switch (action.type) {
//         case "Resize_Image":
//             return{
//                 ...state,
//                 data:action.payload
//             }
//         case "Remove_bg":
//             return{
//                 ...state,
//                 data:action.payload
//             }
//         default:
//             break;
//     }
// }
// export default imageReducer;
const initialstate={
        data:{
            editedImage:null
        }
    }
const imageReducer = (state = initialstate, action) => {
    switch (action.type) {
      case "Resize_Image":
        return {
          ...state,
          data: {
            ...state.data,
            editedImage: action.payload,  
          },
        };
      case "Remove_bg":
        return {
          ...state,
          data: {
            ...state.data,
            editedImage: action.payload,  
          },
        };
      default:
        return state;
    }
  };
  export default imageReducer