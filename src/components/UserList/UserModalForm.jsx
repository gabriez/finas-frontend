import React, { useState } from "react";
import { useEffect } from "react";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";


const UserModalForm = ({ 
    user, edit = false, hanldeModalClose
}) => {

    const [roles, setRoles] = useState ([]);
  const [formData, setFormData] = useState({
    username: user.username ?? "",
    nombre: user.nombre ?? "",
    apellido: user.apellido ?? "",
    email: user.email ?? "",
    password: user.password ?? "",
    rol: user.rol ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(roles)

  useEffect(() => {
    const getRoles = async () => {
        try {
            let result = await FINASAPI.getRoles();
            if (result.status) {
                setRoles(result.data)
            } else {
                toast.error("Ocurrió un error del lado del servidor. Por favor recargue la pagina");
            }
        } catch (error) {
            console.log(error);
            toast.error("Ocurrió un error del lado del servidor. Por favor recargue la pagina");
        }
    };
    getRoles()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
        <h2
          className="w-[579px] p-9 bg-[#073d0b] rounded-tl-[15px] rounded-tr-[30px] shadow text-white text-4xl font-bold font-['Poppins'] text-center">
            {edit ? "Editar" : "Añadir"} Usuario
        </h2>
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-5 items-center content-center justify-center bg-white p-8  rounded-lg "
    >
      <div className="w-[410px] h-20 flex-col justify-start items-start gap-2.5 inline-flex">
        <label
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="username"
        >
          Nombre de usuario
        </label>

        <input
          type="text"
          name="username"
          placeholder="Introduzca su username"
          value={formData.username}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="nombre"
        >
          Nombre
        </label>

        <input
          type="text"
          name="nombre"
          placeholder="Introduzca su nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="apellido"
        >
          Apellido
        </label>

        <input
          type="text"
          name="apellido"
          placeholder="Introduzca su apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="email"
        >
          Email:
        </label>

        <input
          type="email"
          name="email"
          placeholder="ejemplo@hotmail.com"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="password"
        >
          Contraseña:
        </label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="XXXXXXXX"
          value={formData.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />

        <label
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="rol"
        >
          Rol:
          <select
            name="rol"
            id="rol"
            placeholder="Seleciona un rol"
            value={formData.rol}
            onChange={handleChange}
            className="shadow  border rounded w-full h-[50px] py-2 px-8 text-gray-700 inline-flex"
          >
            <option
              value=""
              className="text-[#a3a9b2] text-xl font-normal font-['Inter'] leading-relaxed"
              disabled
            >
              Seleccione el rol del usuario
            </option>
            <option value="usuario">Usuario</option>
            <option value="supervisor">Supervisor</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>

        <button
          type="submit"
          className=" bg-[#3CAC38] hover:bg-[#063A0A] mx-[8rem] my-[2rem] text-white font-bold text-xl py-2 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl"
        >
          Guardar
        </button>
      </div>
    </form>
    </>
  );
};

export default UserModalForm;
