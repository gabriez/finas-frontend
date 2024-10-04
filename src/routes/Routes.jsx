import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Confirm from "../pages/public/Confirm";
import PrivateLayout from "../layouts/PrivateLayout";
import Home from "../pages/private/Home";

const routes = {
	PUBLIC: {
		INDEX: "/",
		REGISTER: "/register",
		CONFIRM: "/confirmacion",
		FORGOT: "/forgot-password",
	},
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/confirmacion",
				element: <Confirm />,
			},
		],
	},
	{
		path: "/dashboard",
		element: <PrivateLayout />,
		children: [{ index: true, element: <Home /> }],
	},
]);

export default router;
export { routes };
