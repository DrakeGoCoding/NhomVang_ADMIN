import {
    APP_LOAD,
    ASYNC_START,
    EDITOR_PAGE_LOADED,
    INVOICE_SUBMITTED,
    LOGIN,
    LOGOUT,
    NEWS_PAGE_LOADED,
    NEWS_SUBMITTED,
    PRODUCTLIST_PAGE_LOADED,
    PRODUCT_PAGE_LOADED,
    PRODUCT_SUBMITTED,
    REDIRECT,
    TOGGLE_SIDER,
    USER_PAGE_LOADED,
    VIEW_NOTIFICATION
} from "../actions";

const initialState = {
    appName: "Voucher Hunter",
    appNameMini: "VH",
    appLoaded: false,
    token: null,
    currentUser: null,
    notificationList: [],
    inProgress: false,
    isSiderCollapsed: false
};

export default function commonReducer(state = initialState, action) {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.error ? null : action.token,
                appLoaded: true,
                currentUser: action.payload && action.payload[0] ? action.payload[0].user : null,
                notificationList: action.payload && action.payload[1] ? action.payload[1].notificationList : [],
                inProgress: false,
                redirectTo: !action.token ? "/login" : undefined
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
                currentUser: action.error ? null : action.payload.user,
                inProgress: false
            };

        case LOGOUT:
            return { ...state, redirectTo: "/login", token: null, currentUser: null };

        case REDIRECT:
            return { ...state, redirectTo: null };

        case NEWS_SUBMITTED:
            return {
                ...state,
                redirectTo: action.error ? null : "/news",
                inProgress: false
            };

        case PRODUCT_SUBMITTED:
            return {
                ...state,
                redirectTo: action.error ? null : "/products",
                inProgress: false
            };

        case INVOICE_SUBMITTED:
            return {
                ...state,
                redirectTo: action.error ? null : "/invoices",
                inProgress: false
            };

        case EDITOR_PAGE_LOADED:
        case NEWS_PAGE_LOADED:
        case PRODUCT_PAGE_LOADED:
        case PRODUCTLIST_PAGE_LOADED:
        case USER_PAGE_LOADED:
            return { ...state, inProgress: false };

        case VIEW_NOTIFICATION:
            return {
                ...state,
                notificationList: action.error ? state.notificationList : action.payload.notificationList
            };

        default:
            return state;
    }
}
