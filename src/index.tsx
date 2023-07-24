import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LMChatClient from "@likeminds.community/chat-js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

export const myClient: LMChatClient = LMChatClient.setApiKey(
  process.env.CM_API_KEY!
)
  .setPlatformCode(process.env.REACT_APP_LM_PLATFORM_CODE!)
  .setVersionCode(parseInt(process.env.REACT_APP_LM_VERSION_CODE!))
  .build();

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
