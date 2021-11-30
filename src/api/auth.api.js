import agent from "./agent";
import { ADMIN_AUTH_ENDPOINT, AUTH_ENDPOINT } from "../constants/endpoints";

const Auth = {
    login: (username, password) => agent.post(`${ADMIN_AUTH_ENDPOINT}/login`, { user: { username, password } }),
    current: () => agent.get(`${AUTH_ENDPOINT}/current`)
};

export default Auth;
