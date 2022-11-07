import axios from "axios";
import { PARTNERS_API, PARTNER_TYPES_API } from "../config";

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

function findTypes() {
    return axios
        .get(PARTNER_TYPES_API)
        .then((response) => response.data["hydra:member"]);
}

export default {
    findAll: findAll,
    find: find,
    findTypes: findTypes,
};