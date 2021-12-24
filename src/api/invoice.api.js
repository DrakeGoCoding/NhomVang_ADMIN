import { ADMIN_INVOICE_ENDPOINT } from "../constants/endpoints";
import agent from "./agent";

const pageSize = 10;

const Invoice = {
    getAll: (page = 0, filter = {}) =>
        agent.get(ADMIN_INVOICE_ENDPOINT, {
            params: {
                limit: pageSize,
                offset: page * pageSize || 0,
                ...filter
            }
        }),
    getById: invoiceId => agent.get(`${ADMIN_INVOICE_ENDPOINT}/${invoiceId}`),
    pageSize
};

export default Invoice;
