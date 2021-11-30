import agent from "./agent";
import { USER_ENDPOINT } from "../constants/endpoints";

const User = {
    getAll: () => agent.get(USER_ENDPOINT).then(response => response),
    create: (username, password) => agent.post(USER_ENDPOINT, { user: { username, password } }),
    update: user => agent.put(USER_ENDPOINT, { user }),
    delete: username => agent.delete(USER_ENDPOINT, { username })
};

export default User;
