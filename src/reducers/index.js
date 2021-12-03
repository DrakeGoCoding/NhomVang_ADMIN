import { combineReducers } from "redux";
import auth from "./auth";
import common from "./common";
import editor from "./editor";
import newsList from "./newsList";
import productList from "./productList";
import userList from "./userList";

export default combineReducers({
    auth,
    common,
    editor,
    newsList,
    productList,
    userList
});
