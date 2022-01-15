import { ADMIN_INVOICE_ENDPOINT } from "../constants/endpoints";
import agent from "./agent";

const pageSize = 10;

const omitForInvoice = invoice =>
  Object.assign({}, invoice, {
    user: undefined,
    total: undefined,
    discountTotal: undefined,
    paymentMethod: undefined,
    paymentStatus: undefined,
    paymentId: undefined,
    createdDate: undefined,
    logs: undefined
  });

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
  update: invoice =>
    agent.put(`${ADMIN_INVOICE_ENDPOINT}/${invoice._id}`, {
      invoice: omitForInvoice(invoice)
    }),
  getMonthlyProfit: year =>
    agent.get(`${ADMIN_INVOICE_ENDPOINT}/profit`, {
      params: {
        year
      }
    }),
  getTopSpendingClients: () =>
    agent.get(`${ADMIN_INVOICE_ENDPOINT}/topClients`),
  getSummary: () => agent.get(`${ADMIN_INVOICE_ENDPOINT}/summary`),
  pageSize
};

export default Invoice;
