import React, { useEffect, useState } from "react";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthProvider";
import { formatInputDate } from "../helpers/lib";

const ProjectModalForm = ({
	showData = false,
	project,
	handleCloseModal,
	setProjects,
	officials,
	municipios,
	status,
}) => {
	const [parroquias, setParroquias] = useState([]);
	const [sectores, setSectores] = useState([]);
	const [changeLocations, setChangeLocations] = useState({
		municipio: false,
		parroquia: false,
	});
	const [disable, setDisable] = useState(true);
	const { userData } = useAuth();

	const [formData, setFormData] = useState({
		titulo: project.titulo ?? "",
		descripcion: project.descripcion ?? "",
		encargadoId: project.encargadoId ?? 0,
		userId: project.userId ?? userData.id,
		// enteEmail: project.enteEmail ?? "",
		municipioId: project.municipioId ?? "",
		municipio: project.municipio ?? "",
		parroquiaId: project.parroquiaId ?? "",
		parroquia: project.parroquia ?? "",
		sectorId: project.sectorId ?? "",
		sector: project.sector ?? "",
		puntoDeReferencia: project.puntoDeReferencia ?? "",
		coordenadasLat: project.coordenadasLat ?? "",
		coordenadasLong: project.coordenadasLong ?? "",
		anoAprob: project.anoAprob ?? 0,
		propuesta: project.propuesta ?? "",
		status: project.status ?? "",
		observacion: project.observacion ?? "",
		lapsoInicio: project.lapsoInicio
			? formatInputDate(project.lapsoInicio)
			: "",
		lapsoFin: project.lapsoFin ? formatInputDate(project.lapsoFin) : "",
		ente: project.ente ?? "",
		// entePhone: project.entePhone ?? "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		let locationRegex = /municipio|parroquia|sector/;
		setFormData((prevState) => {
			if (locationRegex.test(name)) {
				let newValues = value.split("-");
				return {
					...prevState,
					[name]: newValues[1],
					[`${name}Id`]: newValues[0],
				};
			}
			return { ...prevState, [name]: value };
		});
		if (locationRegex.test(name)) {
			setChangeLocations((prevState) => {
				return {
					...prevState,
					[name]: !prevState[name],
				};
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (showData) {
				if (Object.values(formData).includes("")) {
					toast.error("Ningun campo puede estar vacio");
					return;
				}
				let data = {
					...formData,
					encargadoId: parseInt(formData.encargadoId),
					anoAprob: parseInt(formData.anoAprob),
				};
				let result = await FINASAPI.editProjects(data, project.id);
				if (result.status) {
					toast.success("Edito el proyecto exitosamente");
					setProjects((prevState) => {
						return prevState.map((item) => {
							if (item.id == project.id) {
								return {
									...formData,
								};
							}
							return item;
						});
					});

					handleCloseModal();
				}
			} else {
				console.log(formData);
				if (Object.values(formData).includes("")) {
					toast.error("Ningun campo puede estar vacio");
					return;
				}
				let data = {
					...formData,
					encargadoId: parseInt(formData.encargadoId),
					anoAprob: parseInt(formData.anoAprob),
				};
				let result = await FINASAPI.createProjects(data);
				if (result.status) {
					setProjects((prevState) => {
						return [...prevState, result.data];
					});
					toast.success("Creo el proyecto exitosamente");
					handleCloseModal();
				}
			}
		} catch (error) {
			console.log(error);
			toast.error("Ocurrio un error creando el proyecto");
		}
	};

	useEffect(() => {
		const getParroquias = async () => {
			try {
				let result = await FINASAPI.getParroquia(formData.municipioId);
				if (result.status) {
					setParroquias(result.data);
				}
			} catch (error) {
				console.log("error in getParroquias > ", error);
				toast.error("Ocurrio un error, recarga la pagina");
			}
		};
		if (formData.municipio != "") {
			getParroquias();
		}
		const getSector = async () => {
			try {
				let result = await FINASAPI.getSector(
					formData.municipioId,
					formData.parroquiaId
				);
				if (result.status) {
					setSectores(result.data);
				}
			} catch (error) {
				console.log("error in getSector > ", error);
				toast.error("Ocurrio un error, recarga la pagina");
			}
		};
		if (formData.municipio != "" && formData.parroquia != "") getSector();
	}, [changeLocations.municipio, changeLocations.parroquia]);

	return (
		<>
			<h2 className="w-[50] p-9 bg-[#073d0b] rounded-tl-[15px] rounded-tr-[15px] shadow text-white text-4xl font-bold font-['Poppins'] text-center">
				Crear Proyecto
			</h2>

			<form
				onSubmit={handleSubmit}
				className=" flex flex-wrap gap-5 items-center content-center  w-[90%] bg-white p-10 mx-auto  justify-start rounded-lg ">
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="titulo">
						Nombre del Proyecto
					</label>
					<input
						type="text"
						name="titulo"
						placeholder="Introduzca el nombre del Proyecto"
						value={formData.titulo}
						id="titulo"
						onChange={handleChange}
						disabled={showData && disable}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="ente">
						Ente
					</label>
					<input
						type="text"
						name="ente"
						placeholder="Seleccione el ente al que pertenece"
						value={formData.ente}
						disabled={showData && disable}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="propuesta">
						Propuesta
					</label>
					<input
						type="text"
						name="propuesta"
						placeholder="Introduzca la propuesta del Proyecto"
						value={formData.propuesta}
						disabled={showData && disable}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="descripcion">
						Descripción
					</label>
					<input
						type="text"
						id="descripcion"
						name="descripcion"
						placeholder="Escriba una breve descripcion de la obra"
						value={formData.descripcion}
						disabled={showData && disable}
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
						htmlFor="municipio">
						Municipio
					</label>
					<select
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="municipio"
						id="municipio"
						disabled={showData && disable}
						onChange={handleChange}
						value={formData.municipioId + "-" + formData.municipio}>
						<option value="">Seleccione un municipio</option>

						{Array.isArray(municipios) && municipios.length > 0 ? (
							municipios.map((municipio) => (
								<option
									key={municipio.cod_municipio_ine + municipio.municipio_ine}
									value={
										municipio.cod_municipio_ine + "-" + municipio.municipio_ine
									}>
									{municipio.municipio_ine}
								</option>
							))
						) : (
							<option value="">Cargando...</option>
						)}
					</select>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="parroquia">
						Parroquia
					</label>
					<select
						name="parroquia"
						onChange={handleChange}
						disabled={showData && disable}
						value={formData.parroquiaId + "-" + formData.parroquia}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
						<option value=""> Selecciona una parroquia </option>
						{Array.isArray(parroquias) && parroquias.length > 0 ? (
							parroquias.map((parroquia) => (
								<option
									key={parroquia.cod_parroquia_ine + parroquia.parroquia_ine}
									value={
										parroquia.cod_parroquia_ine + "-" + parroquia.parroquia_ine
									}>
									{parroquia.parroquia_ine}
								</option>
							))
						) : (
							<option value="">Cargando...</option>
						)}
					</select>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="sector">
						Sector
					</label>
					<select
						type="sector"
						name="sector"
						disabled={showData && disable}
						onChange={handleChange}
						value={formData.sectorId + "-" + formData.sector}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
						<option value=""> Selecciona un sector </option>
						{Array.isArray(sectores) && sectores.length > 0 ? (
							sectores.map((sector) => (
								<option
									key={sector.id_comunidad_ine + sector.nombre_comunidad}
									value={
										sector.id_comunidad_ine + "-" + sector.nombre_comunidad
									}>
									{sector.nombre_comunidad}
								</option>
							))
						) : (
							<option value="">Cargando...</option>
						)}
					</select>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="puntoDeReferencia">
						Punto de referencia
					</label>
					<textarea
						name="puntoDeReferencia"
						placeholder="Introduzca un punto de referencia"
						disabled={showData && disable}
						value={formData.puntoDeReferencia}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="coordenadasLat">
						Coordenadas Latitud
					</label>
					<input
						type="text"
						name="coordenadasLat"
						placeholder="Introduzca las Coordenadas de Latitud"
						disabled={showData && disable}
						value={formData.coordenadasLat}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="coordenadasLong">
						Coordenadas Longitud
					</label>
					<input
						type="text"
						name="coordenadasLong"
						placeholder="Introduzca las Coordenadas de Longitud"
						disabled={showData && disable}
						value={formData.coordenadasLong}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 w-[45%] justify-self-start">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="anoAprob">
						Año de Aprobacion
					</label>
					<input
						type="text"
						name="anoAprob"
						placeholder="Introduzca el año de aprobacion"
						disabled={showData && disable}
						value={formData.anoAprob}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<h2 className="w-[100%] pl-9 text-4xl font-bold text-[#063A0A] pb-4">
					Funcionario
				</h2>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="encargadoId">
						Funcionario Encargado
					</label>
					<select
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="encargadoId"
						id=""
						disabled={showData && disable}
						onChange={handleChange}
						defaultValue={formData.encargadoId}>
						<option value="">Seleccione un encargado</option>
						{officials.length > 0 ? (
							officials.map((encargado) => (
								<option
									key={encargado.id + encargado.nombre}
									value={encargado.id}>
									{encargado.nombre} {encargado.apellido}
								</option>
							))
						) : (
							<option value="">Cargando...</option>
						)}
					</select>
				</div>
				<h2 className="w-[100%] pl-9 text-4xl font-bold text-[#063A0A] pb-4">
					Estatus
				</h2>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="status">
						Estatus
					</label>
					<select
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						name="status"
						disabled={showData && disable}
						id="status"
						onChange={handleChange}
						defaultValue={formData.status}>
						<option value="">Seleccione un status</option>
						{Array.isArray(status) && status.length > 0 ? (
							status.map((status) => (
								<option className="capitalize" key={status} value={status}>
									{status}
								</option>
							))
						) : (
							<option value="">Cargando...</option>
						)}
					</select>
				</div>
				<div className="mb-4 w-[92%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="message">
						Observacion
					</label>
					<textarea
						name="observacion"
						placeholder="Introduzca la Observacion"
						value={formData.observacion}
						disabled={showData && disable}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4  w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="lapsoInicio">
						Lapso Inicio
					</label>
					<input
						type="date"
						name="lapsoInicio"
						placeholder="Seleccione el lapso de Inicio"
						disabled={showData && disable}
						value={formData.lapsoInicio}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="mb-4 w-[45%]">
					<label
						className="block text-gray-700 text-lg font-bold mb-2"
						htmlFor="lapsoFin">
						Lapso Final
					</label>
					<input
						type="date"
						name="lapsoFin"
						placeholder="Seleccione el lapso de fin"
						disabled={showData && disable}
						value={formData.lapsoFin}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>
				<div className="flex justify-between w-full items-center">
					{showData && (
						<label className="inline-flex flex-col cursor-pointer">
							<span className="mb-2 font-medium text-gray-700">
								Editar el proyecto
							</span>
							<input type="checkbox" value="" className="sr-only peer" onClick={() => {
								setDisable(prevState => !prevState);
							}} />
							<div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:bg-[#3CAC38] dark:peer-focus:bg-[#063A0A] dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3CAC38]"></div>
						</label>
					)}

					<button
						type="submit"
						disable={showData && disable}
						className=" bg-[#3CAC38] hover:bg-[#063A0A]  text-white font-bold text-xl py-2 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
						{showData ? "Editar" : "Guardar"}
					</button>
					{showData && (
						<button
							type="button"
							className=" bg-[#3CAC38] hover:bg-[#063A0A]  text-white font-bold text-xl py-2 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
							Imprimir PDF
						</button>
					)}
				</div>
			</form>
		</>
	);
};

export default ProjectModalForm;
