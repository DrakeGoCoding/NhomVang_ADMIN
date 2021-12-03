import {
    ASYNC_START,
    DELETE_NEWS,
    NEWS_PAGE_LOADED,
    NEWS_PAGE_UNLOADED,
    SET_NEWSLIST_PAGE
} from "../constants/actionTypes";

export default function newsListReducer(state = {}, action) {
    switch (action.type) {
        case ASYNC_START:
            if ([NEWS_PAGE_LOADED, SET_NEWSLIST_PAGE, DELETE_NEWS].includes(action.subtype)) {
                return { ...state, inProgress: true };
            }
            return state;
        case NEWS_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                newsList: action.payload.newsList,
                total: action.payload.total,
                page: 0,
                reload: false,
                inProgress: false
            };
        case NEWS_PAGE_UNLOADED:
            return {};

        case SET_NEWSLIST_PAGE:
            return {
                ...state,
                newsList: action.payload.newsList,
                total: action.payload.total,
                page: action.page,
                inProgress: false
            };

        case DELETE_NEWS:
            return {
                ...state,
                reload: true
            };

        default:
            return state;
    }
}
