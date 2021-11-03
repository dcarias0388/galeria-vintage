import { ActionTypes } from "./actionTypes";

export const setArticles = (articles) => {
  return {
    type: ActionTypes.SET_ARTICLES,
    payload: articles,
  };
};

export const setDate = () => {
  return {
    type: ActionTypes.SET_DATE,
  };
};

export const setArt = () => {
  return {
    type: ActionTypes.SET_ART,
  };
};

export const setArtistas = () => {
  return {
    type: ActionTypes.SET_ARTISTAS,
  };
};

export const setFetchData = (artist) => {
  return {
    type: ActionTypes.SET_FETCHDATA,
    payload: artist,
  };
};

export const deleteCuadro = (id) => {
  return {
    type: ActionTypes.DELETE_CUADRO,
    payload: id,
  };
};

export const addComent = (coment, id) => {
  console.log("este fue el comentario que llego" + JSON.stringify(coment));
  return {
    type: ActionTypes.ADD_COMENT,
    payload: { coment: coment, id: id },
  };
};
