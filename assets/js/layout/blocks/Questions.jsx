
import React, { useEffect, useState, useContext } from 'react';

import messagesAPI from '../../services/messagesAPI';
import AuthContext from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';

import CardMessage from '../../components/cards/CardMessage';
import MessageField from '../../components/forms/MessageField';
import ScrollToBottom from 'react-scroll-to-bottom';

import { io } from 'socket.io-client';

const Questions = () => {

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

    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);

    const fetchQuestions = async () => {
        try {
            const data = await messagesAPI.findAll();
            setQuestions(data);
        } catch (error) {
            console.log(error.response);
        }
    };

	const [myMessage, setMyMessage] = useState({
		question: "",
		user: appUser.id
	});

    useEffect(() => {
        fetchQuestions();
		socket.on("questionSent", () => {
			fetchQuestions();
			// console.log('Réception du message WS');
            setIsLoading(false);
		});
        socket.on("questionStatus", () => {
            fetchQuestions();
            // console.log('Changement du statut du message WS');
            setIsLoading(false);
        });
        socket.on("questionDelete", () => {
            fetchQuestions();
            // console.log('Suppression du message WS');
            setIsLoading(false);
        });
	}, []);

    const sendQuestion = function (myMessageSent) {
		socket.emit("questionSent", myMessageSent);
		// console.log(myMessageSent);
		// console.log('Envoi du message WS');
	};

    const deleteQuestion = function (id) {
        socket.emit("questionDelete", id);
        // console.log("Suppression du message WS");
    };

	// Gestion des champs
	const handleChange = (e) => {
		setMyMessage({ ...myMessage,
            question: e.target.value,
            user: appUser.id
        });
		// console.log(myMessage.question);
	};

	// Gestion des submit
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			setError("");
            if (isAuthenticated) {
                const data = await messagesAPI.sendMessage(myMessage);
                sendQuestion(data);
                // console.log(data);
            } else {
                const data = await messagesAPI.sendAnonymousMessage(myMessage);
                sendQuestion(data);
                // console.log(data);
            }
			setMyMessage({ ...myMessage, question: "" });
		} catch (error) {
			setError("Le message n'a pa pu être délivré.");
			console.log(error);
		}
	};

    // Gestion de la suppression
    const handleDelete = async (id) => {
        const originalQuestions = [...questions];
        setQuestions(questions.filter(question => question.id !== id));
        try {
            await messagesAPI.deleteMessage(id);
            deleteQuestion(id);
        } catch (error) {
            setQuestions(originalQuestions);
            console.log(error.response);
        }
    };

    // Gestion de l'affichage
    const handleDisplay = async (id, status) => {
        setIsLoading(true);
        try {
            await messagesAPI.displayMessage(id, status);
            socket.emit("questionStatus", id, status);
        } catch (error) {
            console.log(error.response);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (appUser.roles.includes("ROLE_ADMIN") && isAuthenticated) {
            setFilteredQuestions(questions);
        }
        else {
            setFilteredQuestions(questions.filter(question => question.status === true));
        }
    }, [questions, appUser, isAuthenticated]);

    console.log("AppUser : ", appUser);
    console.log('isAuthenticated : ', isAuthenticated);
    console.log('isAdmin : ', appUser.roles.includes("ROLE_ADMIN") && isAuthenticated);

    return (
        <>
            <ScrollToBottom
                className="scrollable-question-wrapper"
            >
                {filteredQuestions.map((question, index) => (
                    <CardMessage
                        key={index}
                        question={question}
                        isLoading={isLoading}
                        allClasses={""}
                        handleDelete={handleDelete}
                        handleDisplay={handleDisplay}
                    />
                ))}
            </ScrollToBottom>
            {isAuthenticated && (
                <div className="ask-question">
                    <div className="qa-form">
                        <form
                            className="form-inline"
                            onSubmit={handleSubmit}
                        >
                            <fieldset id="fieldset-qr">
                                <div className="input-group">
                                    <MessageField
                                        id="js-message"
                                        placeholder="Aa"
                                        value={myMessage.question}
                                        onChange={handleChange}
                                        error={error}
                                        className={"form-control" + (error && " is-invalid")}
                                    />
                                    <button
                                        id="js-send-question"
                                        className="btn send-question"
                                        type="submit"
                                    >
                                        <span>Envoyer</span>
                                        <i className="fal fa-arrow-right"></i>
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Questions;