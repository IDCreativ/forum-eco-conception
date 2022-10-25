import React from "react";

const CardPartner = ({
    logo,
    height
}) => {
	return (
		<img
			src={"uploads/partners/" + logo}
			style={height && "max-height:" + height + "px"}
		/>
	);
};

export default CardPartner;
