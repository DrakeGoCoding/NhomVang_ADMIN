import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import editor from "./editor";
import newsList from "./newsList";

export default combineReducers({
    auth,
    common,
    editor,
    newsList
});
