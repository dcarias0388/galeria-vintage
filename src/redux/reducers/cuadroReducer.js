import { ActionTypes } from "./../actions/actionTypes";

const initialState = {
  articles: [],
  date: false,
  art: false,
  artistas: [],
  artista: "",
};

export const articleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_ARTICLES: {
      let arrayArticles = payload;
      if (state.date === true) {
        arrayArticles.sort(
          (a, b) => new Date(a.fecha).getTime() > new Date(b.fecha).getTime()
        );
      }
      if (state.artista !== "" && state.art) {
        arrayArticles = arrayArticles.filter(
          (art) => JSON.stringify(art.autor) === JSON.stringify(state.artista)
        );
      }

      return { ...state, articles: arrayArticles };
    }

    case ActionTypes.SET_DATE:
      return { ...state, date: !state.date };

    case ActionTypes.SET_ART:
      return { ...state, art: !state.art };

    case ActionTypes.SET_ARTISTAS: {
      let copyArray = [...state.articles];
      let newArray = [];
      let lookupObject = {};

      for (let i in copyArray) {
        lookupObject[copyArray[i]["autor"]] = copyArray[i];
      }

      for (let i in lookupObject) {
        newArray.push(lookupObject[i].autor);
      }

      return { ...state, artistas: newArray };
    }
    case ActionTypes.SET_FETCHDATA:
      return { ...state, artista: payload };

    case ActionTypes.DELETE_CUADRO:
      return {
        ...state,
        articles: state.articles.filter((art) => art.id !== payload),
      };

    case ActionTypes.ADD_COMENT:
      console.log("Entro al reducer " + payload.coment);
      const copyArticles = state.articles;
      const coment = payload.coment;

      copyArticles.forEach((art) => {
        console.log(
          "entro al foreach  " + parseInt(art.id) + parseInt(payload.id)
        );
        if (parseInt(art.id) === parseInt(payload.id)) {
          console.log("entro a los id iguales " + art.comentarios.length);
          coment.id = art.comentarios.length
            ? Math.max(...art.comentarios.map((x) => x.id)) + 1
            : 1;
          console.log("este es el id del comentario " + coment.id);
          art.comentarios.push(coment);
          console.log("se agrego el comentario " + JSON.stringify(art));
        }
      });

      return {
        ...state,
        articles: copyArticles,
      };

    default:
      return state;
  }
};
