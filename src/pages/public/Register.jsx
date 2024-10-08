import { useState } from "react";
import { Link } from "react-router-dom";
import InputText from "../../components/Forms/InputText";
import { ROUTES } from "../../routes/Routes";
import ButtonSubmit from "../../components/Forms/ButtonSubmit";

const Register = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="flex-col">
        <div className="pb-2">
          <InputText
            type="text"
            name="Nombre"
            placeholder="Nombre y Apellido"
            handleChange={handleChange}
            value={formData.text}
          />
        </div>
        <div className="pb-2">
          <InputText
            type="email"
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="pb-5">
          {/* <label htmlFor="password" className="text-"></label> */}
          <InputText
            type="password"
            name="password"
            placeholder="Contraseña"
            handleChange={handleChange}
            value={formData.password}
          />
        </div>
        <ButtonSubmit text="Registrarse" />
      </form>
    </>
  );
};

export default Register;
