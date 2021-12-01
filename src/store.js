import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import reducers from "./reducers";
import { localStorageMiddleware, promiseMiddleware } from "./middleware";

const getMiddleware = () => {
    if (process.env.NODE_ENV === "production") {
        return applyMiddleware(promiseMiddleware, localStorageMiddleware);
    }
    return applyMiddleware(promiseMiddleware, localStorageMiddleware, logger);
};

export const store = createStore(reducers, composeWithDevTools(getMiddleware()));
