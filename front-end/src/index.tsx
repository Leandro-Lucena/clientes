import React from "react";
import ReactDOM from "react-dom/client";
import { ColorModeProvider } from "./theme/ColorModeContext";
import AppRoutes from "./routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <AppRoutes />
    </ColorModeProvider>
  </React.StrictMode>
);
