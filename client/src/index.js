import React from "react";
import ReactDOM from "react-dom";
import Provider from "./redux/Provider";

import "./index.scss";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
