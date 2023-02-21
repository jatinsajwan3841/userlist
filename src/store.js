import {
    legacy_createStore as createStore,
    compose,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const initialState = {};

const composedEnhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
);

const store = createStore(rootReducer, initialState, composedEnhancer);

export default store;
