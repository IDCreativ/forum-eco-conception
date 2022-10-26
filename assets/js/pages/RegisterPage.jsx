import React, { useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import Footer from "../layout/Footer";
import UsersAPI from "../services/usersAPI";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

const RegisterPage = ({ history }) => {
	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		email: "",
		telephone: "",
		password: "",
		passwordConfirm: "",
	});

	const [errors, setErrors] = useState({
		firstname: "",
		lastname: "",
		email: "",
		telephone: "",
		password: "",
		passwordConfirm: "",
	});

	const handleChange = ({ currentTarget }) => {
		const { name, value } = currentTarget;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const apiErrors = {};

		if (user.password !== user.passwordConfirm) {
			apiErrors.passwordConfirm = "Les mots de passe doivent correspondre.";
			setErrors(apiErrors);
			toast.error("Votre formulaire contient des erreurs.");
			return;
		}

		console.log(user);

		try {
			await UsersAPI.register(user);
			setErrors({});
			toast.success("Inscription réussie. Vous pouvez vous connecter.");
			history.replace("/login");
		} catch (error) {
			console.log(error.response);
			const { violations } = error.response.data;

			if (violations) {
				toast.error("Votre formulaire contient des erreurs.");
				violations.forEach((violation) => {
					apiErrors[violation.propertyPath] = violation.message;
					toast.error(violation.message);
				});
				setErrors(apiErrors);
			}
		}
	};

	return (
		<>
			<div id="main-container" className="global-container py-5">
				<Container>
					<div className="row">
						<div className="col-md-8 col-lg-6 mx-auto">
							<div className="card shadow-sm">
								<div className="card-header">Inscription à l'application</div>
								<div className="card-body">
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-md-6">
												<Field
													name="lastname"
													// label="Votre nom"
													placeholder="Votre nom"
													icon="fa-user-tag"
													value={user.lastname}
													error={errors.lastname}
													onChange={handleChange}
												/>
											</div>
											<div className="col-md-6">
												<Field
													name="firstname"
													// label="Votre prénom"
													placeholder="Votre prénom"
													value={user.firstname}
													error={errors.firstname}
													onChange={handleChange}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<Field
													name="email"
													type="email"
													// label="Votre e-mail"
													icon="fa-at"
													placeholder="Votre e-mail"
													value={user.email}
													error={errors.email}
													onChange={handleChange}
												/>
											</div>
											<div className="col-md-6">
												<Field
													name="telephone"
													type="telephone"
													// label="Votre téléphone"
													icon="fa-mobile"
													placeholder="Votre téléphone"
													value={user.telephone}
													error={errors.telephone}
													onChange={handleChange}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<Field
													name="password"
													type="password"
													// label="Votre mot de passe"
													placeholder="Votre mot de passe"
													icon="fa-lock"
													value={user.password}
													error={errors.password}
													onChange={handleChange}
												/>
											</div>
											<div className="col-md-6">
												<Field
													name="passwordConfirm"
													type="password"
													// label="Confirmez le mot de passe"
													placeholder="Confirmez le mot de passe"
													value={user.passwordConfirm}
													error={errors.passwordConfirm}
													onChange={handleChange}
												/>
											</div>
										</div>
											<div className="d-grid col-12">
												<button
													type="submit"
													className="btn btn-primary text-light"
												>
													S'enregistrer
												</button>
											</div>
									</form>
								</div>
								<div className="card-footer">
									<Link to="/login">
										<i className="fal fa-long-arrow-left me-1"></i>Se connecter
									</Link>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</div>
			<Footer />
		</>
	);
};

export default RegisterPage;
