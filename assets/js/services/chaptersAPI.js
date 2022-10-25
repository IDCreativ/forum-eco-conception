import axios from 'axios';
import { CHAPTERS_API } from "../config";

function findAll() {
	return axios
		.get(CHAPTERS_API)
		.then((response) => response.data["hydra:member"]);
}

export default {
	findAll: findAll
};
