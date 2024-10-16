import { useEffect } from "react";
import { useState } from "react";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";

const OfficialModalForm = ({
	user,
	edit = false,
	handleModalClose,
	setAllUsers,
}) => {
	const [role, setRole] = useState(0);
	// const [touchedPassword, setTouchedPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: user.username ?? "",
		nombre: user.nombre ?? "",
		apellido: user.apellido ?? "",
		cedula: user.cedula ?? "",
		email: user.email ?? "",
		phone: user.phone ?? "",
		password: user.password ?? "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (edit) {
				let data = {
					username: formData.username,
					nombre: formData.nombre,
					apellido: formData.apellido,
					cedula: formData.cedula,
					email: formData.email,
					phone: formData.phone,
				};

				if (Object.values(data).includes("")) {
					toast.error("Ningun campo puede estar vacio");
					return;
				}

				if (formData.password != "") {
					data.password = formData.password;
				}

				let result = await FINASAPI.patchUsers(user.id, data);

				if (result.status) {
					toast.success("Se actualizo correctamente el usuario");
					setAllUsers((prevState) => {
						return prevState.map((item) => {
							if (item.id == user.id) {
								return {
									...item,
									username: formData.username,
									nombre: formData.nombre,
									apellido: formData.apellido,
									cedula: formData.cedula,
									email: formData.email,
									phone: formData.phone,
								};
							}
							return item;
						});
					});
					handleModalClose();
				} else {
					toast.error(result.message);
				}
			} else {
				if (Object.values(formData).includes("")) {
					toast.error("Ningun campo puede estar vacio");
					return;
				}

				let result = await FINASAPI.createUsers({
					...formData,
					roleId: role,
				});

				if (result.status) {
					toast.success("Se creo correctamente el usuario");
					setAllUsers((prevState) => {
						return [...prevState, result.data];
					});
					handleModalClose();
				} else {
					toast.error(result.message);
				}
			}
		} catch (error) {
			console.log(error);
			toast.error("Ocurrio un error en el servidor");
		}
	};

	useEffect(() => {
		const getRoles = async () => {
			try {
				let result = await FINASAPI.getRoles();
				if (result.status) {
					let roleId = result.data.find((item) => item.rol == "encargado");
					setRole(roleId.id);
				} else {
					toast.error(
						"Ocurrió un error del lado del servidor. Por favor recargue la página"
					);
				}
			} catch (error) {
				console.log(error);
				toast.error(
					"Ocurrió un error del lado del servidor. Por favor recargue la página"
				);
			}
		};
		getRoles();
	}, []);

	return (
		<>
			<h2 className="w-[579px] p-9 bg-[#073d0b] rounded-tl-[15px] rounded-tr-[30px] shadow text-white text-4xl font-bold font-['Poppins'] text-center">
				{edit ? "Editar" : "Añadir"} Funcionario
			</h2>

			<form
				onSubmit={handleSubmit}
				className=" flex flex-wrap gap-5 items-center content-center justify-center w-[100%]  bg-white p-8 rounded-lg ">
				<div className="w-[410px] flex-col justify-start items-start gap-2.5 inline-flex">
					<label
						className="block text-gray-700 text-lg font-bold mt-2"
						htmlFor="username">
						Nombre de usuario
					</label>

					<input
						type="text"
						name="username"
						placeholder="Introduzca su nombre de usuario"
						value={formData.username}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
					<label
						className="block text-gray-700 text-lg font-bold mt-2"
						htmlFor="nombre">
						Nombre
					</label>

					<input
						type="text"
						name="nombre"
						placeholder="Introduzca su nombre"
						value={formData.nombre}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					<label
						className="block text-gray-700 text-lg font-bold mt-2"
						htmlFor="apellido">
						Apellido
					</label>

					<input
						type="text"
						name="apellido"
						placeholder="Introduzca su apellido"
						value={formData.apellido}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					<label
						className="block text-gray-700 text-lg font-bold mt-2"
						htmlFor="cedula">
						Cédula de Identidad
					</label>

					<input
						type="text"
						name="cedula"
						placeholder="18.XXX.XXX"
						value={formData.cedula}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					<label
						className="block text-gray-700 text-lg font-bold mt-2"
						htmlFor="email">
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
						htmlFor="password">
						Contraseña:
					</label>

					<input
						type="password"
						name="password"
						id="password"
						placeholder="XXXXXX"
						value={formData.password}
						onChange={handleChange}
						// onClick={() => setTouchedPassword(true)}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					<label
						className="block text-gray-700 text-lg font-bold mt-2"
						htmlFor="phone">
						Teléfono:
					</label>

					<input
						type="text"
						name="phone"
						placeholder="04XX-000-0000"
						value={formData.phone}
						onChange={handleChange}
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>

					<button
						type="submit"
						className=" bg-[#3CAC38] hover:bg-[#063A0A] mx-[8rem] my-[2rem] text-white font-bold text-xl py-2 px-10 rounded focus:outline-none focus:shadow-outline hover:shadow-2xl">
						Guardar
					</button>
				</div>
			</form>
		</>
	);
};

export default OfficialModalForm;
