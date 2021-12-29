import { ASYNC_START, LOGIN, LOGIN_PAGE_UNLOADED } from "../actions";

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                inProgress: false,
                error: action.error ? action.payload.message : null
            };
        case LOGIN_PAGE_UNLOADED:
            return {};
        case ASYNC_START:
            if (action.subtype === LOGIN) {
                return { ...state, inProgress: true };
            }
            return state;
        default:
            return state;
    }
}
