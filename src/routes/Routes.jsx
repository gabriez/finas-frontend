import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Confirm from "../pages/public/Confirm";
import PrivateLayout from "../layouts/PrivateLayout";
import Home from "../pages/private/Home";
import Respaldar from "../pages/private/Respaldar";
import ForgotPassword from "../pages/public/ForgotPassword";

const ROUTES = {
	PUBLIC: {
		INDEX: "/",
		REGISTER: "/register",
		CONFIRM: "/confirmacion",
		FORGOT: "/forgot-password",
	},
    PRIVATE: {
        INDEX: "/home",
		RESPALDAR: "/home/respaldar",
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
			{
				path: ROUTES.PUBLIC.FORGOT,
				element: <ForgotPassword />,
			},
		],
	},
	{
		path: "/home",
		element: <PrivateLayout />,
		children: [{ index: true, element: <Home /> }, {
			element: <Respaldar/>,
			path: "/home/respaldar",
        }],
	},
]);

export default router;
export { ROUTES };
