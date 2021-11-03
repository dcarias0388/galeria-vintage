import { ActionTypes } from "./../actions/actionTypes";

const initialState = {
  news: [],
};

export function news(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.SET_NEWS:
      return { ...state, news: action.payload };
    default:
      return state;
  }
}
