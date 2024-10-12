import { useState } from "react";
import { Link } from "react-router-dom";

import InputText from "../../components/Forms/InputText";
import { ROUTES } from "../../routes/Routes";
import ButtonSubmit from "../../components/Forms/ButtonSubmit";

const Respaldar = () => {
  const [formData, setFormData] = useState({
    server: "",
    user: "",
    password: "",
    database: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    console.log("Datos del formulario:", formData);
  };

  return (
    <div className= "w-[1125px] h-[0px] border-2 border-[#5df153]">
      {/* Respaldo de la Base de Datos del Sistema */}
      <h1 className="text-white 
      text-[40px] 
      font-bold 
      font-['Poppins']">Respaldo de la Base de Datos del Sistema</h1>


     
      <form onSubmit={handleSubmit} className=" w-[560px] h-[63px] rounded-[5px] border border-[#063a0a]">
      <div className="text-[#063a0a] text-2xl font-medium font-['Poppins']">Usuario</div>
        <div className="pb-4">
          <InputText
            type="text"
            name="user"
            placeholder="Usuario"
            handleChange={handleChange}
            value={formData.user}
          />
        </div>
        <div className="pb-4">
          <InputText
            type="password"
            name="password"
            placeholder="Contraseña"
            handleChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="pb-4">
          <InputText
            type="text"
            name="database"
            placeholder="Base de Datos"
            handleChange={handleChange}
            value={formData.database}
          />
        </div>
        
        
        <ButtonSubmit text="Respaldar" />
      </form>
    </div>
  );
};

export default Respaldar;
