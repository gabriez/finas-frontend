import { useState } from "react";
import { TITLE } from "../../constants";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";

const Respaldar = () => {
	document.title = `${TITLE} - Respaldar`;

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

						<input
							type="text"
							name="email"
							onChange={handleChange}
							value={data.email}
							placeholder="Introduzca su email"
							className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>
					<div className="w-full flex md:flex-row flex-col gap-2 md:gap-10 items-center pb-2 md:pb-5">
						<label
							className="w-full md:w-[20%] text-gray-700 text-lg font-bold"
							htmlFor="password">
							Contraseña
						</label>

						<input
							type="password"
							name="password"
							value={data.password}
							onChange={handleChange}
							placeholder="Introduzca su contraseña"
							className="shadow appearance-none border rounded w-full py-3 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<button
						type="submit"
						className=" bg-[#3CAC38] hover:bg-[#063A0A]  mx-auto text-white font-bold text-xl py-2 px-20 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
						Respaldar
					</button>
				</div>
			</form>
		</div>
	);
};

export default Respaldar;
