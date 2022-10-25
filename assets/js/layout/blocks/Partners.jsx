import React, { useState, useEffect } from "react";
import partnersAPI from "../../services/partnersAPI";
import CardPartner from "../../components/cards/CardPartner";

const Partners = (props) => {
	const [partners, setPartners] = useState([]);

	const fetchPartners = async () => {
		try {
			const data = await partnersAPI.findAll();
			setPartners(data);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchPartners();
	}, []);

	return (
		<section id="partenaires">
			<div className="container">
				<div className="row">
					<div className="col partenaires">
						{partners.map((partner, index) => 
							<CardPartner
								key={index}
								logo={partner.logo}
								height={partner.height}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Partners;
