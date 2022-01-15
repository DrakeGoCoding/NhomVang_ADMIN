import {
  ASYNC_START,
  FILTER_NEWSLETTERLIST,
  NEWSLETTERLIST_PAGE_LOADED,
  NEWSLETTERLIST_PAGE_UNLOADED,
  SET_NEWSLETTERLIST_PAGE
} from "../actions";

const initialState = {};

export default function newsletterListReducer(state = initialState, action) {
  switch (action.type) {
    case ASYNC_START:
      switch (action.subtype) {
        case NEWSLETTERLIST_PAGE_LOADED:
        case SET_NEWSLETTERLIST_PAGE:
        case FILTER_NEWSLETTERLIST:
          return { ...state, inProgress: true };
        default:
          return state;
      }

    case NEWSLETTERLIST_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        newsletterList: action.payload.newsletterList,
        total: action.payload.total,
        page: 0,
        inProgress: false
      };

    case NEWSLETTERLIST_PAGE_UNLOADED:
      return initialState;

    case SET_NEWSLETTERLIST_PAGE:
      return {
        ...state,
        newsletterList: action.payload.newsletterList || [],
        total: action.payload.total || 0,
        page: action.page,
        inProgress: false
      };

    case FILTER_NEWSLETTERLIST:
      return {
        ...state,
        newsletterList: action.payload.newsletterList || [],
        total: action.payload.total || 0,
        page: action.page || 0,
        inProgress: false
      };

    default:
      return state;
  }
}
