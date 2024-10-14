import React from 'react'
import ButtonAdd from '../Forms/ButtonAdd';
import Table from '../Table/Table';
import UserPlus from "../../icons/UserPlus";
import Pagination from '../Pagination/Pagination';
import { IoCreateOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";

const users = [
  { name: "The Sliding", email: "ejemplo@gmail.com", username: "username.example12", role: "Administrador" },
  { name: "Witchy Woman", email: "ejemplo@gmail.com", username: "username.example12", role: "Trabajador" },
  { name: "Shining Star", email: "ejemplo@gmail.com", username: "username.example12", role: "Trabajador" },
  { name: "Shining Star", email: "ejemplo@gmail.com", username: "username.example12", role: "Trabajador" },
];

const dataMap = users.map((user, index) => (
  <tr key={index} className="w-[1600px] border-t-2 border-[#eeeeee]">
    <td className="pl-20">{user.name}</td>
    <td>{user.email}</td>
    <td>{user.username}</td>
    <td>{user.role}</td>
    <td className="gap-9">
      <button className="mr-4"><IoCreateOutline size={40} /></button>
      <button><TiDelete size={40} /></button>
    </td>
  </tr>
));

const UserList = () => (
    <div className="text-white flex flex-col justify-center min-h-screen items-center">
      <div className="flex 2xl:w-[1600px] w-[1200px] justify-between border-b-2 mb-4 pb-2 border-[#5df153]">
        <h1 className="text-white text-[40px] font-bold font-['Poppins']">Lista de Usuarios</h1>
        <ButtonAdd classNameCustom={" w-[244px] h-[59px]"} icon={<UserPlus className="w-10 h-10 relative"/>}>Añadir Usuario</ButtonAdd>
      </div>
        <Table classNameCustom={ " 2xl:w-[1600px] w-[1200px] h-[482px] " } dataMap={dataMap}>
            <tr className="text-[#063a0a] text-2xl font-semibold font-['Poppins'] border-b-2 border-[#063a0a] bg-[#bdd8bf]">
              <th className="pl-20">Nombre</th>
              <th>Correo Electrónico</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th className="w-25"></th>
            </tr>
        </Table>
        <Pagination/>
    </div>  
  )


export default UserList;