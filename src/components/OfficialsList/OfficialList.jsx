import React, { useState } from 'react'
import ButtonAdd from '../Forms/ButtonAdd';
import Table from '../Table/Table';
import UserPlus from "../../icons/UserPlus";
import Pagination from '../Pagination/Pagination';
import { IoCreateOutline } from "react-icons/io5";
import CustomModal from '../../components/modal/CustomModal';
import { TiDelete } from "react-icons/ti";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const users = [
  { name: "", email: "", username: "", role: "" },
  { name: "", email: "", username: "", role: "" },
  { name: "", email: "", username: "", role: "" },
  { name: "", email: "", username: "", role: "" },
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

const OfficialList = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };


 return (
    <div className="text-white flex flex-col justify-center min-h-screen items-center">
      <div className="flex 2xl:w-[1600px] w-[1200px] justify-between border-b-2 mb-4 pb-2 border-[#5df153]">
        <h1 className="text-white text-[40px] font-bold font-['Poppins']">Lista de Funcionarios</h1>
        <ButtonAdd classNameCustom={" w-[244px] h-[59px]"} icon={<UserPlus className="w-10 h-10 relative"/>} onClick={handleModalOpen}>Añadir Funcionarios</ButtonAdd>
      </div>
        <Table classNameCustom={ " 2xl:w-[1600px] w-[1200px] h-[482px] " } dataMap={dataMap}>
            <tr className="text-[#063a0a] text-2xl font-semibold font-['Poppins'] border-b-2 border-[#063a0a] bg-[#bdd8bf]">
              <th className="pl-20">Nombre</th>
              <th>Cedula de Identidad</th>
              <th>Correo Electrónico</th>
              <th>Teléfono</th>
              <th className="w-25"></th>
            </tr>
        </Table>
        <Pagination/>
        <CustomModal className="w-[579px] h-[753px] bg-white rounded-[30px] shadow overflow-hidden" show={showModal} onClose={handleModalClose}>
        <h2 className="w-[579px] p-9 bg-[#073d0b] rounded-tl-[15px] rounded-tr-[30px] shadow text-white text-4xl font-bold font-['Poppins'] text-center">Editar Funcionarios</h2>
        {/* Aquí puedes añadir un formulario o cualquier otro contenido */}
      </CustomModal>
    </div>  
  )
}


export default OfficialList;