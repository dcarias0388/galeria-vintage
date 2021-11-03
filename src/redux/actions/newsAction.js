import { ActionTypes } from "./actionTypes";

export const setNews = (listNews) => {
  return {
    type: ActionTypes.SET_NEWS,
    payload: listNews,
  };
};
