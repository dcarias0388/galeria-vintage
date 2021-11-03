import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./../assets/css/style.css";
import {
  setArt,
  setArticles,
  setArtistas,
  setDate,
  setFetchData,
} from "./../redux/actions/cuadroAction";
import Article from "./Article";
import { Dropdown } from "react-bootstrap";

function Articles() {
  const date = useSelector((state) => state.allArticles.date);
  const art = useSelector((state) => state.allArticles.art);
  const artistas = useSelector((state) => state.allArticles.artistas);
  const dispatch = useDispatch();

  const fetchData = () => {
    fetch("json/galeria.json")
      .then((response) => response.json())
      .then((data) => dispatch(setArticles(data)))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeDate = () => {
    dispatch(setDate());
    fetchData();
  };

  const handdleChangeArt = () => {
    dispatch(setArt());
    dispatch(setArtistas());
    fetchData();
  };

  const handdleChangeSelect = (e) => {
    let index = e.target.selectedIndex;
    dispatch(setFetchData(e.target.options[index].text));
    fetchData();
  };

  return (
    <React.Fragment>
      <div className="container">
        <hr />
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            className="btn btn-blue btn-filtro"
          >
            Opciones de Búsqueda
          </Dropdown.Toggle>

          <Dropdown.Menu className="btn-blue">
            <div className="ms-2 me-2">
              <input
                type="checkbox"
                checked={date}
                onChange={handleChangeDate}
              />{" "}
              Ordenar por Fecha
            </div>
            <div className="ms-2 me-2">
              <input
                type="checkbox"
                checked={art}
                onChange={handdleChangeArt}
              />{" "}
              Seleccionar por Artista
              {art === true ? (
                <div>
                  <select className="mt-2 mb-2" onChange={handdleChangeSelect}>
                    <option></option>
                    {artistas.map((artist, index) => (
                      <option value={index} key={index}>
                        {artist}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <div className="row">
          <Article />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Articles;
