import agent from "./agent";
import { NEWSLETTER_ENDPOINT } from "../constants/endpoints";

const pageSize = 10;

const Newsletter = {
    getAll: (page = 0) =>
        agent.get(NEWSLETTER_ENDPOINT, {
            params: {
                limit: pageSize,
                offset: page * pageSize || 0
            }
        }),
    send: (subject = "", content) =>
        agent.post(NEWSLETTER_ENDPOINT, {
            newsletter: { subject, content }
        })
};

export default Newsletter;
