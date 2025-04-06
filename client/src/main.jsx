import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./Context/AppContext.jsx";
import { AppStateProvider } from "./Context/AppState.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppStateProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AppStateProvider>
  </BrowserRouter>
);
