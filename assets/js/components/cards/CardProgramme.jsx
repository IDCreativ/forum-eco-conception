import React, { memo } from "react";

import moment from "moment";
import "moment-timezone";

const Programme = ({
	type,
	id,
    name,
    description,
    dateStart,
    dateEnd,
	image
}) => {

	moment.locale('fr');
	const formatDate = (str) => moment.utc(str).format("H:mm");

	return (
		<div
			id={id}
			className="col col-12 programme-wrapper"
		>
			{(type == 0 && (
				<div className="info-wrapper">
					{image && (
						<div className="programme-img-wrapper">
							<img src={"/uploads/programme/" + image} />
						</div>
					)}
					<div className="content">
						<h5 className="">{name}</h5>
						<div
							dangerouslySetInnerHTML={{
								__html: description,
							}}
						/>
					</div>
				</div>
			)) || (
				<div className="info-wrapper-image">
					{image && (
						<div className="programme-img-wrapper">
							<img src={"/uploads/programme/" + image} />
						</div>
					)}
				</div>
			)}
			{dateStart && (
				<div className="date-wrapper">
					<span className="conf-date-start">{formatDate(dateStart)}</span>
					<span>-</span>
					<span className="conf-date-end">{formatDate(dateEnd)}</span>
				</div>
			)}
		</div>
	);
};

export default Programme;
