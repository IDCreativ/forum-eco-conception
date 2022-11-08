import axios from "axios";
import { SONDAGES_API, VOTE_API } from "../config";

function findAll() {
	return axios
		.get(SONDAGES_API)
		.then((response) => response.data["hydra:member"]);
}

function find(id) {
	return axios
		.get(SONDAGES_API + "/" + id)
		.then((response) => response.data);
}

function sendVote(myVote) {
	return axios.post(VOTE_API, {
		...myVote,
		user: `/api/users/${myVote.user}`
	})
    .then((response) => response.data);
}

function sendAnonymousVote(myVote) {
	return axios.post(VOTE_API, {
		...myVote
	})
	.then((response) => response.data);
}

export default {
	findAll: findAll,
	find: find,
	sendVote: sendVote,
	sendAnonymousVote: sendAnonymousVote
};