import React, { useEffect, useState, useContext } from 'react';

import sondagesAPI from '../../services/sondagesAPI';
import AuthContext from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';

import { io } from 'socket.io-client';
import CardSondage from '../../components/cards/CardSondage';

const Sondages = ({socket}) => {

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
        socket.on("pollSent", () => {
            console.log("Nouveau vote");
            fetchSondages();
        });
    }, []);

    useEffect(() => {
        setFilteredSondages(sondages.filter(sondage => sondage.status === true && sondage.visibility === true));
    }, [sondages]);

    return (
        <>
            <div className="poll introduction">
                <p>Bonjour et bienvenue au Forum de l'Éco Conception. 
                Afin de calculer le bilan carbone de l'événement, veuillez s'il vous plaît, répondre à ces quelques questions.
                </p>
            </div>
            {filteredSondages.map(sondage => 
                <CardSondage
                    key={sondage.id}
                    display={window.localStorage.getItem("myVoteToken-" + sondage.id)}
                    sondage={sondage}
                    isLoading={isLoading}
                    allClasses={""}
                    socket={socket}
                    totalVotes={sondage.pollVotes.length}
                />
            )}
        </>
    );
}

export default Sondages;