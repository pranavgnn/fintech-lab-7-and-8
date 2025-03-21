import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CustomerFormProvider } from "./context/CustomerFormContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CustomerFormProvider>
      <App />
    </CustomerFormProvider>
  </React.StrictMode>
);
