import { Outlet, useLocation, useNavigate } from "react-router-dom";
import imagenPrueba from "../assets/imagenPrueba.png";
import logoFinas from "../assets/logo-finas.png";
import { ROUTES } from "../routes/Routes";
import AuthProvider, { useAuth } from "../context/AuthProvider";
import PrivateLayout from "./PrivateLayout";
import PublicLayout from "./PublicLayout";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
	const location = useLocation();
	const path = location.pathname;
	const navigate = useNavigate();
	const { userData, setUserData } = useAuth();

	const checkTime = (endTime) => {
		return endTime > new Date().valueOf() / 1000;
	};

	const redirectHome = () => {
		return (
			!path.includes(ROUTES.PRIVATE.INDEX) && navigate(ROUTES.PRIVATE.INDEX)
		);
	};

	useEffect(() => {
		let session = sessionStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
		if (!session) {
			sessionStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
			// toast.error("Debes iniciar sesión nuevamente");
			setUserData({
				username: "",
				email: "",
				rol: "",
				endTime: "",
				id: 0
			});
			navigate(ROUTES.PUBLIC.INDEX);
      return
		}

		if (userData.endTime && userData.rol && userData.email) {
			if (!checkTime(userData.endTime)) {
				navigate(ROUTES.PUBLIC.INDEX);
				setUserData({
					username: "",
					email: "",
					rol: "",
					endTime: "",
					id: 0
				});
				sessionStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
				toast.error("Debes iniciar sesión nuevamente");
			} else {
				redirectHome();
			}
		} else if (session) {
			let jtw = jwtDecode(session);
			if (checkTime(jtw.exp)) {
				setUserData({
					username: jtw.username,
					email: jtw.email,
					rol: jtw.rol,
					endTime: jtw.exp,
					id: jtw.id
				});
				redirectHome();
			} else {
				navigate(ROUTES.PUBLIC.INDEX);
				sessionStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
				toast.error("Debes iniciar sesión nuevamente");
			}
		} else {
			navigate(ROUTES.PUBLIC.INDEX);
			toast.error("Debes iniciar sesión");
		}
	}, [path]);

	return (
		<>
			{path.includes("home") ? <PrivateLayout /> : <PublicLayout />}
			<ToastContainer/>
		</>
	);
};

export default Layout;
