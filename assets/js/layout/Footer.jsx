import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import generalConfigurationAPI from "../services/generalConfigurationAPI";

const Footer = (props) => {

	const [generalConfiguration, setGeneralConfiguration] = useState([{}]);
	const [logo, setLogo] = useState(undefined);
	
	useEffect(() => {
		const fetchConfiguration = async () => {
			try {
				const dataConfig = await generalConfigurationAPI.findConfig();
				setGeneralConfiguration(dataConfig);
			} catch (error) {
				console.log(error.response);
			}
		};
		fetchConfiguration();
	}, []);

	useEffect(() => {
		if (generalConfiguration.logo !== undefined) {
			setLogo(generalConfiguration.logo);
		}
	}, [generalConfiguration]);

	return (
		<>
			<footer>
				<div className="social">
					{generalConfiguration.linkedin && (
						<NavLink to={generalConfiguration.linkedin} target="_blank">
							<div className="social-wrapper">
								<img src="img/linkedin-in-brands.svg" alt="" />
							</div>
						</NavLink>
					)}
					{generalConfiguration.facebook && (
						<NavLink to={generalConfiguration.facebook} target="_blank">
							<div className="social-wrapper">
								<img src="img/facebook-f-brands.svg" alt="" />
							</div>
						</NavLink>
					)}
					{generalConfiguration.instagram && (
						<NavLink to={generalConfiguration.instagram} target="_blank">
							<div className="social-wrapper">
								<img src="img/instagram-brands.svg" alt="" />
							</div>
						</NavLink>
					)}
					{generalConfiguration.twitter && (
						<NavLink to={generalConfiguration.twitter} target="_blank">
							<div className="social-wrapper">
								<img src="img/twitter-brands.svg" alt="" />
							</div>
						</NavLink>
					)}
					{generalConfiguration.youtube && (
						<NavLink to={generalConfiguration.youtube} target="_blank">
							<div className="social-wrapper">
								<img src="img/youtube-brands.svg" alt="" />
							</div>
						</NavLink>
					)}
				</div>
				<div className="container">
					<div className="row">
						<div className="col footer-wrapper">
							<div className="brand-logo">
								{logo !== undefined ? (
									<img
										className="custom-logo"
										src={"uploads/logos/" + logo}
										alt=""
									/>
								) : null}
							</div>
							<div className="copyright">
								<div className="text">
									<div
										dangerouslySetInnerHTML={{
											__html: generalConfiguration.copyright,
										}}
									/>
								</div>
								<div className="links">
									<Link to="#">Mentions l??gales</Link>
								</div>
							</div>
							<div className="development_by">
								<span>Plateforme d??velopp??e par </span>
								<a
									href="https://www.blue-com.fr/"
									target="_blank"
									title="Agence de communication ??co-responsable"
								>
									<img src="img/logo-blue-com.svg" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
