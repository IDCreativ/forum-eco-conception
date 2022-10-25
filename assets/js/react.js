import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";

const rootElement = document.querySelector("#App");
const root = createRoot(rootElement);

root.render(
	<HashRouter>
		<App />
	</HashRouter>
);
