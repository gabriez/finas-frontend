import { useState } from "react"

import InputText from "../../components/Forms/InputText"

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
        <button type="submit" className=" py-5 px-20 rounded-full bg-[#5DF153] font-bold text-[#333] w-[100%] box-shadow-md">Iniciar Sesion</button>
    </form>
  )
}

export default Login