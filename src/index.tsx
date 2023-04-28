import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import LikeMinds from "likeminds-chat-beta";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const myClient = new LikeMinds({
  apiKey: process.env.REACT_APP_API_KEY!,
  xPlatformCode: process.env.REACT_APP_XPLATFORM_CODE,
  xVersionCode: process.env.REACT_APP_XVERSION_CODE,
});

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);