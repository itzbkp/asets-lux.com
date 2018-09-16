import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ImageReducer from "./gallery/ImageReducer";
import thunk from "redux-thunk";

import registerServiceWorker from "./registerServiceWorker";

let store = createStore(
  combineReducers({ Images: ImageReducer }),
  applyMiddleware(...[thunk])
);

let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

render();

if (module.hot) {
  module.hot.accept("./App", () => {
    setTimeout(render);
  });

  module.hot.accept("./gallery/ImageReducer", () => {
    const newRootReducer = require("./gallery/ImageReducer").default;
    store.replaceReducer(newRootReducer);
  });
}
registerServiceWorker();
