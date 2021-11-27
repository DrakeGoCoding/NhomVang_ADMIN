import axiosClient from "./axiosClient";
import { IMAGE_ENDPOINT } from "../constants/endpoints";

const imageApi = {
    upload: image => {
        let url = `${IMAGE_ENDPOINT}/upload`;
        return axiosClient.post(url, { image }).then(response => response);
    }
};

export default imageApi;
