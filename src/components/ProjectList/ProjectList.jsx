import React, { useEffect, useState } from "react";
import ButtonAdd from "../Forms/ButtonAdd";
import Table from "../Table/Table";
import { LuFilePlus2 } from "react-icons/lu";
import Pagination from "../Pagination/Pagination";
import CustomModal from "../../components/modal/CustomModal"; // Importa el Modal
import { LuEye } from "react-icons/lu";
import ProjectModalForm from "./ProjectModalForm";
import { toast } from "react-toastify";
import { FINASAPI } from "../../lib/FinasApi";
import { formatDate } from "../helpers/lib";

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
				icon={<LuEye className="w-6 h-6" />}>
				Ver Más
			</ButtonAdd>
		</td>
	</tr>
));

const ProjectList = () => {
	const [officials, setOfficials] = useState([]);
	const [municipios, setMunicipios] = useState([]);
	const [status, setStatus] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [loader, setLoader] = useState(false);
	const [projects, setProjects] = useState([]);
	const [showData, setShowData] = useState(false);
	const [showProject, setShowProject] = useState({});

	const handleModalOpen = () => {
		setShowModal(true);
	};

	const handleModalClose = () => {
		setShowProject({});
		setShowModal(false);
		setShowData(false);
	};

	useEffect(() => {
		const getProjects = async () => {
			try {
				setLoader(true);
				let result = await FINASAPI.getProjects();
				if (result.status) setProjects(result.data);
				else toast.error(result.message);
			} catch (error) {
				console.log("error in getProjects > ", error);
				toast.error("Ocurrio un error, recarga la pagina");
			}
			setLoader(false);
		};
		getProjects();
	}, []);

	useEffect(() => {
		const initialRequest = async () => {
			try {
				let [municipiosRes, encargadosRes, statesRes] = await Promise.all([
					FINASAPI.getMunicipios(),
					FINASAPI.getUsers("encargado"),
					FINASAPI.getStates(),
				]);
				if (municipiosRes.status) setMunicipios(municipiosRes.data);
				if (encargadosRes.status) setOfficials(encargadosRes.data);
				if (statesRes.status) setStatus(statesRes.data);
			} catch (error) {
				console.log("error in initialRequest > ", error);
				toast.error("Ocurrio un error, recarga la pagina");
			}
		};
		initialRequest();
	}, []);

	return (
		<div className="text-white flex flex-col justify-center min-h-screen items-center py-14 overflow-x-hidden">
			<div className="flex 2xl:w-[1600px] w-[90vw] items-center justify-between border-b-2 mb-4 pb-2 border-[#5df153]">
				<h1 className="text-white text-[26px] sm:text-[30px] lg:text-[34px] 2xl:text-[40px] font-bold font-['Poppins']">
					Lista de Proyectos
				</h1>
				<ButtonAdd
					classNameCustom={" w-[160px] sm:w-[244px] "}
					icon={<LuFilePlus2 className="w-5 h-5 relative" />}
					onClick={handleModalOpen}>
					Registrar Proyecto
				</ButtonAdd>
			</div>
			<div className="overflow-x-auto 2xl:w-[1600px] w-[90vw] ">
				<Table
					classNameCustom={"2xl:w-[1600px] xl:w-[90vw] w-[1200px] mx-auto "}
					dataMap={
						Array.isArray(projects) && projects.length > 0 ? (
							projects.map((project, index) => (
								<tr
									key={index}
									className="w-[1600px] border-t-2 border-[#eeeeee] text-sm lg:text-md 2xl:text-lg">
									<td className="pl-20 py-10">{project.titulo}</td>
									<td>{project.municipio}</td>
									<td>{project.propuesta}</td>
									<td>{formatDate(project.lapsoInicio)}</td>
									<td>{formatDate(project.lapsoFin)}</td>
									<td>{project.status}</td>
									<td className="flex items-center h-[100px] justify-center">
										<ButtonAdd
											onClick={() => {
												setShowProject(project);
												handleModalOpen();
												setShowData(true);
											}}
											classNameCustom={" w-[161px] h-[59px]"}
											icon={<LuEye className="w-6 h-6" />}>
											Ver Más
										</ButtonAdd>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td></td>
								<td></td>
								<td className="py-10">
									{loader ? (
										<span className="loader ml-{75%}"></span>
									) : (
										<span className=" text-right block ">No hay proyectos</span>
									)}
								</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						)
					}>
					<tr className="text-[#063a0a] font-semibold font-['Poppins'] border-b-2 border-[#063a0a] text-[16px] 2xl:text-xl bg-[#bdd8bf] ">
					<th className="xl:pl-20 pl-14 py-6">Nombre</th>
						<th>Municipio</th>
						<th>Propuesta</th>
						<th>Fecha de Inicio</th>
						<th>Fecha de Cierre</th>
						<th>Estatus</th>
						<th className="w-26"></th>
					</tr>
				</Table>
			</div>
			<Pagination />
			<CustomModal
				className="w-[90%] md:w-[60%] lg:w-[50%] h-[90%] overflow-scroll overflow-x-hidden bg-white rounded-[30px] shadow "
				show={showModal}
				onClose={handleModalClose}>
				<ProjectModalForm
					municipios={municipios}
					officials={officials}
					status={status}
					handleCloseModal={handleModalClose}
					project={showProject}
					setProjects={setProjects}
					showData={showData}
				/>
			</CustomModal>
		</div>
	);
};

export default ProjectList;
