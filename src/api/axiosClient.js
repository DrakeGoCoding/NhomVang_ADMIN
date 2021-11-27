import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: "https://6198a43c164fa60017c23155.mockapi.io/", // mock api for testing
    headers: {
        "content-type": "application/json"
    },
    paramsSerializer: params => queryString.stringify(params)
});
// TẠI SAO CHỖ NÀY LẠI UNDEFINED Z
axiosClient.interceptors.request.use(async config => {
    // Handle token here ...
    return config;
});
axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    error => {
        // Handle errors
        throw error;
    }
);
export default axiosClient;
