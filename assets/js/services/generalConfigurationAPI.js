import axios from 'axios';
import { GENERAL_CONFIGURATION } from "../config";

function findConfig() {
	return axios
		.get(GENERAL_CONFIGURATION)
		.then((response) => response.data);
}

export default {
	findConfig: findConfig
};
