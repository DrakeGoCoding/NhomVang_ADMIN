import {
  ASYNC_START,
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  NEWS_SUBMITTED,
  UPDATE_FIELD_NEWS_EDITOR
} from "../actions";
import { htmlDecode } from "../../utils";

const initialState = {
  data: {
    author: "",
    slug: "",
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    tags: []
  },
  inProgress: false
};

export default function editorReducer(state = initialState, action) {
  switch (action.type) {
    case ASYNC_START:
      switch (action.subtype) {
        case EDITOR_PAGE_LOADED:
        case NEWS_SUBMITTED:
          return { ...state, inProgress: true };

        default:
          return state;
      }

    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        inProgress: false,
        data: action.payload
          ? {
              ...action.payload.news,
              content: htmlDecode(action.payload.news.content)
            }
          : state.data
      };
    case EDITOR_PAGE_UNLOADED:
      return initialState;

    case NEWS_SUBMITTED:
      return {
        ...state,
        inProgress: false,
        error: action.error ? action.payload.message : null
      };

    case UPDATE_FIELD_NEWS_EDITOR:
      return { ...state, data: { ...state.data, [action.key]: action.value } };

    default:
      return state;
  }
}
