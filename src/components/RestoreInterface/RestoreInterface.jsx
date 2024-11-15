import React, { useRef, useState } from "react";
import { AiOutlineImport } from "react-icons/ai";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";

function RestoreInterface() {
	const [database, setDatabase] = useState({});
	const [dataForm, setDataForm] = useState({
		email: "",
		password: "",
	});
	const fileRef = useRef(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setDataForm((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleFile = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				try {
					const data = JSON.parse(e.target.result);
					setDatabase(data);
				} catch (error) {
					console.error("Error parsing JSON:", error);
				}
			};
			reader.readAsText(file);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (Object.values(dataForm).includes("")) {
				toast.error("Ningun campo puede estar vacio");
				return;
			}
			let data = {
				...dataForm,
				...database,
			};
			let result = await FINASAPI.importar(data);
			if (result.status) {
        setDataForm({
					email: "",
					password: "",
				});
				toast.success("Importo la base de datos exitosamente");
			} else {
				console.log(result.data);
				toast.error(result.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Ocurrio un error en el inicio de sesión");
		}
	};
	return (
		<div className="text-white flex flex-col justify-center min-h-screen pl-[8.5%]">
			<div className="flex 2xl:w-[1125px] border-b-2 mb-4 pb-2 border-[#5df153]">
				<h1 className="text-white text-[40px] font-bold font-['Poppins']">
					Restaurar la Base de Datos del Sistema
				</h1>
			</div>
			<form
				className="flex w-[992px] h-[420px] bg-white p-12  rounded-lg"
				onSubmit={handleSubmit}>
				<div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
					<div className="w-[850px] flex gap-10 items-center pb-5">
						<label
							className="w-[500px] text-gray-700 text-lg font-bold"
							htmlFor="email">
							Usuario
						</label>

						<input
							value={dataForm.email}
							onChange={handleChange}
							type="text"
							name="email"
							placeholder="Ejemplo: “root”"
							className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="w-[850px] flex gap-10 items-center pb-5">
						<label
							className="w-[500px] text-gray-700 text-lg font-bold"
							htmlFor="password">
							Contraseña
						</label>

						<input
							value={dataForm.password}
							onChange={handleChange}
							type="password"
							name="password"
							placeholder="Introduzca su contraseña"
							className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div className="w-[690px] flex gap-24 items-center">
						<label
							className="w-[690px] flex gap-24 items-center text-gray-700 text-lg font-bold"
							htmlFor="database">
							Archivo
							<button
								htmlFor="database"
								type="button"
								onClick={() => {
									console.log(fileRef);
									fileRef.current.click();
								}}
								className="z-0 bg-[#3CAC38] hover:bg-[#063A0A] w-full text-white font-bold text-xl py-3 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
								Importar archivo JSON
								<AiOutlineImport className="w-[45px] h-[32px] inline" />
							</button>
						</label>
						<input
							type="file"
							onChange={handleFile}
							id="database"
							ref={fileRef}
							style={{ visibility: "hidden", display: "none" }}
							className=" bg-[#3CAC38] hover:bg-[#063A0A] w-full text-white font-bold text-xl py-3 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl"
						/>
					</div>
					<button
						type="submit"
						className=" bg-[#3CAC38] hover:bg-[#063A0A] mx-[22rem] my-[2rem] text-white font-bold text-xl py-2 px-20 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
						Respaldar
					</button>
				</div>
			</form>
		</div>
	);
}

export default RestoreInterface;
