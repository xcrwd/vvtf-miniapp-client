import { createRoot } from "react-dom/client";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

import { App } from "./components/App";

const rootElem = document.getElementById("root");

if (rootElem) {
  createRoot(rootElem).render(<App />);
}
