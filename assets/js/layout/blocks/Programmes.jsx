import React, { useEffect, useState } from "react";
import generalConfigurationAPI from "../../services/generalConfigurationAPI";
import CardProgramme from "../../components/cards/CardProgramme";
import moment from "moment";
import "moment-timezone";

const Programmes = (props) => {

	const [chapters, setChapters] = useState([]);

	const fetchChapters = async () => {
		try {
			const dataConfig = await generalConfigurationAPI.findConfig();
			setChapters(dataConfig.event.chapters);
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
		fetchChapters();
	}, []);

	moment.locale('fr');
	const formatDate = (str) => moment(str).format("H:mm");

	return (
		<>
		{chapters.map((chapter) => (
				<div key={chapter.id} className="chapters-wrapper-event">
					<div className="h4-wrapper">
						<h4 className="">
							<span>{chapter.name}</span>
						</h4>
						<div className="after-h4"></div>
					</div>

					<div className="description-wrapper">
						{chapter.showTime == 0 && chapter.dateStart && chapter.dateEnd && (
							<div className="date">
								{formatDate(chapter.dateStart)
									? formatDate(chapter.dateStart)
									: ""}{" "}
								à{" "}
								{formatDate(chapter.dateEnd) ? formatDate(chapter.dateEnd) : ""}
							</div>
						)}
						<div dangerouslySetInnerHTML={{ __html: chapter.description }} />
					</div>
					<div className="chapter-main-wrapper">
						{chapter.showTime == 1 && chapter.dateStart && chapter.dateEnd && (
							<div className="chapter-date-wrapper">
								<span className="chapter-date-start">
									{formatDate(chapter.dateStart)
										? formatDate(chapter.dateStart)
										: ""}
								</span>
								<span>-</span>
								<span className="chapter-date-end">
									{formatDate(chapter.dateEnd)
										? formatDate(chapter.dateEnd)
										: ""}
								</span>
							</div>
						)}
						<div className="chapter-programmes">
							{chapter.programmes.map((programme, index) => (
								<CardProgramme
									key={index}
									type={programme.type}
									id={programme.id}
									name={programme.name}
									description={programme.description}
									dateStart={programme.dateStart}
									dateEnd={programme.dateEnd}
									image={programme.image}
								/>
							))}
						</div>
					</div>
				</div>
			))
		}
		</>
	);
};

export default Programmes;
