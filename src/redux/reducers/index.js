import { combineReducers } from "redux";
import { articleReducer } from "./cuadroReducer";
import { users } from "./userReducer";
import { alert } from "./alertReducer";
import { authentication } from "./authenticationReducer";
import { registration } from "./registrationReducer";
import { news } from "./newsReducer";

const reducers = combineReducers({
  allArticles: articleReducer,
  users,
  alert,
  authentication,
  registration,
  news,
});

export default reducers;
