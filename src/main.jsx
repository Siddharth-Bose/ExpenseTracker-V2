import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ExpenseProvider } from "./context/TempContext.jsx";

createRoot(document.getElementById("root")).render(
  <ExpenseProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ExpenseProvider>
);
