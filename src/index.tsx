import { createRoot } from "react-dom/client";

import { App } from "./App.tsx";
import "./index.css";

const rootElem = document.getElementById("root");

if (rootElem) {
  createRoot(rootElem).render(<App />);
}
