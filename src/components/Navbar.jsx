import { Link, useNavigate } from "react-router-dom";
import logoFinas from "../assets/logo-finas.png";
import { ROUTES } from "../routes/Routes";
import { useAuth } from "../context/AuthProvider";
import { LOCAL_STORAGE_KEYS } from "../constants";
import AccordionItem from "./Accordion/AccordionItem";
const Navbar = () => {
	const { setUserData } = useAuth();

	const endSession = () => {
		setUserData({
			username: "",
			email: "",
			rol: "",
			endTime: "",
		});
		sessionStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
	};

	// Acordeon

	return (
		<header className="bg-gradient-to-r from-[#063A0A] to-[#5DF153] flex items-center justify-between px-10">
			<img src={logoFinas} alt="logo de finas" className="w-[10%] py-2" />
			<nav className="mx-10">
				<ul className="flex pr-10 gap-10 list-none font-semibold text-[#063A0A] text-lg">
					<li className="hover:text-white">
						<Link href="#" to={ROUTES.PRIVATE.INDEX}>
							Inicio
						</Link>
					</li>
					<li className="hover:text-white">
						<Link href="#" to={ROUTES.PRIVATE.PROJECTS}>
							Proyectos
						</Link>
					</li>
					<AccordionItem title="Configuración">
						<li className="hover:text-white">
							<Link href="#" to={ROUTES.PRIVATE.USERS}>
								Usuarios
							</Link>
						</li>
						<li className="hover:text-white">
							<Link href="#" to={ROUTES.PRIVATE.OFFICIALS}>
								Encargados
							</Link>
						</li>
						<li className="hover:text-white">
							<Link href="#" to={ROUTES.PRIVATE.SUPPORT}>
								Respaldar
							</Link>
						</li>
						<li className="hover:text-white">
							<Link href="#" to={ROUTES.PRIVATE.RESTORE}>
								Restaurar
							</Link>
						</li>
					</AccordionItem>

					<li className="hover:text-white">
						<Link href="#" to={ROUTES.PRIVATE.STATISTICS}>
							Estadísticas
						</Link>
					</li>
					<li className="hover:text-white">
						<Link href="#" to={ROUTES.PUBLIC.INDEX} onClick={endSession}>
							Cerrar Sesión
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
