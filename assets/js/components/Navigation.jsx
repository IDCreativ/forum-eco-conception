import React, { useEffect, useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import AuthAPI from "../services/authAPI";
import generalConfigurationAPI from "../services/generalConfigurationAPI";

import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => {

	const location = useLocation();
	const navigate = useNavigate();

	const [displayUser, setDisplayUser] = useState(null);

	// const shouldRedirect = location.pathname !== "/login";

	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const { appUser, setAppUser } = useContext(UserContext);

    useEffect(() => {
		if (appUser) {
			setDisplayUser("Bienvenue " + appUser.firstname + " " + appUser.lastname.slice(0, 1) + ".");
		}
	}, [appUser]);
	
	const [generalConfiguration, setGeneralConfiguration] = useState([{}]);

	const fetchConfiguration = async () => {
		try {
			const dataConfig = await generalConfigurationAPI.findConfig();
			setGeneralConfiguration(dataConfig);
			console.log("dataConfig", dataConfig);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchConfiguration();
	}, []);

	const handleLogout = () => {
		AuthAPI.logout();
		setIsAuthenticated(false);
		setAppUser({
			firstname: "",
			lastname: "",
			email: "",
			telephone: "",
			roles: [],
		});
		toast.info("Vous êtes désormais déconnecté.");
	};

	return (
		<header>
			<div className="container">
				<div className="row">
					<div className="col header-wrapper">
						<div className="event-host">
							<div className="logo-wrapper">
								<img
									className="custom-logo"
									src="img/default/yourlogo.svg"
									alt=""
								/>
							</div>
							<h1 className="host-infos">
								<span className="site-title">{generalConfiguration.title}</span>
								<span className="site-subtitle">
									{generalConfiguration.tagline}
								</span>
							</h1>
						</div>
						<nav>
							<ul>
								<li>
									<NavLink to="/" title="">
										Accueil
									</NavLink>
								</li>

								{(!isAuthenticated && (
									<>
										<li>
											<NavLink
												to="/login"
												className="btn btn-primary text-light btn-sm"
											>
												<FontAwesomeIcon
													icon={[
														"fal",
														"sign-in-alt",
													]}
													className="fa-fw"
												/>
											</NavLink>
										</li>
										<li>
											<NavLink to="/register" className="btn btn-secondary text-light btn-sm">
												<i className="fal fa-user-plus"></i>
											</NavLink>
										</li>
									</>
								)) || (
									<>
										<li>{displayUser}</li>
										<li className="nav-item">
											<button
												className="btn btn-danger text-light btn-sm"
												onClick={handleLogout}
											>
												<FontAwesomeIcon
													icon={[
														"fal",
														"sign-out-alt",
													]}
													className="fa-fw"
												/>
											</button>
										</li>
									</>
								)}
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
