import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
);
