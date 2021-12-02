import agent from "./agent";
import { IMAGE_ENDPOINT } from "../constants/endpoints";

const Image = {
    upload: image => agent.post(`${IMAGE_ENDPOINT}/upload`, { image }),
    delete: id => agent.delete(`${IMAGE_ENDPOINT}/${id}`)
};

export default Image;
