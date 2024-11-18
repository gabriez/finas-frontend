import { Link, useNavigate } from "react-router-dom";
import logoFinas from "../assets/logo-finas.png";
import { ROUTES } from "../routes/Routes";
import { useAuth } from "../context/AuthProvider";
import { LOCAL_STORAGE_KEYS } from "../constants";
import AccordionItem from "./Accordion/AccordionItem";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Drawer,
} from "@mui/material";
import { RiArrowDownSLine } from "react-icons/ri";

import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const renderLinks = (links, userData, sidebar = false) => {
	return links.map((item) => {
		const classNavBar = sidebar
			? "hover:text-white"
			: "hover:text-white  lg:text-md text-[16px] md:block hidden";
		if (sidebar && item.accordion) {
			return (
				<Accordion
					sx={{
						background: "transparent!important",
						boxShadow: "0 0 0 0",
						".MuiAccordionSummary-content": {
							m: 0,
						},
						".MuiButtonBase-root": {
							p: 0,
							minHeight: "auto",
						},
					}}
					key={`accordion-${item.text}-${item.items.length}`}>
					<AccordionSummary
						expandIcon={<RiArrowDownSLine />}
						aria-controls="panel1-content"
						id={`panel-header-${item.text}`}>
						<p>{item.text}</p>
					</AccordionSummary>
					<AccordionDetails>
						{renderLinks(item.items, userData, true)}
					</AccordionDetails>
				</Accordion>
			);
		}

		if (item.accordion) {
			return (
				<AccordionItem
					key={`accordion-${item.text}-${item.items.length}`}
					title={item.text}>
					{renderLinks(item.items, userData, false)}
				</AccordionItem>
			);
		}

		if (item.rol === "") {
			return (
				<li className={classNavBar} key={item.url}>
					<Link href="#" to={item.url}>
						{item.text}
					</Link>
				</li>
			);
		}

		if (item.rol === userData.rol) {
			return (
				<li className={classNavBar} key={item.url}>
					<Link href="#" to={item.url}>
						{item.text}
					</Link>
				</li>
			);
		}
		return;
	});
};

const Navbar = () => {
	const links = [
		{
			text: "Inicio",
			url: ROUTES.PRIVATE.INDEX,
			accordion: false,
			items: [],
			rol: "",
		},
		{
			text: "Proyectos",
			url: ROUTES.PRIVATE.PROJECTS,
			accordion: false,
			items: [],
			rol: "",
		},
		{
			text: "Configuración",
			url: "",
			accordion: true,
			rol: "",
			items: [
				{
					text: "Usuarios",
					url: ROUTES.PRIVATE.USERS,
					accordion: false,
					items: [],
					rol: "",
				},
				{
					text: "Encargados",
					url: ROUTES.PRIVATE.OFFICIALS,
					accordion: false,
					items: [],
					rol: "",
				},
				{
					text: "Respaldar",
					url: ROUTES.PRIVATE.BACKUP,
					accordion: false,
					items: [],
					rol: "admin",
				},
				{
					text: "Restaurar",
					url: ROUTES.PRIVATE.RESTORE,
					accordion: false,
					items: [],
					rol: "admin",
				},
			],
		},
		{
			text: "Estadísticas",
			url: ROUTES.PRIVATE.STATISTICS,
			accordion: false,
			items: [],
			rol: "",
		},
	];
	const { userData, setUserData } = useAuth();
	const [drawer, setDrawer] = useState(false);

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
		<header className="bg-gradient-to-r from-[#063A0A] to-[#5DF153] flex items-center justify-between px-6 lg:px-10">
			<Link href="#" to={ROUTES.PUBLIC.INDEX}>
				<img
					src={logoFinas}
					alt="logo de finas"
					className="w-[100px] sm:w-[120px] md:w-[10vw] lg:w-[8vw] py-2"
				/>
			</Link>
			<nav className="mx-10">
				<ul className="gap-10 list-none font-semibold text-[#063A0A] text-lg flex">
					{renderLinks(links, userData)}

					<li className="hover:text-white md:block hidden lg:text-md text-[16px]">
						<Link href="#" to={ROUTES.PUBLIC.INDEX} onClick={endSession}>
							Cerrar Sesión
						</Link>
					</li>
					<li className="hover:text-white md:hidden block">
						<button
							onClick={() => {
								setDrawer((prevState) => !prevState);
							}}>
							<GiHamburgerMenu />
						</button>
					</li>
				</ul>
				<Drawer
					anchor={"right"}
					open={drawer}
					onClose={() => {
						setDrawer(false);
					}}>
					<div className="min-[600px]:w-[30vw] h-screen bg-gradient-to-b to-[#063A0A] from-[#5DF153]">
						<ul className="flex flex-col pt-6 pl-6 gap-2 list-none font-semibold text-[#063A0A] text-lg">
							{renderLinks(links, userData, true)}

							<li className="hover:text-white">
								<Link href="#" to={ROUTES.PUBLIC.INDEX} onClick={endSession}>
									Cerrar Sesión
								</Link>
							</li>
						</ul>
					</div>
				</Drawer>
			</nav>
		</header>
	);
};

export default Navbar;
