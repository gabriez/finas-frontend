import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PrivateLayout = () => {
  return (
    <>
    
    <Navbar/>

    <div className="bg-[url(/backgroundPrivateLayout.jpeg)] bg-cover bg-[#063A0A] bg-blend-multiply min-h-screen">

        <Outlet/>

    </div>
    </>
  );
};

export default PrivateLayout;
