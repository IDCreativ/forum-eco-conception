import React, { useEffect, useState, useContext } from 'react';

import sondagesAPI from '../../services/sondagesAPI';
import AuthContext from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';

import { toast } from "react-toastify";

function CardSondage({
    sondage,
    socket
}) {

    const { appUser, setAppUser } = useContext(UserContext);
	const { isAuthenticated } = useContext(AuthContext);

    const [error, setError] = useState("");

    const [myVote, setMyVote] = useState({});
	const [myVoteToken, setMyVoteToken] = useState([]);

    const sendVote = function (myVote) {
		socket.emit("pollSent", myVote);
	};

    // Gestion des champs
	const handleChange = (e) => {
		setMyVote({ ...myVote,
            poll: "/api/polls/" + sondage.id,
            pollOption: "/api/poll_options/" + e.target.dataset.option,
            freeField: e.target.dataset.type == "0" ? "" : e.target.value,
        });
		console.log("myVote : ", myVote);
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("myVote on submit : ", myVote);
        try {
			setError("");
            if (isAuthenticated) {
                console.log("Try");
                const data = await sondagesAPI.sendVote(myVote);
                sendVote(data);
                // console.log("Utilisateur connecté : ", data);
            } else {
                console.log("Try");
                const data = await sondagesAPI.sendAnonymousVote(myVote);
                sendVote(data);
                // console.log("Anonyme : ", data);
            }
			toast.success(
				"Votre réponse a bien été envoyé. Nous vous en remercions."
			);
		} catch (error) {
			setError("Le vote n'a pa pu être délivré.");
			console.log(error);
		}
    }

    return (
        <div
            id={"sondage-" + sondage.id}
            className={"poll"}
            style={{ display: sondage.visibility ? "block" : "hidden" }}
        >
            <h4>{sondage.question}</h4>
            <p>Votes : ({sondage.pollVotes.length})</p>
            <fieldset>
                <form
                    id={"form-" + sondage.id}
                    onSubmit={handleSubmit}
                >
                    {sondage.pollOptions.map((option, index) => {
                        return (
                            <div key={index} className="poll-checkbox">
                                <input
                                    type={option.type == 0 ? "radio" : "text"}
                                    id={"js-option-" + option.id}
                                    name={"poll-vote-" + sondage.id}
                                    data-option={option.id}
                                    data-type={option.type}
                                    className="poll-input"
                                    onChange={handleChange}
                                />
                                <label htmlFor={"js-option-" + option.id}>
                                    {option.description}
                                </label>
                            </div>
                        );
                    })}
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Voter
                    </button>
                </form>
            </fieldset>
        </div>
    )
}

export default CardSondage