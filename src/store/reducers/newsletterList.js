import { ASYNC_START, NEWSLETTERLIST_PAGE_LOADED, NEWSLETTERLIST_PAGE_UNLOADED } from "../actions";

const initialState = {};

export default function newsletterListReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START:
            switch (action.subtype) {
                case NEWSLETTERLIST_PAGE_LOADED:
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

        default:
            return state;
    }
}
