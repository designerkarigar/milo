import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "react-app-polyfill/stable";
import "core-js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);
