import React, { useEffect, useState } from 'react'
import ButtonAdd from '../Forms/ButtonAdd';
import Table from '../Table/Table';
import UserPlus from "../../icons/UserPlus";
import Pagination from '../Pagination/Pagination';
import CustomModal from '../../components/modal/CustomModal';
import { IoCreateOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { FINASAPI } from '../../lib/FinasApi';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// const users = [
//   { name: "The Sliding", email: "ejemplo@gmail.com", username: "username.example12", role: "Administrador" },
//   { name: "Witchy Woman", email: "ejemplo@gmail.com", username: "username.example12", role: "Trabajador" },
//   { name: "Shining Star", email: "ejemplo@gmail.com", username: "username.example12", role: "Trabajador" },
//   { name: "Shining Star", email: "ejemplo@gmail.com", username: "username.example12", role: "Trabajador" },
// ];

// const dataMap = users.map((user, index) => (
//   <tr key={index} className="w-[1600px] border-t-2 border-[#eeeeee]">
//     <td className="pl-20">{user.name}</td>
//     <td>{user.email}</td>
//     <td>{user.username}</td>
//     <td>{user.role}</td>
//     <td className="gap-9">
//       <button className="mr-4"><IoCreateOutline size={40} /></button>
//       <button><TiDelete size={40} /></button>
//     </td>
//   </tr>
// ))

const UserList = () => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([])

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    rol: "",
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

  useEffect(() => {
    const getData = async () => {
      try {
        let result = await FINASAPI.getUsers('all');
        setUsers(result.data)
      } catch (error) {
        console.log("error in UsersList > ", error)
        toast.error("Ocurrio un error, recarga la pagina")
      }
    }
    getData()
  }, [])

  return (
    <div className="text-white flex flex-col justify-center min-h-screen items-center">
      <div className="flex 2xl:w-[1600px] w-[1200px] justify-between border-b-2 mb-4 pb-2 border-[#5df153]">
        <h1 className="text-white text-[40px] font-bold font-['Poppins']">Lista de Usuarios</h1>
        <ButtonAdd classNameCustom={" w-[244px] h-[59px]"} icon={<UserPlus className="w-10 h-10 relative"/>} onClick={handleModalOpen}>Añadir Usuario</ButtonAdd>
      </div>
        <Table classNameCustom={ " 2xl:w-[1600px] w-[1200px] " } dataMap={
          users.map((user, index) => (
            <tr key={index} className="w-[1600px] border-t-2 border-[#eeeeee]">
              <td className="pl-20 py-10">{user.nombre} {user.apellido}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role.rol}</td>
              <td className="gap-9">
                <button className="mr-4"><IoCreateOutline size={40} /></button>
                <button><TiDelete size={40} /></button>
              </td>
            </tr>
          ))
        }>
            <tr className="text-[#063a0a] text-2xl font-semibold font-['Poppins'] border-b-2 border-[#063a0a] bg-[#bdd8bf]">
              <th className="pl-20">Nombre</th>
              <th>Correo Electrónico</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th className="w-25"></th>
            </tr>
        </Table>
        <Pagination/>
        <CustomModal
          className="w-[579px] h-[753px] bg-white rounded-[30px] shadow overflow-hidden"
          show={showModal}
          onClose={handleModalClose}
        >

        <h2
          className="w-[579px] p-9 bg-[#073d0b] rounded-tl-[15px] rounded-tr-[30px] shadow text-white text-4xl font-bold font-['Poppins'] text-center">
          Editar Usuario
        </h2>

        <form
        onSubmit={handleSubmit}
        className=" flex flex-wrap gap-5 items-center content-center justify-center w-[100%] bg-white p-8  rounded-lg "
        >
        
        <div className="w-[410px] h-20 flex-col justify-start items-start gap-2.5 inline-flex">

        <label 
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="name"
        >
          Nombre
        </label>

          <input
            type="text"
            name="name"
            placeholder="Introduzca su nombre"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        

        <label 
          className="block text-gray-700 text-lg font-bold mt-2"
          htmlFor="lastName"
        >
          Apellido
        </label>

          <input
            type="text"
            name="lastName"
            placeholder="Introduzca su apellido"
            value={formData.lastName}
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
          <option value="" className="text-[#a3a9b2] text-xl font-normal font-['Inter'] leading-relaxed" disabled>Seleccione el rol del usuario</option>
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
        

      </CustomModal>
    </div>  
  )
};

export default UserList;