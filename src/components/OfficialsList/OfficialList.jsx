import React, { useEffect, useState } from "react";
import ButtonAdd from "../Forms/ButtonAdd";
import Table from "../Table/Table";
import UserPlus from "../../icons/UserPlus";
import Pagination from "../Pagination/Pagination";
import { IoCreateOutline } from "react-icons/io5";
import CustomModal from "../../components/modal/CustomModal";
import { TiDelete } from "react-icons/ti";
import Modal from "react-modal";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";
import OfficialModalForm from "./OfficialModalForm";
import { ITEMS_PER_PAGE } from "../../constants";

Modal.setAppElement("#root");

const OfficialList = () => {
	const [showModal, setShowModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [loader, setLoader] = useState(false);
	const [userEdit, setUserEdit] = useState({});
	const [users, setUsers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1); // Track the current page
	const [totalUsers, setTotalUsers] = useState(0);
	const totalPages = Math.ceil(totalUsers / ITEMS_PER_PAGE); // Calculate total pages

	const handleModalOpen = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const getData = async () => {
			try {
				setLoader(true);
				const offset = (currentPage - 1) * ITEMS_PER_PAGE;

				let result = await FINASAPI.getUsers("encargado", offset);
				if (result.status) {
					setUsers(result.data.users);
					setTotalUsers(result.data.count); // Set the total project count
				} else {
					toast.error(result.message);
				}
			} catch (error) {
				console.log("error in UsersList > ", error);
				toast.error("Ocurrio un error, recarga la pagina");
			} finally {
				setLoader(false);
			}
		};
		getData();
	}, [currentPage]);

	return (
		<div className="text-white flex flex-col justify-center py-[12rem] items-center">
			<div className="flex 2xl:w-[1600px] w-[90vw] items-center justify-between border-b-2 mb-4 pb-2 border-[#5df153]">
				<h1 className="text-white text-[26px] sm:text-[30px] lg:text-[34px] 2xl:text-[40px] font-bold font-['Poppins']">
					Lista de Funcionarios
				</h1>
				<ButtonAdd
					classNameCustom={" w-[160px] lg:w-[200px] 2xl:w-[244px] "}
					icon={
						<UserPlus className="w-6 h-6 lg:w-7 lg:h-7 2xl:w-10 2xl:h-10 relative" />
					}
					onClick={() => {
						handleModalOpen();
						setUserEdit({});
						setEdit(false);
					}}>
					Añadir Funcionarios
				</ButtonAdd>
			</div>
			<div className="overflow-x-auto 2xl:w-[1600px] w-[90vw] ">
				<Table
					classNameCustom={"2xl:w-[1600px] xl:w-[90vw] w-[1200px] mx-auto "}
					dataMap={
						users.length > 0 ? (
							users.map((user, index) => (
								<tr
									key={index}
									className="w-[1600px] border-t-2 border-[#eeeeee] text-sm lg:text-md 2xl:text-lg">
									<td className="pl-20 py-10">
										{user.nombre} {user.apellido}
									</td>
									<td>{user.cedula}</td>
									<td>{user.email}</td>
									<td>{user.phone}</td>
									<td className="gap-9">
										<button
											className="mr-4"
											onClick={() => {
												setEdit(true);
												setUserEdit(user);
												handleModalOpen();
											}}>
											<IoCreateOutline size={40} />
										</button>
										{/* <button>
										<TiDelete size={40} />
									</button> */}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td className="py-10">
									{loader ? (
										<span className="loader ml-{75%}"></span>
									) : (
										<span className=" text-right block ">
											No hay encargados
										</span>
									)}
								</td>
								<td></td>
								<td></td>
							</tr>
						)
					}>
					<tr className="text-[#063a0a] font-semibold font-['Poppins'] border-b-2 border-[#063a0a] text-[16px] 2xl:text-xl bg-[#bdd8bf] ">
						<th className="xl:pl-20 pl-14 py-6">Nombre</th>
						<th>Cedula de Identidad</th>
						<th>Correo Electrónico</th>
						<th>Teléfono</th>
						<th className="w-25"></th>
					</tr>
				</Table>
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => setCurrentPage(page)}
			/>{" "}
			<CustomModal
				className="w-[85vw] md:w-[579px] h-[80vh] overflow-y-scroll bg-white rounded-[30px]  shadow overflow-hidden"
				show={showModal}
				onClose={handleModalClose}>
				<OfficialModalForm
					edit={edit}
					user={userEdit}
					handleModalClose={handleModalClose}
					setAllUsers={setUsers}
				/>
			</CustomModal>
		</div>
	);
};

export default OfficialList;
