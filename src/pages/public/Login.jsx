import { useState } from "react"
import { Link } from "react-router-dom";

import InputText from "../../components/Forms/InputText"
import { routes } from "../../routes/Routes";
import ButtonSubmit from "../../components/Forms/ButtonSubmit";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""  
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value}
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <form className="flex-col">
          <div  className="pb-2">
              <InputText type="email" name="email" placeholder="email" 
                handleChange={handleChange} value={formData.email}
              />
          </div>
          <div className="pb-5">
              {/* <label htmlFor="password" className="text-"></label> */}
              <InputText type="password" name="password" placeholder="Contraseña"
                handleChange={handleChange} value={formData.password}
              />
          </div>
          <ButtonSubmit text="Iniciar Sesion" />
      </form>
      <button className="text-white pt-8 w-[100%]"><Link href="#" to={routes.PUBLIC.FORGOT} className="text-xl">Has olvidado tu contraseña?</Link></button>
      <button className="text-white w-[100%]"><Link href="#" to={routes.PUBLIC.REGISTER} className="text-xl">Registrarse</Link></button>
    </>
  )
}

export default Login