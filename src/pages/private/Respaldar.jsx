import { useState } from "react";
import { TITLE } from "../../constants";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";
import * as Yup from "yup";

const schemaBackup = Yup.object({
	email: Yup.string().email().required("Campo requerido"),
	password: Yup.string()
	  .matches(
		/^[a-zA-Z0-9]{3,30}$/,
		"La contraseña necesita como mínimo 3 caracteres"
	  )
	  .required("Campo requerido"),
  });
  

const Respaldar = () => {
	document.title = `${TITLE} - Respaldar`;
	const [errors, setErrors] = useState({});
	const [data, setData] = useState({
		email: "",
		password: "",
	});


	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await schemaBackup.validate(data, {
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
			let result = await FINASAPI.exportar(data.email, data.password);
			console.log(result);

			if (result.status) {
				setData({
					email: "",
					password: "",
				});
				const jsonString = JSON.stringify(result.data, null, 2);

				// Create a Blob with the JSON data and specify the MIME type
				const blob = new Blob([jsonString], { type: "application/json" });
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = "export.json";
				link.click();
				window.URL.revokeObjectURL(url);

				toast.success("Exporto la base de datos exitosamente!");
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
		<div className="text-white w-[90vw] lg:w-[60vw] flex flex-col justify-center pl-[8.5%] py-8">
			<div className="flex w-full border-b-2 mb-4 pb-2 border-[#5df153]">
				<h1 className="text-white text-[26px] sm:text-[30px] lg:text-[34px] 2xl:text-[40px] font-bold font-['Poppins']">
					Respaldo de la Base de Datos del Sistema
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
							type="text"
							name="email"
							placeholder="Introduzca su email"
							onChange={handleChange}
							value={data.email}
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
							type="password"
							name="password"
							value={data.password}
							onChange={handleChange}
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

					<button
						type="submit"
						className=" bg-[#3CAC38] hover:bg-[#063A0A]  mx-auto text-white font-bold text-xl py-2 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
						Respaldar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Respaldar;
