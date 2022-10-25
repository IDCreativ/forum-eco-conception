import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
import feedbackAPI from "../../services/feedbackAPI";

// React Hook Form
import { useForm } from "react-hook-form";

// Bootstrap
import { Row, Col, Button, Form, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Feedbacks = () => {
	const [error, setError] = useState("");

	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
	const { appUser, setAppUser } = useContext(UserContext);

	const [starsValue, setStarsValue] = useState(0);
	const [starsHoverValue, setStarsHoverValue] = useState(undefined);
	const [zeroStars, setZeroStars] = useState(false);
	const [zeroStarsMessage, setZeroStarsMessage] = useState(false);
    const [feedBackSent, setFeedBackSent] = useState(false);
	const [feedBackToken, setFeedBackToken] = useState("");

	const starsRow = Array(5).fill(0);

	useEffect(() => {
		if (window.localStorage.getItem("feedbackToken")) {
			setFeedBackToken(window.localStorage.getItem("feedbackToken"));
		}
	}, [feedBackToken]);

	const {
		register,
		handleSubmit,
		formState,
		errors,
		reset,
	} = useForm();

	const onSubmit = async (data, e) => {
		data.stars = parseInt(starsValue);
		data.user = appUser.id;
		data.event = "4";
		console.log("Formulaire envoyé : ", data);

		try {
			if (isAuthenticated) {
				const response = await feedbackAPI.addFeedback(data);
				console.log(response);
			} else {
				const response = await feedbackAPI.addAnonymousFeedback(data);
				console.log(response);
			}
			setError("");
			console.log("Envoi du formulaire");
            setFeedBackSent(true);
			window.localStorage.setItem("feedbackToken", true)
			// On remet le formulaire à 0
			reset({
				stars: 0,
				message: "",
			});
			toast.success(
				"Votre commentaire a bien été envoyé. Nous vous en remercions."
			);
		} catch (error) {
			console.log("Erreurs : ", error);
			toast.error("Une erreur s'est produite.");
		}
	};

	const handleClick = (value) => {
		(starsValue == value) == 1 ? setStarsValue(0) : setStarsValue(value);
		setZeroStars(true);
	};

	const handleMouseOver = (value) => {
		setStarsHoverValue(value);
	};

	const handleMouseLeave = () => {
		setStarsHoverValue(undefined);
	};

	const checkStars = () => {
		console.log("On vérifie si la note a été attribuée");
		if (starsValue == 0 && zeroStars == false) {
			setZeroStarsMessage(true);
		}
	};

	return (
		<div
            className="container-fluid p-3"
        >
			{!feedBackSent && !feedBackToken ? (
				<Form className="form" onSubmit={handleSubmit(onSubmit)}>
					<Row>
						<Col md={12}>
							<div className="stars mb-3">
								{starsRow.map((_, index) => (
									<span key={index} className="star">
										{(starsValue || starsHoverValue) > index ? (
											<FontAwesomeIcon
												key={index}
												icon={["fas", "star"]}
												className="fa-2x text-warning"
												onClick={() => handleClick(index + 1)}
												onMouseOver={() => handleMouseOver(index + 1)}
												onMouseLeave={() => handleMouseLeave()}
											/>
										) : (
											<FontAwesomeIcon
												key={index}
												icon={["fal", "star"]}
												className="fa-2x text-warning"
												onClick={() => handleClick(index + 1)}
												onMouseOver={() => handleMouseOver(index + 1)}
												onMouseLeave={() => handleMouseLeave()}
											/>
										)}
									</span>
								))}
							</div>
							{zeroStarsMessage && (
								<Alert
									variant="danger"
									className="text-center"
								>
									<div className="d-flex align-items-center justify-content-start">
										<p
                                            className="text-start mb-0"
                                        >
											Vous n'avez pas attribué de note.<br />
                                            Laisser à zéro ?
                                        </p>
										<Button
											variant="success"
											className="btn-sm ms-auto"
                                            data-bs-dismiss="alert"
											onClick={() => {setZeroStars(false); setZeroStarsMessage(false)}}
										>
											Non
										</Button>
										<Button
											variant="danger"
											className="btn-sm ms-2"
                                            data-bs-dismiss="alert"
											onClick={() => setZeroStars(true)}
										>
											Oui
										</Button>
									</div>
								</Alert>
							)}
							<div className="form-group mb-3">
								<label htmlFor="message" className="form-label">
									Message
								</label>
								<textarea
									id="message"
									name="message"
									className={
										formState.errors.message
											? "form-control is-invalid"
											: "form-control"
									}
									rows="5"
									onFocus={checkStars}
									{...register("message", {
										required: true,
									})}
								></textarea>
                                {formState.errors.message && (
                                    <span className="d-block invalid-feedback">
                                        Vous devez accompagner la note d'un commentaire.
                                    </span>
                                )}
							</div>
							<Button variant="primary" type="submit" className="text-light">
								Envoyer
							</Button>
						</Col>
					</Row>
				</Form>
			) : null}
            {feedBackSent || feedBackToken ? (
                <Alert variant="success" className="text-center mb-0 mt-3 mx-auto">
                    Merci pour votre retour !
                </Alert>
            ) : null}
		</div>
	);
};

export default Feedbacks;
