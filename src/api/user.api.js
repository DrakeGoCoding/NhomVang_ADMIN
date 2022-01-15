import agent from "./agent";
import { USER_ENDPOINT } from "../constants/endpoints";

const pageSize = 10;

const encode = encodeURIComponent;
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
    agent.get(USER_ENDPOINT, {
      params: {
        limit: pageSize,
        offset: page * pageSize || 0,
        ...filter
      }
    }),
  create: user => agent.post(USER_ENDPOINT, { user: omitForUser(user) }),
  update: user => agent.put(USER_ENDPOINT, { user: omitForUser(user) }),
  delete: username =>
    agent.delete(`${USER_ENDPOINT}?username=${encode(username)}`),
  countSubscribers: () =>
    agent.get(`${USER_ENDPOINT}/count`, {
      params: {
        role: "user",
        subscribe: true
      }
    }),
  countClients: () =>
    agent.get(`${USER_ENDPOINT}/count`, {
      params: {
        role: "user"
      }
    }),
  pageSize
};

export default User;
