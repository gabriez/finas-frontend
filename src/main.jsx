import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

import router from "./routes/Routes.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StyledEngineProvider injectFirst>
			<RouterProvider router={router} />
		</StyledEngineProvider>
	</React.StrictMode>
);
