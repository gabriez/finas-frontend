import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PrivateLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
