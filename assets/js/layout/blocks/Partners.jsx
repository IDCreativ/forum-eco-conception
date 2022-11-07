import React, { useState, useEffect } from "react";
import partnersAPI from "../../services/partnersAPI";
import CardPartner from "../../components/cards/CardPartner";

const Partners = (props) => {
	const [partners, setPartners] = useState([]);
	const [partnerTypes, setPartnerTypes] = useState([]);

	useEffect(() => {
		const fetchPartnerTypes = async () => {
			try {
				const dataPartnerTypes = await partnersAPI.findTypes();
				setPartnerTypes(dataPartnerTypes);
			} catch (error) {
				console.log(error.response);
			}
		};
		fetchPartnerTypes();
	}, []);

	useEffect(() => {
		const fetchPartners = async () => {
			try {
				const data = await partnersAPI.findAll();
				setPartners(data);
			} catch (error) {
				console.log(error.response);
			}
		};
		fetchPartners();
	}, []);

	return (
		<section id="partenaires">
			{partnerTypes.map((partnerType, index) => 
				<div
					key={index}
					className="partenaires-row"
				>
					<div
						className="partenaires-row-title"
						dangerouslySetInnerHTML={{
							__html: partnerType.description,
						}}
					/>
					<div className="partenaires">
						{partners.map((partner, index) =>
							partner.partnerType.id === partnerType.id &&
							<CardPartner
								key={index}
								logo={partner.logo}
								height={partner.height}
							/>
						)}
					</div>
					<div className="bottom"></div>
				</div>							
			)}
		</section>
	);
};

export default Partners;
