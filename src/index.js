import React from "react";
import ReactDOM from "react-dom";

import App from "./App.js";

import{ createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";

import "./css/index.css";

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById("root"));
