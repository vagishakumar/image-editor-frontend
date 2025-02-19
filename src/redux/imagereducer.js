
const initialstate={
      data:{
            editedImage:null,
            uploadImage:null
      }
    }
const imageReducer = (state = initialstate, action) => {
  console.log('action.type',action.type)
    switch (action.type) {

      case "Resize_Image":
        return {
          ...state,
          data: {
            ...state.data,
            editedImage: action.payload,  
          },
        };
        case "Upload_Image":
            return {
            ...state,
            data: {
                ...state.data,
                uploadImage: action.payload,  
            },
        };
      case "Remove_bg_FULFILLED":
        {
          console.log('entered fulfilled')
          return {
          ...state,
          data: {
            ...state.data,
            editedImage: action.payload,  
          },
        };}
      case "Remove_bg_PENDING":
        
          console.log('entered PEnding')
          
          break
      default:
        return state;
    }
  };
  export default imageReducer