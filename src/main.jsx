import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ETODashboard from "./ETODashboard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ETODashboard />
  </StrictMode>
);
