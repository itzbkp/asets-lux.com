import $ from "jquery";

const getImages = () => async dispatch => {
  let Images = [];
  try {
    await $.getJSON("https://jsonplaceholder.typicode.com/photos", data => {
      for (let i = 0; i < 10; i++)
        Images.push(data[Math.floor(Math.random() * data.length)]);
    });

    dispatch({
      type: "GET_IMAGES",
      payload: Images
    });
  } catch (error) {
    console.log(error.message);

    dispatch({
      type: "GET_IMAGES",
      payload: []
    });
  }
};

export default getImages;
