import {
    ASYNC_START,
    DELETE_PRODUCT,
    FILTER_PRODUCTLIST,
    PRODUCTLIST_PAGE_LOADED,
    PRODUCTLIST_PAGE_UNLOADED,
    SET_PRODUCTLIST_PAGE
} from "../actions";

export default function productListReducer(state = {}, action) {
    switch (action.type) {
        case ASYNC_START:
            switch (action.subtype) {
                case PRODUCTLIST_PAGE_LOADED:
                case SET_PRODUCTLIST_PAGE:
                case FILTER_PRODUCTLIST:
                case DELETE_PRODUCT:
                    return { ...state, inProgress: true };
                default:
                    return state;
            }

        case PRODUCTLIST_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                productList: action.payload.productList || [],
                total: action.payload.total || 0,
                page: 0,
                reload: false,
                inProgress: false
            };

        case PRODUCTLIST_PAGE_UNLOADED:
            return {};

        case SET_PRODUCTLIST_PAGE:
            return {
                ...state,
                productList: action.payload.productList || [],
                total: action.payload.total || 0,
                page: action.page,
                inProgress: false
            };

        case FILTER_PRODUCTLIST:
            return {
                ...state,
                productList: action.payload.productList || [],
                total: action.payload.total || 0,
                page: 0,
                inProgress: false
            };

        case DELETE_PRODUCT:
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
