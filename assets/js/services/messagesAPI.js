import axios from "axios";
import { MESSAGES_API } from "../config";

function findAll() {
	return axios
		.get(MESSAGES_API)
		.then((response) => response.data["hydra:member"]);
}

function find(id) {
	return axios
		.get(MESSAGES_API + "/" + id)
		.then((response) => response.data);
}

function displayMessage(id, status) {
	return axios.put(MESSAGES_API + "/" + id, {
		status: status
	});
}

function sendMessage(myMessage) {
	return axios.post(MESSAGES_API, {
		...myMessage,
		user: `/api/users/${myMessage.user}`
	})
    .then((response) => response.data);
}

function sendAnonymousMessage(myMessage) {
	return axios.post(MESSAGES_API, {
		...myMessage
	})
	.then((response) => response.data);
}

function deleteMessage(id) {
	return axios.delete(MESSAGES_API + "/" + id);
}

export default {
	findAll: findAll,
	sendMessage: sendMessage,
	sendAnonymousMessage: sendAnonymousMessage,
	deleteMessage: deleteMessage,
	displayMessage: displayMessage,
	find: find
};
