import axiosClient from "./axiosClient";
import { AUTH_LOGIN_ENDPOINT } from "../constants/endpoints";

const loginApi = {
    signIn: user => {
        let url = `${AUTH_LOGIN_ENDPOINT}`;
        return axiosClient.post(url, { user }).then(response => response);
    }
};
export default loginApi;
