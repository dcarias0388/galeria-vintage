import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./reducers/index";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const logger = createLogger();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(thunk, logger))
);

export default store;
