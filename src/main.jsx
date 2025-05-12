import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Context provider for global expense state
import { ExpenseProvider } from "./context/ExpenseContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <ExpenseProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ExpenseProvider>
);
