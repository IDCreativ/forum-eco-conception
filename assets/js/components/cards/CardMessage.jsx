import React, { useContext } from "react";

import { UserContext } from "../../contexts/UserContext";
import AuthContext from "../../contexts/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const CardMessage = ({
	question,
	allClasses,
	handleDelete,
	handleDisplay,
	isLoading,
	setIsLoading,
}) => {

	const { appUser, setAppUser } = useContext(UserContext);
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<>
			<div
				id={"question-" + question.id}
				className={
					"question" +
					" " +
					allClasses +
					" " +
					(question.status ? "" : "hidden")
				}
			>
				{question.user ? (
					<h4>
						{question.user.firstname} {question.user.lastname}
					</h4>
				) : (
					<h4>Invité</h4>
				)}
				<span>{question.question}</span>
				<div id={"js-answers-" + question.id}>
					{question.answers.map((answer, index) => {
						return (
							<div key={index} className="answer" id={"answer-" + answer.id}>
								<span>{answer.answer}</span>
							</div>
						);
					})}
				</div>
				{appUser.roles.includes("ROLE_ADMIN") && isAuthenticated ? (
					<div className="actions">
						{isLoading && (
							<Button className="btn btn-link">
								<FontAwesomeIcon
									icon={["fas", "spinner"]}
									className="fa-fw fa-spin"
								/>
							</Button>
						)}
						<Button
							className="btn btn-secondary btn-sm"
							onClick={() => {
								handleDisplay(question.id, !question.status);
							}}
						>
							<FontAwesomeIcon
								icon={["fal", "eye" + (question.status ? "" : "-slash")]}
								className="fa-fw"
							/>
						</Button>
						<Button
							className="btn btn-danger btn-sm"
							onClick={() => handleDelete(question.id)}
						>
							<FontAwesomeIcon icon={["fal", "trash-alt"]} className="fa-fw" />
						</Button>
					</div>
				) : null}
			</div>
		</>
	);
};

export default CardMessage;
