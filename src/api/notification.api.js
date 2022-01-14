import { NOTIFICATIONS_ENDPOINT } from "../constants/endpoints";
import agent from "./agent";

const Notification = {
    getAll: () => agent.get(`${NOTIFICATIONS_ENDPOINT}`),
    view: id => agent.post(`${NOTIFICATIONS_ENDPOINT}/view/${id}`),
    viewAll: () => agent.post(`${NOTIFICATIONS_ENDPOINT}/viewAll`)
};

export default Notification;
