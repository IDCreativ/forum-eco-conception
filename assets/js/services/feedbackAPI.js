import axios from "axios";
import { FEEDBACKS_API } from "../config";

function findAll() {
    return axios
        .get(FEEDBACKS_API)
        .then((response) => response.data["hydra:member"]);
}

function addFeedback(feedback) {
    return axios.post(FEEDBACKS_API, {
        ...feedback,
        event: "/api/events/" + feedback.event,
        user: "/api/users/" + feedback.user,
    })
}

function addAnonymousFeedback(feedback) {
    return axios.post(FEEDBACKS_API, {
        ...feedback,
        event: "/api/events/" + feedback.event
    })
}

export default {
    findAll: findAll,
    addFeedback: addFeedback,
    addAnonymousFeedback: addAnonymousFeedback
};
