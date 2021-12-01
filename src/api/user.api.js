import agent from "./agent";
import { USER_ENDPOINT } from "../constants/endpoints";

const limit = (size, page) => `limit=${size}&offset=${page ? page * size : 0}`;
const filter = (role, regex) => `role=${role}&regex=${regex}`;
const omitForUser = user =>
    Object.assign({}, user, {
        hash: undefined,
        salt: undefined,
        role: undefined,
        createdDate: undefined,
        modifiedDate: Date.now()
    });

const User = {
    getAll: (size = 10, page = 0, role = "", regex = "") =>
        agent.get(`${USER_ENDPOINT}?${limit(size, page)}&${filter(role, regex)}`).then(response => response),
    create: user => agent.post(USER_ENDPOINT, { user: omitForUser(user) }),
    update: user => agent.put(USER_ENDPOINT, { user: omitForUser(user) }),
    delete: username => agent.delete(`${USER_ENDPOINT}/${username}`)
};

export default User;
