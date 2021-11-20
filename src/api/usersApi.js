import axiosClient from "./axiosClient";
import { USER_ENDPOINT } from "../constant/endpoints";

const usersApi = {
    getAll: items => {
        let url = `${USER_ENDPOINT}`;
        return axiosClient.get(url, items).then(response => response);
    }
};
export default usersApi;
