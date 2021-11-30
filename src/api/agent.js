import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

// const MOCK_API_URL = "https://6198a43c164fa60017c23155.mockapi.io/";
const LOCAL_API = "http://localhost:5543/";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: LOCAL_API, // mock api for testing
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params)
});

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.headers["Authorization"] = "Bearer " + token;
    }
    return req;
};

const responsePlugin = res => {
    if (res && res.data) {
        return res.data;
    }
    return res;
};

const errorPlugin = error => {
    throw error;
};

instance.interceptors.request.use(tokenPlugin);
instance.interceptors.response.use(responsePlugin, errorPlugin);

export const setToken = _token => (token = _token);
export default instance;
