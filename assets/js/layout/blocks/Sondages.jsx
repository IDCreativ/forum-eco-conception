import React, { useEffect, useState, useContext } from 'react';

import sondagesAPI from '../../services/sondagesAPI';
import AuthContext from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';

import { io } from 'socket.io-client';
import CardSondage from '../../components/cards/CardSondage';

const Sondages = (props) => {

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

    const { appUser, setAppUser } = useContext(UserContext);
	const { isAuthenticated } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

	const [error, setError] = useState("");

    const [sondages, setSondages] = useState([]);
    const [filteredSondages, setFilteredSondages] = useState([]);

    const fetchSondages = async () => {
        try {
            const data = await sondagesAPI.findAll();
            setSondages(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        fetchSondages();
    }, []);

    useEffect(() => {
        setFilteredSondages(sondages.filter(sondage => sondage.status === true));
    }, [sondages]);

    console.log("All : ", sondages);
    console.log("filtered : ", filteredSondages);

    return (
        <>
            {filteredSondages.map(sondage => (
                <CardSondage
                    key={sondage.id}
                    sondage={sondage}
                    isLoading={isLoading}
                    allClasses={""}
                    socket={socket}
                />
            ))}
        </>
    );
}

export default Sondages;