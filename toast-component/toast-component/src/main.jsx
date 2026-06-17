import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ToastProvider from "./components/Toast/ToastProvider.jsx";
import { TOAST_POSITIONS } from "./components/Toast/constants/toastConstants.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider position={TOAST_POSITIONS.TOP_RIGHT}>
      <App />
    </ToastProvider>
  </StrictMode>,
);
