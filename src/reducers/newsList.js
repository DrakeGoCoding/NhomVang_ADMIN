import { NEWS_PAGE_LOADED, NEWS_PAGE_UNLOADED, SET_PAGE } from "../constants/actionTypes";

export default function newsListReducer(state = {}, action) {
    switch (action.type) {
        case NEWS_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                newsList: action.payload.newsList,
                total: action.payload.total,
                currentPage: 0
            };
        case NEWS_PAGE_UNLOADED:
            return {};

        case SET_PAGE:
            return {
                ...state,
                newsList: action.payload.newsList,
                total: action.payload.total,
                currentPage: action.page
            };

        default:
            return state;
    }
}
