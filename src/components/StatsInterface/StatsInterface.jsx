import React, { useEffect, useState } from "react";
import LineChart from "../../components/StatsInterface/LineChart/LineChart";
import BarChart from "../../components/StatsInterface/BarChart/BarChart";
import { FINASAPI } from "../../lib/FinasApi";
import { toast } from "react-toastify";

function StatsInterface() {
	const [projectsFinalized, setprojectsFinalized] = useState([]);
	const [municipiosData, setMunicipiosData] = useState([]);
	const [encargadosProjects, setEncargadosProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getStatistics = async () => {
			try {
				setLoading(true);
				let res = await FINASAPI.getStatistics();
				if (res.status) {
					setprojectsFinalized(res.data.projectsFinalized);
					setMunicipiosData(res.data.municipiosData);
					setEncargadosProjects(res.data.encargadosProjects);
				} else {
					toast.error(res.message);
				}
			} catch (error) {
				toast.error(res.message);
			} finally {
				setLoading(false);
			}
		};
		getStatistics();
	}, []);

	return (
		<div className="flex max-w-7xl w-full flex-col items-center pb-4 pt-8 mx-auto">
			<div className="w-full mr-10 bg-white shadow-md rounded-xl py-6 px-10 mx-auto">
				<h1 className="text-black md:text-[36px] mb-2 text-[40px] font-bold font-['Poppins'] pl-2">
					Estadística de Proyectos Mensual
				</h1>
				{loading ? (
					<div className="w-full flex justify-center">
						<span className="loader"></span>
					</div>
				) : projectsFinalized.length > 0 ? (
					<LineChart dataset={projectsFinalized} />
				) : (
					<span> No hay proyectos finalizados</span>
				)}
			</div>

			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
				<div className="bg-white shadow-md rounded-xl px-10 py-6">
					<h3 className="text-black md:text-[36px] mb-2 text-[40px] font-bold font-['Poppins']">
						Proyectos por Municipio
					</h3>
					{loading ? (
						<div className="w-full flex justify-center">
							<span className="loader"></span>
						</div>
					) : municipiosData.length > 0 ? (
						<BarChart dataSet={municipiosData} />
					) : (
						<span> No hay proyectos</span>
					)}
				</div>

				<div className="bg-white shadow-md rounded-xl px-10 py-6">
					<h3 className="text-black md:text-[36px] mb-2 text-[40px] font-bold font-['Poppins']">
						Proyectos por Encargado
					</h3>
					{loading ? (
						<div className="w-full flex justify-center">
							<span className="loader"></span>
						</div>
					) : municipiosData.length > 0 ? (
						<BarChart dataSet={encargadosProjects} />
					) : (
						<span> No hay proyectos</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default StatsInterface;
