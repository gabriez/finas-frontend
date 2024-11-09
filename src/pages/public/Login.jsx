import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputText from "../../components/Forms/InputText";
import { ROUTES } from "../../routes/Routes";
import ButtonSubmit from "../../components/Forms/ButtonSubmit";
import { FINASAPI } from "../../lib/FinasApi";
import { LOCAL_STORAGE_KEYS, TITLE } from "../../constants";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthProvider";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	document.title = `${TITLE} - Inicio de sesión`

	const { setUserData } = useAuth();

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let result = await FINASAPI.login(formData.email, formData.password);
			if (result.status) {
				let jwt = jwtDecode(result.data.token);
				let exp = jwt.exp;

				sessionStorage.setItem(
					LOCAL_STORAGE_KEYS.accessToken,
					result.data.token
				);
				setUserData({
					username: result.data.user.username,
					email: result.data.user.email,
					rol: result.data.user.rol,
					endTime: exp,
					id: result.data.user.id
				});
				toast.success("Inició sesión exitosamente");
				navigate(ROUTES.PRIVATE.INDEX);
			} else {
        console.log(result.data)
				toast.error(result.message);
			}
		} catch (error) {
			console.log(error);
			toast.error("Ocurrio un error en el inicio de sesión");
		}
	};

	return (
		<>
			<form className="flex-col" onSubmit={handleSubmit}>
				<div className="pb-2">
					<InputText
						type="email"
						name="email"
						placeholder="Email"
						handleChange={handleChange}
						value={formData.email}
					/>
				</div>
				<div className="pb-5">
					{/* <label htmlFor="password" className="text-"></label> */}
					<InputText
						type="password"
						name="password"
						placeholder="Contraseña"
						handleChange={handleChange}
						value={formData.password}
					/>
				</div>
				<ButtonSubmit text="Iniciar Sesion" />
			</form>
			<button className="text-white pt-8 w-[100%]">
				<Link href="#" to={ROUTES.PUBLIC.FORGOT} className="text-xl">
					Has olvidado tu contraseña?
				</Link>
			</button>
			<button className="text-white w-[100%]">
				<Link href="#" to={ROUTES.PUBLIC.REGISTER} className="text-xl">
					Registrarse
				</Link>
			</button>
		</>
	);
};

export default Login;
