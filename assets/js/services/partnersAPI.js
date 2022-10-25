import axios from "axios";
import { PARTNERS_API } from "../config";

function findAll() {
    return axios
        .get(PARTNERS_API)
        .then((response) => response.data["hydra:member"]);
}

function find(id) {
    return axios
        .get(PARTNERS_API + "/" + id)
        .then((response) => response.data);
}

export default {
    findAll: findAll,
    find: find,
};