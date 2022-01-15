import {
  ASYNC_START,
  FILTER_INVOICELIST,
  INVOICELIST_PAGE_LOADED,
  INVOICELIST_PAGE_UNLOADED,
  SET_INVOICELIST_PAGE
} from "../actions";

export default function invoiceListReducer(state = {}, action) {
  switch (action.type) {
    case ASYNC_START:
      switch (action.subtype) {
        case INVOICELIST_PAGE_LOADED:
        case SET_INVOICELIST_PAGE:
        case FILTER_INVOICELIST:
          return { ...state, inProgress: true };
        default:
          return state;
      }

    case INVOICELIST_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        invoiceList: action.payload.invoiceList || [],
        total: action.payload.total || 0,
        page: 0,
        inProgress: false
      };

    case INVOICELIST_PAGE_UNLOADED:
      return {};

    case SET_INVOICELIST_PAGE:
      return {
        ...state,
        invoiceList: action.payload.invoiceList || [],
        total: action.payload.total || 0,
        page: action.page,
        inProgress: false
      };

    case FILTER_INVOICELIST:
      return {
        ...state,
        invoiceList: action.payload.invoiceList || [],
        total: action.payload.total || 0,
        page: 0,
        inProgress: false
      };

    default:
      return state;
  }
}
