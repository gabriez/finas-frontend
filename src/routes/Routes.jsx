import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Confirm from "../pages/public/Confirm";
import PrivateLayout from "../layouts/PrivateLayout";
import Home from "../pages/private/Home";
import ForgotPassword from "../pages/public/ForgotPassword";
import Usuarios from "../pages/private/Usuarios"; 
import Funcionarios from "../pages/private/Funcionarios";
import Proyectos from "../pages/private/Proyectos";
import Respaldar from "../pages/private/Respaldar";
import Restaurar from "../pages/private/Restaurar";
import AuthProvider from "../context/AuthProvider";
import Estadisticas from "../pages/private/Estadisticas";

const ROUTES = {
	PUBLIC: {
		INDEX: "/",
		REGISTER: "/register",
		CONFIRM: "/confirmacion",
		FORGOT: "/forgot-password",
	},
    PRIVATE: {
        INDEX: "/home",
		USERS: "/home/users",
		OFFICIALS: "/home/officials",
		PROJECTS: "/home/projects",
		SUPPORT: "/home/support",
		RESTORE: "/home/restore",
		STATISTICS: "/home/statistics",
    }
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthProvider />,
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
			{
				path: ROUTES.PRIVATE.INDEX,
				children: [{ index: true, element: <Home /> },
					{
						path: ROUTES.PRIVATE.USERS,
						element: <Usuarios/>
					},
					{
						path: ROUTES.PRIVATE.OFFICIALS,
						element: <Funcionarios/>
					},
					{
						path: ROUTES.PRIVATE.PROJECTS,
						element: <Proyectos/>
					},
					{
						path: ROUTES.PRIVATE.SUPPORT,
						element: <Respaldar/>
					},
					{
						path: ROUTES.PRIVATE.RESTORE,
						element: <Restaurar/>
					},
					{
						path: ROUTES.PRIVATE.STATISTICS,
						element: <Estadisticas/>
					},
				],
			},
		],
	},
	
]);

export default router;
export { ROUTES };
