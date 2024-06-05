import { Outlet } from "react-router-dom"
import  imagenPrueba from "../assets/imagenPrueba.png"
import logoFinas from "../assets/logo-finas.png"



const Layout = () => {
  return (
    // className="bg-[url('./imagenPrueba.jpg')] h-screen bg-cover w-[70%]"
  <main className="flex">
    <div className="w-[70%]">
      <img src={imagenPrueba} alt="imagen de construccion" className="h-screen bg-cover w-[100%] backdrop-brightness-50"/>
    </div >
      <div className="w-[30%] flex justify-center items-center bg-[#053A0A] flex-col shadow-inner">
        <div className="flex-col justify-center items-center">
        <img src={logoFinas} alt="logo de finas" className="w-[60%] pb-5 mx-auto"/>
        <h1 className="text-6xl font-bold text-white pb-1">Hola de nuevo!</h1>
        <h2 className="text-3xl text-left text-white pb-5 font-medium">Bienvenido de vuelta.</h2>
        <Outlet/>
        <button className="text-white pt-8 w-[100%]"><a href="#" className="text-xl">Has olvidado tu contrasena?</a></button>
        <button className="text-white w-[100%]"><a href="#" className="text-xl">Registrarse</a></button>
      </div>
    </div>
    </main>
  )
}

export default Layout
