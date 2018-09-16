let Images = [];

const ImageReducer = (state = Images, action) => {
  if (action.type === "GET_IMAGES") return action.payload;
  else return state;
};

export default ImageReducer;
