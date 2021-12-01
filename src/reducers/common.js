import { APP_LOAD, ASYNC_START, LOGIN, LOGOUT, NEWS_SUBMITTED, REDIRECT, TOGGLE_SIDER } from "../constants/actionTypes";

const initialState = {
    appName: "Voucher Hunter",
    appNameMini: "VH",
    appLoaded: false,
    token: null,
    inProgress: false,
    isSiderCollapsed: false
};

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null,
                redirectTo: action.token ? "/" : "/login"
            };

        case ASYNC_START:
            return { ...state, inProgress: true };

        case TOGGLE_SIDER:
            return { ...state, isSiderCollapsed: !state.isSiderCollapsed };

        case LOGIN:
            return {
                ...state,
                redirectTo: action.error ? null : "/",
                token: action.error ? null : action.payload.token,
                currentUser: action.error ? null : action.payload.user
            };

        case LOGOUT:
            return { ...state, redirectTo: "/login", token: null, currentUser: null };

        case REDIRECT:
            return { ...state, redirectTo: null };

        case NEWS_SUBMITTED:
            return {
                ...state,
                redirectTo: action.error ? null : "/news"
            };

        default:
            return state;
    }
}
