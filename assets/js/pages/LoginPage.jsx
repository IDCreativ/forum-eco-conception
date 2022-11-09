import React, { useState, useContext } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

import Field from "../components/forms/Field";

import { toast } from "react-toastify";
import Footer from "../layout/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";

const LoginPage = ({ history }) => {
	const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const [error, setError] = useState("");

	// Gestion des champs
	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setCredentials({ ...credentials, [name]: value });
	};

	// Gestion des submit
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await AuthAPI.authenticate(credentials);
			setError("");
			setIsAuthenticated(true);

			toast.success("Vous êtes désormais connecté.");
		} catch (error) {
			console.log(error);
			setError("Identifiants et/ou mot de passe incorrect(s).");
			toast.error("Une erreur est survenue.");
		}
	};

	return (
		<>
			<div
				id="main-container"
				className="global-container py-5"
			>
				<Container id="front">
					<div className="row">
						<div className="col-md-6 mx-auto">
							{!isAuthenticated && (
								<div className="card shadow-sm">
									<div className="card-header">Connexion à l'application</div>
									<div className="card-body">
										<form onSubmit={handleSubmit}>
											<Field
												// label="Votre e-mail"
												name="username"
												id="username"
												placeholder="email@domain.com"
												icon="fa-at"
												value={credentials.username}
												onChange={handleChange}
												error={error}
											/>
											<Field
												// label="Votre mot de passe"
												type="password"
												name="password"
												id="password"
												placeholder="Votre mot de passe"
												icon="fa-lock"
												value={credentials.password}
												onChange={handleChange}
											/>
											<div className="d-grid col-12">
												<button
													type="submit"
													className="btn btn-primary text-light"
												>
													Connexion
												</button>
											</div>
										</form>
									</div>
								</div>
							)}
							{isAuthenticated && <Navigate to="/" />}
						</div>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
};

export default LoginPage;
