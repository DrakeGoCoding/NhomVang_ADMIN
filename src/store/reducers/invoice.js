import {
  ASYNC_START,
  INVOICE_PAGE_LOADED,
  INVOICE_PAGE_UNLOADED,
  INVOICE_SUBMITTED,
  UPDATE_FIELD_INVOICE_EDITOR
} from "../actions";

const initialState = {
  data: {
    _id: "",
    user: {},
    products: [],
    total: null,
    discountTotal: null,
    paymentStatus: "",
    status: "",
    vouchers: [],
    createdDate: "",
    logs: []
  },
  inProgress: false
};

export default function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case ASYNC_START:
      switch (action.subtype) {
        case INVOICE_PAGE_LOADED:
        case INVOICE_SUBMITTED:
          return { ...state, inProgress: true };

        default:
          return state;
      }

    case INVOICE_PAGE_LOADED:
      return {
        ...state,
        inProgress: false,
        data: action.payload ? action.payload.invoice : state.data
      };

    case INVOICE_PAGE_UNLOADED:
      return initialState;

    case INVOICE_SUBMITTED:
      return {
        ...state,
        inProgress: false,
        error: action.error ? action.payload.message : null
      };

    case UPDATE_FIELD_INVOICE_EDITOR:
      return {
        ...state,
        data: { ...state.data, [action.key]: action.value }
      };

    default:
      return state;
  }
}
