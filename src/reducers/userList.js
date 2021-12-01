import {
    ASYNC_START,
    DELETE_USER,
    FILTER_USERLIST,
    SET_USERLIST_PAGE,
    SET_USERLIST_REGEX,
    SET_USERLIST_ROLE,
    USER_PAGE_LOADED,
    USER_PAGE_UNLOADED,
    USER_SUBMITTED
} from "../constants/actionTypes";

export default function userListReducer(state = {}, action) {
    switch (action.type) {
        case ASYNC_START:
            if ([USER_PAGE_LOADED, SET_USERLIST_PAGE, SET_USERLIST_ROLE, FILTER_USERLIST].includes(action.subtype)) {
                return { ...state, inProgress: true };
            }
            return state;

        case USER_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                userList: action.payload.userList || [],
                total: action.payload.total || 0,
                currentPage: 0,
                role: "",
                regex: "",
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
                currentPage: action.page,
                inProgress: false
            };

        case SET_USERLIST_ROLE:
            return {
                ...state,
                userList: action.payload.userList || [],
                total: action.payload.total || 0,
                role: action.role,
                currentPage: action.page,
                inProgress: false
            };

        case SET_USERLIST_REGEX:
            return { ...state, regex: action.regex };

        case FILTER_USERLIST:
            return {
                ...state,
                userList: action.payload.userList || [],
                total: action.payload.total || 0,
                inProgress: false
            };

        case DELETE_USER:
        case USER_SUBMITTED: {
            return {
                ...state,
                reload: true
            };
        }

        default:
            return state;
    }
}
