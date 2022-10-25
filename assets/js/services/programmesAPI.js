import axios from "axios";
import { PROGRAMMES_API } from "../config";

function findAll() {
	return axios
		.get(PROGRAMMES_API)
		.then((response) => response.data["hydra:member"]);
}

export default {
	findAll: findAll
};