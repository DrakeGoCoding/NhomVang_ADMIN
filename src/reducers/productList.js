import {
    ASYNC_START,
    DELETE_PRODUCT,
    FILTER_PRODUCTLIST,
    PRODUCT_PAGE_LOADED,
    PRODUCT_PAGE_UNLOADED,
    PRODUCT_SUBMITTED,
    SET_PRODUCTLIST_PAGE
} from "../constants/actionTypes";

export default function productListReducer(state = {}, action) {
    switch (action.type) {
        case ASYNC_START:
            switch (action.subtype) {
                case PRODUCT_PAGE_LOADED:
                case SET_PRODUCTLIST_PAGE:
                case FILTER_PRODUCTLIST:
                case PRODUCT_SUBMITTED:
                case DELETE_PRODUCT:
                    return { ...state, inProgress: true };
                default:
                    return state;
            }

        case PRODUCT_PAGE_LOADED:
            return {
                ...state,
                pager: action.pager,
                productList: action.payload.productList || [],
                total: action.payload.total || 0,
                page: 0,
                reload: false,
                inProgress: false
            };

        case PRODUCT_PAGE_UNLOADED:
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
                inProgress: false
            };

        case DELETE_PRODUCT:
        case PRODUCT_SUBMITTED:
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
