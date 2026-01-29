import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../store/store.js";
import "../styles/index.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
        toastStyle={{
          backgroundColor: "#161E2D",
          border: "1px solid #1E293B",
          borderRadius: "16px",
          fontSize: "14px",
          fontWeight: "600",
          color: "#F1F5F9",
        }}
      />
    </Provider>
  </StrictMode>,
);
