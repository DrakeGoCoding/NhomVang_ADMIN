import {
  ASYNC_START,
  DELETE_USER,
  FILTER_USERLIST,
  SET_USERLIST_PAGE,
  USER_PAGE_LOADED,
  USER_PAGE_UNLOADED,
  USER_SUBMITTED
} from "../actions";

export default function userListReducer(state = {}, action) {
  switch (action.type) {
    case ASYNC_START:
      switch (action.subtype) {
        case USER_PAGE_LOADED:
        case SET_USERLIST_PAGE:
        case FILTER_USERLIST:
        case USER_SUBMITTED:
        case DELETE_USER:
          return { ...state, inProgress: true };
        default:
          return state;
      }

    case USER_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        userList: action.payload.userList || [],
        total: action.payload.total || 0,
        page: 0,
        reload: false,
        inProgress: false
      };

    case USER_PAGE_UNLOADED:
      return {};

    case SET_USERLIST_PAGE:
      return {
        ...state,
        userList: action.payload.userList || [],
        total: action.payload.total || 0,
        page: action.page,
        inProgress: false
      };

    case FILTER_USERLIST:
      return {
        ...state,
        userList: action.payload.userList || [],
        total: action.payload.total || 0,
        page: action.page || 0,
        inProgress: false
      };

    case USER_SUBMITTED:
    case DELETE_USER:
      return {
        ...state,
        inProgress: false,
        reload: !action.error,
        error: action.error ? action.payload.message : null
      };

    default:
      return state;
  }
}
