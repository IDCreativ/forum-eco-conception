import axios from "axios";
import { USERS_API } from "../config";

async function find(id) {
    return axios
		.get(USERS_API + "/" + id)
		.then((response) => response.data);
}

export default {
    find: find
}