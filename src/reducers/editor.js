import {
    ASYNC_START,
    EDITOR_PAGE_LOADED,
    EDITOR_PAGE_UNLOADED,
    NEWS_SUBMITTED,
    UPDATE_FIELD_EDITOR
} from "../constants/actionTypes";
import { htmlDecode } from "../utils/decoder";

export default function editorReducer(state = {}, action) {
    switch (action.type) {
        case ASYNC_START:
            if (action.subtype === NEWS_SUBMITTED) {
                return { ...state, inProgress: true };
            }
            return state;

        case EDITOR_PAGE_LOADED:
            return {
                ...state,
                author: action.payload ? action.payload.news.author : "",
                slug: action.payload ? action.payload.news.slug : "",
                title: action.payload ? action.payload.news.title : "",
                description: action.payload ? action.payload.news.description : "",
                content: action.payload ? htmlDecode(action.payload.news.content) : "",
                thumbnail: action.payload ? action.payload.news.thumbnail : ""
            };
        case EDITOR_PAGE_UNLOADED:
            return {};

        case NEWS_SUBMITTED:
            return {
                ...state,
                inProgress: false,
                error: action.error ? action.payload.message : null
            };

        case UPDATE_FIELD_EDITOR:
            return { ...state, [action.key]: action.value };

        default:
            return state;
    }
}
