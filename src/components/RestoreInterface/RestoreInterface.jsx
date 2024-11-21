import React, { useRef, useState } from "react";
import { AiOutlineImport } from "react-icons/ai";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schemaRestore = Yup.object({
	email: Yup.string().email().required("Campo requerido"),
	password: Yup.string()
	  .matches(
		/^[a-zA-Z0-9]{3,30}$/,
		"La contraseña necesita como mínimo 3 caracteres"
	  )
	  .required("Campo requerido"),
  });

function RestoreInterface() {
	const [errors, setErrors] = useState({});
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
			await schemaRestore.validate(dataForm, {
			  abortEarly: false,
			});
		  } catch (err) {
			const validationErrors = {};
			err.inner.forEach((error) => {
			  if (error.path && !validationErrors[error.path]) {
				validationErrors[error.path] = error.message;
			  }
			});
			setErrors(validationErrors);
	  
			return;
		}
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
		<div className="text-white w-[80vw] flex flex-col justify-center pl-[8.5%] py-8">
			<div className="flex w-full border-b-2 mb-4 pb-2 border-[#5df153]">
				<h1 className="text-white text-[26px] sm:text-[30px] lg:text-[34px] 2xl:text-[40px] font-bold font-['Poppins']">
					Restaurar la Base de Datos del Sistema
				</h1>
			</div>
			<form
				className="flex w-full  bg-white p-12  rounded-lg"
				onSubmit={handleSubmit}>
				<div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">
					<div className="w-full flex md:flex-row flex-col gap-2 md:gap-10 items-center pb-2 md:pb-5">
						<label
							className="w-full md:w-[20%] text-gray-700 text-lg font-bold"
							htmlFor="email">
							Email
						</label>
					<div className="w-full space-y-2">
						<input
							value={dataForm.email}
							onChange={handleChange}
							type="text"
							name="email"
							placeholder="Introduzca su email"
							className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors?.email?.length > 0 && (
							<span className="block w-[100%] bg-red-500 text-white text-md py-1 px-2 rounded-md">
							{errors.email}
							</span>
						)}
					</div>
					</div>
					<div className="w-full flex md:flex-row flex-col gap-2 md:gap-10 items-center pb-2 md:pb-5">
						<label
							className="w-full md:w-[20%] text-gray-700 text-lg font-bold"
							htmlFor="password">
							Contraseña
						</label>
					<div className="w-full space-y-2">
						<input
							value={dataForm.password}
							onChange={handleChange}
							type="password"
							name="password"
							placeholder="Introduzca su contraseña"
							className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
						{errors?.password?.length > 0 && (
							<span className="block w-[100%] bg-red-500 text-white text-md py-1 px-2 rounded-md">
							{" "}
							{errors.password}
							</span>
						)}
					</div>
					</div>

					<div className="w-full flex md:flex-row flex-col items-center pb-2 md:pb-5">
						<label
							className="w-full items-center justify-start text-gray-700 text-lg font-bold flex md:flex-row flex-col gap-2 md:gap-10"
							htmlFor="database">
							<span className="w-full md:w-[16%]">Archivo</span>
							<button
								htmlFor="database"
								type="button"
								onClick={() => {
									console.log(fileRef);
									fileRef.current.click();
								}}
								className="z-0 bg-[#3CAC38] hover:bg-[#063A0A] w-full  md:w-[80%] text-white font-bold text-xl py-3 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
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
						className=" bg-[#3CAC38] hover:bg-[#063A0A]  mx-auto text-white font-bold text-xl py-2 px-5 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
						Respaldar
					</button>
				</div>
			</form>
		</div>
	);
}

export default RestoreInterface;
