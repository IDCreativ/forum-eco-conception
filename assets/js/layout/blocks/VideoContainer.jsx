import React, { useRef } from "react";
import moment from "moment";
import "moment-timezone";

const VideoContainer = ({ eventName, eventDateStart }) => {

	moment.locale("fr");
	const formatDate = (str) => moment.utc(str).format("DD MMMM YYYY");
	const formatHour = (str) => moment.utc(str).format("H:mm");

	return (
		<div className="waiting-block">
			<div className="countdown-container glass">
				<h2>{eventName}</h2>
				<h3>
					RDV le {formatDate(eventDateStart)} à {formatHour(eventDateStart)}
				</h3>
			</div>
			<img src="img/waiting-bg.jpg" alt="" />
		</div>
	);
};

export default VideoContainer;
