import { createBrowserRouter } from "react-router-dom";
import Estadisticas from "../pages/private/Estadisticas";
import Layout from "../layouts/Layout";
import LayoutPrivate from "../layouts/LayoutPrivate";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import Confirm from "../pages/public/Confirm";
import ForgotPassword from "../pages/public/ForgotPassword";
import Proyectos from "../pages/private/Proyectos";
import Usuarios from "../pages/private/Usuarios";
import Reportes from "../pages/private/Reportes";
import Restaurar from "../pages/private/Restaurar";
import Respaldar from "../pages/private/Respaldar";

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
      {
        path: routes.PUBLIC.FORGOT,
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: "/Home",
    element: <LayoutPrivate />,
    children: [
      {
        index: true,
        element: <Proyectos />,
      },
      {
        path: "Configuracion",
        children: [
          {
            path: "Usuarios",
            element: <Usuarios />,
          },
          {
            path: "Respaldar",
            element: <Respaldar />,
          },
          {
            path: "Restaurar",
            element: <Restaurar />,
          },
        ],
      },
      {
        path: "Reportes",
        element: <Reportes />,
      },
      {
        path: "Estadisticas",
        element: <Estadisticas />,
      },
    ],
  },
]);

export default router;
export { routes };
