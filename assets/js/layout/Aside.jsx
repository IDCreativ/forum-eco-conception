import React, { useState, useEffect, useContext } from "react";
import generalConfigurationAPI from "../services/generalConfigurationAPI";
import Programmes from "../layout/blocks/Programmes";
import Questions from "../layout/blocks/Questions";
import Sondages from "../layout/blocks/Sondages";
import Feedbacks from "../layout/blocks/Feedbacks";



import changeStatus from "../services/ws/changeStatus";
// import elementsInteractions from "../services/ws/elementsInteractions";

const Aside = ({socket}) => {

	const [modules, setModules] = useState([]);

	const fetchModules = async () => {
		try {
			const dataConfig = await generalConfigurationAPI.findConfig();
			setModules(dataConfig.modules);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchModules();
		socket.on('moduleStatus', changeStatus.moduleStatus);
		console.log("On modifie le statut du module");
	}, []);

	return (
		<>
			<div className="sidebar">
				<nav>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						<a
							className="col nav-block active px-0"
							id="nav-programme-tab"
							data-bs-toggle="tab"
							data-bs-target="#nav-programme"
							role="tab"
							aria-controls="nav-programme"
							aria-selected="false"
						>
							<img src="img/list-light.svg" alt="" />
							<span>Programme</span>
						</a>
						{modules.map((module, index) => (
							<a
								key={index}
								className="col nav-block px-0"
								id={"nav-" + module.slug + "-tab"}
								data-bs-toggle="tab"
								data-bs-target={"#nav-" + module.slug}
								role="tab"
								aria-controls={"nav-" + module.slug}
								aria-selected="true"
								style={module.active ? { display: "flex" } : { display: "none" }}
							>
								<img
									src={"img/" + module.slug + ".svg"}
									alt={module.name}
								/>
								<span>{module.name}</span>
							</a>
						))}
					</div>
				</nav>
				<div className="tab-content" id="nav-tabContent">
					{/* Programmes */}
					<div
						className="tab-pane fade show active"
						id="nav-programme"
						role="tabpanel"
						aria-labelledby="nav-programme-tab"
					>
						<div className="tab-content-wrapper-program">
							<Programmes />
						</div>
					</div>
					{/* Fin de Programmes */}
					{modules.map((module, index) => (
						<div
							key={index}
							className="tab-pane fade"
							id={"nav-" + module.slug}
							role="tabpanel"
							aria-labelledby={"nav-" + module.slug + "-tab"}
						>
							<div className={"tab-content-wrapper-" + module.slug}>
								{module.slug === "sondages" && (
									<Sondages socket={socket} />
								) || module.slug === "questions-reponses" && (
									<Questions socket={socket} />
								) || module.slug === "feedback" && (
									<Feedbacks />
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Aside;
