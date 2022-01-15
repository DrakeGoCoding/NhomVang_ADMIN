import { setToken } from "../api/agent";
import { ASYNC_START, LOGIN, LOGOUT, REGISTER } from "./actions";

export const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    action.payload.then(
      res => {
        action.payload = res;
        store.dispatch(action);
      },
      error => {
        action.error = true;
        action.payload = error.response?.data;
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

export const localStorageMiddleware = store => next => action => {
  if (action.type === REGISTER || action.type === LOGIN) {
    if (!action.error) {
      localStorage.setItem("jwt", action.payload.token);
      setToken(action.payload.token);
    }
  } else if (action.type === LOGOUT) {
    localStorage.removeItem("jwt");
    setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === "function";
}
