import React, { useState, useEffect } from "react";
import generalConfigurationAPI from "../services/generalConfigurationAPI";
import VideoContainer from "../layout/blocks/VideoContainer";
import Partners from "../layout/blocks/Partners";
import Aside from "../layout/Aside";
import Footer from "../layout/Footer";

import io from "socket.io-client"; 

const HomePage = () => {

	// Websocket
	const socket = io("http://localhost:4000", {
		withCredentials: false,
		transportationOptions: {
			polling: {
				extraHeaders: {
					"my-custom-header": "abcd",
				},
			},
		},
	});

	const [asideOpened, setAsideOpened] = useState(true);

	const [event, setEvent] = useState([{}]);

	const fetchEvent = async () => {
		try {
			const dataConfig = await generalConfigurationAPI.findConfig();
			setEvent(dataConfig.event);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchEvent();
	}, []);

	const handleAside = () => {
		if (asideOpened) {
			setAsideOpened(false);
		}
		else {
			setAsideOpened(true);
		}
	};

	return (
		<>
			<div id="main-container" className={asideOpened ? "global-container aside-opened" : "global-container"}>
				<main id="front">
					<section className="live-wrapper">
						<div id="js-live-container" className="live-container">
							<VideoContainer
								eventName={event.name}
								eventDateStart={event.dateStart}
							/>
						</div>
					</section>
					<Partners />
				</main>
				<Footer />
			</div>
			<aside id="sidebar" className={asideOpened ? "aside-opened" : ""}>
				<div
					id="aside-toggle"
					className={asideOpened ? "aside-opened" : ""}
					onClick={handleAside}
				>
					<i className="far fa-arrow-from-right"></i>
				</div>
				<Aside />
			</aside>
		</>
	);
};

export default HomePage;
