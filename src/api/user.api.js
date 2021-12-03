import agent from "./agent";
import { USER_ENDPOINT } from "../constants/endpoints";

const pageSize = 10;

const encode = encodeURIComponent;
const limit = (size, page) => `limit=${size}&offset=${page ? page * size : 0}`;
const omitForUser = user =>
    Object.assign({}, user, {
        hash: undefined,
        salt: undefined,
        role: undefined,
        createdDate: undefined,
        modifiedDate: Date.now()
    });

const User = {
    getAll: (page = 0, filter = {}) =>
        agent.get(`${USER_ENDPOINT}?${limit(pageSize, page)}&${new URLSearchParams(filter).toString()}`),
    create: user => agent.post(USER_ENDPOINT, { user: omitForUser(user) }),
    update: user => agent.put(USER_ENDPOINT, { user: omitForUser(user) }),
    delete: username => agent.delete(`${USER_ENDPOINT}?username=${encode(username)}`),
    pageSize
};

export default User;
