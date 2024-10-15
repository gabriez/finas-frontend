import React, { useState } from "react";
import ButtonAdd from "../Forms/ButtonAdd";
import Table from "../Table/Table";
import { LuFilePlus2 } from "react-icons/lu";
import Pagination from "../Pagination/Pagination";
import CustomModal from "../../components/modal/CustomModal"; // Importa el Modal
import { LuEye } from "react-icons/lu";

const projects = [
  {
    name: "The Sliding",
    municipio: "ejemplo",
    propuesta: "propuesta.",
    startDate: "2024",
    endDate: "2029",
    status: "abierto",
  },
  {
    name: "Witchy Woman",
    municipio: "ejemplo",
    propuesta: "propuesta.",
    startDate: "2019",
    endDate: "2029",
    status: "abierto",
  },
  {
    name: "Shining Star",
    municipio: "ejemplo",
    propuesta: "propuesta.",
    startDate: "2019",
    endDate: "2029",
    status: "abierto",
  },
  {
    name: "Shining Star",
    municipio: "ejemplo",
    propuesta: "propuesta.",
    startDate: "2019",
    endDate: "2029",
    status: "abierto",
  },
];

const dataMap = projects.map((project, index) => (
  <tr key={index} className="w-[1600px] border-t-2 border-[#eeeeee]">
    <td className="pl-20">{project.name}</td>
    <td>{project.municipio}</td>
    <td>{project.propuesta}</td>
    <td>{project.startDate}</td>
    <td>{project.endDate}</td>
    <td>{project.status}</td>
    <td className="flex items-center h-full justify-center">
      <ButtonAdd
        classNameCustom={" w-[161px] h-[59px]"}
        icon={<LuEye className="w-6 h-6" />}
      >
        Ver Más
      </ButtonAdd>
    </td>
  </tr>
));

const ProjectList = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // function MyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
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
    <div className="text-white flex flex-col justify-center min-h-screen items-center">
      <div className="flex 2xl:w-[1600px] w-[1200px] justify-between items-center border-b-2 mb-4 pb-2 border-[#5df153]">
        <h1 className="text-white text-[40px] font-bold font-['Poppins']">
          Lista de Proyectos
        </h1>
        <ButtonAdd
          classNameCustom={" w-[244px] h-[45px]"}
          icon={<LuFilePlus2 className="w-5 h-5 relative" />}
          onClick={handleModalOpen}
        >
          Registrar Proyecto
        </ButtonAdd>
      </div>
      <Table
        classNameCustom={" 2xl:w-[1738px] w-[1200px] h-[482px] "}
        dataMap={dataMap}
      >
        <tr className="text-[#063a0a] text-2xl font-semibold font-['Poppins'] border-b-2 border-[#063a0a] bg-[#bdd8bf]">
          <th className="pl-20">Nombre</th>
          <th>Municipio</th>
          <th>Propuesta</th>
          <th>Fecha de Inicio</th>
          <th>Fecha de Cierre</th>
          <th>Estatus</th>
          <th className="w-26"></th>
        </tr>
      </Table>
      <Pagination />
      <CustomModal
        className="w-[50%] h-[90%] overflow-scroll overflow-x-hidden bg-white rounded-[30px] shadow "
        show={showModal}
        onClose={handleModalClose}
      >
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
              htmlFor="name"
            >
              Nombre del Proyecto
            </label>
            <input
              type="text"
              name="name"
              placeholder="Introduzca el nombre del Proyecto"
              value={formData.name}
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
              name="name"
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
              htmlFor="email"
            >
              Descripcion
            </label>
            <input
              type="email"
              name="email"
              placeholder="Escriba una breve descripcion de la obra"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <h2 className="w-[100%] pl-9 text-4xl font-bold text-[#063A0A] pb-4">
            Ubicacion
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
      </CustomModal>
    </div>
  );
};

export default ProjectList;
