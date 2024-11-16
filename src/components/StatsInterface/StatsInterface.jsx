import React from "react";
import LineChart from "../../components/StatsInterface/LineChart/LineChart";
import BarChart from "../../components/StatsInterface/BarChart/BarChart";


function StatsInterface() {
	return (
		<div className="min-h-screen flex flex-col items-center p-4">
				<div className="w-full max-w-7xl mr-10 bg-white shadow-md rounded-xl p-4">
					<h1 className="text-black text-[40px] font-bold font-['Poppins']">
						Estadística de Proyectos Mensual
					</h1>
            	<LineChart/>
            </div>

			<div className="w-full max-w-7x1 grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
				<div className="bg-white shadow-md rounded-xl p-4 ml-56">
						<h1 className="text-black text-[40px] font-bold font-['Poppins']">
							Proyectos por Municipio
						</h1>
					<BarChart />
				</div>

				<div className="bg-white shadow-md rounded-xl p-4 mr-64">
						<h1 className="text-black text-[40px] font-bold font-['Poppins']">
							Proyectos por Encargado
						</h1>
					<BarChart />
				</div>
			</div>
		</div>
	);
}

export default StatsInterface;
