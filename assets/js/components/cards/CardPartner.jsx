import React from "react";

const CardPartner = ({
    logo,
    height
}) => {
	return (
		<img
			src={"uploads/partners/" + logo}
			style={{maxHeight: height + "px"}}
		/>
	);
};

export default CardPartner;
