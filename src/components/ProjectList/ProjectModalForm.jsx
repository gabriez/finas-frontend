import React, { useState } from 'react'

const ProjectModalForm = () => {
    const [formData, setFormData] = useState({
        titulo: "",
		descripcion: "",
		encargadoId: 0,
		userId: 0,
		enteEmail: "",
		estadoId: 0,
		estado: "",
		municipioId: 0,
		municipio: "",
		parroquiaId: 0,
		parroquia: "",
		sectorId: 0,
		sector: "",
		puntoDeReferencia: "",
		coordenadasLat: "",
		coordenadasLong: "",
		anoAprob: 0,
		poblacionBeneficiada: "",
		propuesta: "",
		status: "",
		observacion: "",
		lapsoInicio: "",
		lapsoFin: "",
		ente: "",
		entePhone: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };

  return (
    <>
    <h2 className="w-[50] p-9 bg-[#073d0b] rounded-tl-[15px] rounded-tr-[15px] shadow text-white text-4xl font-bold font-['Poppins'] text-center">
    Editar Proyecto
  </h2>

  <form
    onSubmit={handleSubmit}
    className=" flex flex-wrap gap-5 items-center content-center justify-center w-[100%] bg-white p-8  rounded-lg "
  >
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="titulo"
      >
        Nombre del Proyecto
      </label>
      <input
        type="text"
        name="titulo"
        placeholder="Introduzca el nombre del Proyecto"
        value={formData.titulo}
        id="titulo"
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="name"
      >
        Ente
      </label>
      <input
        type="text"
        name="Ente"
        placeholder="Seleccione el ente al que pertenece"
        value={formData.name}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Propuesta
      </label>
      <input
        type="text"
        name="propuesta"
        placeholder="Introduzca la propuesta del Proyecto"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="descripcion"
      >
        Descripción
      </label>
      <input
        type="text"
        id="descripcion"
        name="descripcion"
        placeholder="Escriba una breve descripcion de la obra"
        value={formData.descripcion}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <h2 className="w-[100%] pl-9 text-4xl font-bold text-[#063A0A] pb-4">
      Ubicación
    </h2>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Municipio
      </label>
      <input
        type="email"
        name="email"
        placeholder="Seleccione un Municipio
      "
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Parroquia
      </label>
      <select name="parroquia">

      </select>
      <input
        type="email"
        name="email"
        placeholder="Seleccione una Parroquia"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Sector
      </label>
      <input
        type="email"
        name="email"
        placeholder="Seleccione un Sector"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="message"
      >
        Punto de referencia
      </label>
      <textarea
        name="message"
        placeholder="Introduzca un punto de referencia"
        value={formData.message}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Coordenadas Latitud
      </label>
      <input
        type="email"
        name="email"
        placeholder="Introduzca las Coordenadas de Latitud"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Coordenadas Longitud
      </label>
      <input
        type="email"
        name="email"
        placeholder="Introduzca las Coordenadas de Longitud"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Ano de Aprobacion
      </label>
      <input
        type="email"
        name="email"
        placeholder="Seleccione el Ano de aprobacion"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <h2 className="w-[100%] pl-9 text-4xl font-bold text-[#063A0A] pb-4">
      Funcionario
    </h2>
    <div className="mb-4 mr-[25rem] w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Funcionario Encargado
      </label>
      <input
        type="email"
        name="email"
        placeholder="Seleccione al funcionario encargado"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <h2 className="w-[100%] pl-9 text-4xl font-bold text-[#063A0A] pb-4">
      Estatus
    </h2>
    <div className="mb-4 w-[92%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="message"
      >
        Observacion
      </label>
      <textarea
        name="message"
        placeholder="Introduzca la Observacion"
        value={formData.message}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4  w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Lapso Inicio
      </label>
      <input
        type="email"
        name="email"
        placeholder="Seleccione el lapso de Inicio"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <div className="mb-4 w-[45%]">
      <label
        className="block text-gray-700 text-lg font-bold mb-2"
        htmlFor="email"
      >
        Lapso Inicio
      </label>
      <input
        type="email"
        name="email"
        placeholder="Seleccione el lapso de fin"
        value={formData.email}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
    <button
      type="submit"
      className=" bg-[#3CAC38] hover:bg-[#063A0A] mx-[50rem] text-white font-bold text-xl py-2 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl"
    >
      Guardar
    </button>
  </form>
  </>
  )
}

export default ProjectModalForm