import {
    ASYNC_START,
    INVOICE_PAGE_LOADED,
    INVOICE_PAGE_UNLOADED,
    SET_INVOICELIST_PAGE
} from "../constants/actionTypes";

export default function invoiceListReducer(state = {}, action) {
    switch (action.type) {
        case ASYNC_START:
            switch (action.subtype) {
                case INVOICE_PAGE_LOADED:
                case SET_INVOICELIST_PAGE:
                    return { ...state, inProgress: true };
                default:
                    return state;
            }

        case INVOICE_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                invoiceList: action.payload.invoiceList || [],
                total: action.payload.total || 0,
                page: 0,
                inProgress: false
            };

        case INVOICE_PAGE_UNLOADED:
            return {};

        case SET_INVOICELIST_PAGE:
            return {
                ...state,
                invoiceList: action.payload.invoiceList || [],
                total: action.payload.total || 0,
                page: action.page,
                inProgress: false
            };

        default:
            return state;
    }
}
