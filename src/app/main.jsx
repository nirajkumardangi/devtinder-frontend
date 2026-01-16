import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import store from "../store/store.js";

import App from "./App.jsx";
import "../styles/index.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        newestOnTop
        closeOnClick
        theme="dark"
      />
    </Provider>
  </StrictMode>
);
