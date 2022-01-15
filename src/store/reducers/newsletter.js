import {
  ASYNC_START,
  NEWSLETTER_PAGE_LOADED,
  NEWSLETTER_PAGE_UNLOADED,
  UPDATE_FIELD_NEWSLETTER_EDITOR
} from "../actions";
import { htmlDecode } from "../../utils";

const initialState = {
  data: {
    subject: "",
    content: ""
  },
  subscriberCount: 0,
  inProgress: false
};

export default function newsletterReducer(state = initialState, action) {
  switch (action.type) {
    case ASYNC_START:
      switch (action.subtype) {
        case NEWSLETTER_PAGE_LOADED:
          return { ...state, inProgress: true };
        default:
          return state;
      }

    case NEWSLETTER_PAGE_LOADED:
      return {
        ...state,
        inProgress: false,
        subscriberCount: action.payload[0]
          ? action.payload[0].count
          : state.subscriberCount,
        data: action.payload[1]
          ? {
              ...action.payload[1].newsletter,
              content: htmlDecode(action.payload[1].newsletter.content)
            }
          : state.data
      };

    case NEWSLETTER_PAGE_UNLOADED:
      return initialState;

    case UPDATE_FIELD_NEWSLETTER_EDITOR:
      return {
        ...state,
        data: {
          ...state.data,
          [action.key]: action.value
        }
      };

    default:
      return state;
  }
}
