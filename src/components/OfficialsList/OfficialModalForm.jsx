import { useEffect } from "react";
import { useState } from "react";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import InputUser from "../UserList/InputUser";

const schemaOfficial = Yup.object({
	username: Yup.string()
		.min(3, "El tamaño mínimo es 3 carácteres")
		.required("Campo requerido"),
	nombre: Yup.string()
		.min(3, "El tamaño mínimo es 3 carácteres")
		.required("Campo requerido"),
	apellido: Yup.string()
		.min(3, "El tamaño mínimo es 3 carácteres")
		.required("Campo requerido"),
	cedula: Yup.string()
		.min(7, "El tamaño mínimo es 7 carácteres").max(8, "El tamaño máximo es 8 carácteres")
		.required("Campo requerido"),
	email: Yup.string().email().required("Campo requerido"),
	phone: Yup.string()
		.min(11, "El tamaño mínimo es 11 carácteres").max(11, "El tamaño máximo es 11 carácteres")
		.required("Campo requerido"),
	password: Yup.string()
		.matches(
			/^[a-zA-Z0-9]{3,30}$/,
			"La contraseña necesita como mínimo 3 caracteres"
		)
		.required("Campo requerido"),
});

const schemaEditOfficial = Yup.object({
	username: Yup.string()
		.min(3, "El tamaño mínimo es 3 carácteres")
		.required("Campo requerido"),
	nombre: Yup.string()
		.min(3, "El tamaño mínimo es 3 carácteres")
		.required("Campo requerido"),
	apellido: Yup.string()
		.min(3, "El tamaño mínimo es 3 carácteres")
		.required("Campo requerido"),
	cedula: Yup.string()
		.min(7, "El tamaño mínimo es 7 carácteres").max(8, "El tamaño máximo es 8 carácteres")
		.required("Campo requerido"),
	email: Yup.string().email().required("Campo requerido"),
	phone: Yup.string()
		.min(11, "El tamaño mínimo es 11 carácteres").max(11, "El tamaño máximo es 11 carácteres")
		.required("Campo requerido"),
});

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

	const [errors, setErrors] = useState({});

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
				try {
					await schemaEditOfficial.validate(data, {
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

				if (Object.values(data).includes("")) {
					toast.error("Ningun campo puede estar vacio");
					return;
				}

				if (formData.password != "") {
					data.password = formData.password;
				}

				data.roleId = role;

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
				try {
					await schemaOfficial.validate(formData, {
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
			<h2 className="w-full p-5 md:p-7 lg:p-9 bg-[#073d0b] rounded-tl-[15px] rounded-tr-[15px] shadow text-white text-xl lg:text-2xl 2xl:text-4xl font-bold font-['Poppins'] text-center">
				{edit ? "Editar" : "Añadir"} Funcionario
			</h2>

			<form
				onSubmit={handleSubmit}
				className=" flex flex-wrap gap-5 items-center content-center justify-center w-[100%]  bg-white p-8 rounded-lg ">
				<div className="w-full flex-col justify-start items-start gap-2.5 inline-flex">

					<InputUser
						type="text"
						name="username"
						placeholder="Introduzca su nombre de usuario"
						value={formData.username}
						handleChange={handleChange}
						label="Nombre de usuario"
						error={errors.username}
					/>

					<InputUser
						type="text"
						name="nombre"
						placeholder="Introduzca su nombre"
						value={formData.nombre}
						handleChange={handleChange}
						label="Nombre"
						error={errors.nombre}
					/>

					<InputUser
						type="text"
						name="apellido"
						placeholder="Introduzca su apellido"
						value={formData.apellido}
						handleChange={handleChange}
						label="Apellido"
						error={errors.apellido}
					/>

					<InputUser
						type="text"
						name="cedula"
						placeholder="XX.XXX.XXX"
						value={formData.cedula}
						handleChange={handleChange}
						label="Cedula de Identidad"
						error={errors.cedula}
					/>

					<InputUser
						type="email"
						name="email"
						placeholder="ejemplo@hotmail.com"
						value={formData.email}
						handleChange={handleChange}
						label="Email:"
						error={errors.email}
					/>

					<InputUser
						type="password"
						name="password"
						placeholder="XXXXXXXX"
						value={formData.password}
						handleChange={handleChange}
						label="Contraseña:"
						error={errors.password}
					/>

					<InputUser
						type="text"
						name="phone"
						placeholder="04XX-000-0000"
						value={formData.phone}
						handleChange={handleChange}
						label="Teléfono"
						error={errors.phone}
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
