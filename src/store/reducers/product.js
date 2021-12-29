import {
    ASYNC_START,
    PRODUCT_PAGE_LOADED,
    PRODUCT_PAGE_UNLOADED,
    PRODUCT_SUBMITTED,
    UPDATE_FIELD_PRODUCT_EDITOR
} from "../actions";
import { htmlDecode } from "../../utils";

const initialState = {
    data: {
        name: "",
        listedPrice: undefined,
        discountPrice: undefined,
        supplier: "",
        isHot: false,
        isInSlider: false,
        thumbnail: "",
        photos: [],
        inStock: 0,
        description: "",
        tags: []
    },
    inProgress: false
};

export default function productReducer(state = initialState, action) {
    switch (action.type) {
        case ASYNC_START:
            switch (action.subtype) {
                case PRODUCT_PAGE_LOADED:
                case PRODUCT_SUBMITTED:
                    return { ...state, inProgress: true };

                default:
                    return state;
            }

        case PRODUCT_PAGE_LOADED:
            return {
                ...state,
                inProgress: false,
                data: action.payload
                    ? {
                          ...action.payload.product,
                          description: htmlDecode(action.payload.product.description)
                      }
                    : state.data
            };

        case PRODUCT_PAGE_UNLOADED:
            return initialState;

        case PRODUCT_SUBMITTED:
            return {
                ...state,
                inProgress: false,
                error: action.error ? action.payload.message : null
            };

        case UPDATE_FIELD_PRODUCT_EDITOR:
            return {
                ...state,
                data: { ...state.data, [action.key]: action.value }
            };

        default:
            return state;
    }
}
