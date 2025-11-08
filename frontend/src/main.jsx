import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.jsx";
import { AuthAndTranslationsProvider } from "./AuthAndTranslationsContext.jsx";
import Login from "./Login.jsx";
import Pricelist from "./Pricelist.jsx";
import Terms from "./Terms.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/terms",
		element: <Terms />,
	},
	{
		path: "/pricelist",
		element: <Pricelist />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<AuthAndTranslationsProvider>
			<RouterProvider router={router} />
		</AuthAndTranslationsProvider>
	</StrictMode>,
);
