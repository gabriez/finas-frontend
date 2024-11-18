import { useLocation, Outlet } from "react-router-dom";
import imagenPrueba from "../assets/imagenPrueba.png";
import logoFinas from "../assets/logo-finas.png";
import { ROUTES } from "../routes/Routes";

const PublicLayout = () => {
    const location = useLocation();
    const path = location.pathname;
    return (
      // className="bg-[url('./imagenPrueba.jpg')] h-screen bg-cover w-[70%]"
      <main className="flex">
        <div className="md:w-[50%] lg:w-[70%]">
          <img
            src={imagenPrueba}
            alt="imagen de construccion"
            className="h-screen bg-cover w-[100%] backdrop-brightness-50"
          />
        </div>
        <div className="w-[30%] flex justify-center items-center bg-[#053A0A] flex-col shadow-inner">
          <div className="flex-col justify-center items-center">
            <img
              src={logoFinas}
              alt="logo de finas"
              className="w-[60%] pb-5 mx-auto"
            />
            <h1 className="lg:text-3xl 2xl:text-6xl font-bold text-white pb-1">Hola de nuevo!</h1>
            <h2 className="lg:text-xl 2xl:text-3xl text-left text-white pb-5 font-medium">
              {path === ROUTES.PUBLIC.INDEX
                ? "Bienvenido de vuelta"
                : path === ROUTES.PUBLIC.REGISTER
                ? "Registrate para empezar"
                : path === ROUTES.PUBLIC.FORGOT
                ? "La contraseña"
                : ""}
            </h2>
            <Outlet />
          </div>
        </div>
      </main> )
}

export default PublicLayout