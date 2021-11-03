import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./../assets/css/style.css";
import { deleteCuadro } from "../redux/actions/cuadroAction";

function ArtistPage() {
  const articles = useSelector((state) => state.allArticles.articles);
  const user = JSON.parse(localStorage.getItem("user"));
  const autorLoggin = `${user.firstName} ${user.lastName}`;
  const [misCuadros, setMisCuadros] = useState([]);
  const dispatch = useDispatch();

  const cargarCuadros = () => {
    let cuadros;
    if (articles) {
      cuadros = articles.filter(
        (article) => article.autor.toLowerCase() === autorLoggin.toLowerCase()
      );
    }
    setMisCuadros(cuadros);
  };

  useEffect(() => {
    cargarCuadros();
  }, [articles]);

  const eliminarCuadro = (id) => {
    dispatch(deleteCuadro(id));
    cargarCuadros();
  };

  return (
    <React.Fragment>
      <header className="mt-0 pt-0">
        <Navbar />
      </header>
      <div className="container mt-4 mb-4">
        <h2>Perfil de Artista</h2>
        <div>
          {misCuadros.length !== 0 ? (
            misCuadros.map((cuadro) => (
              <>
                <hr />
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-xs-12 image-container">
                    <img
                      src={cuadro.imagen}
                      alt=""
                      style={{ height: "300px", marginLeft: "-15px" }}
                    />
                  </div>
                  <div className="col-sm-6 col-md-6 col-xs-12 d-flex flex-column">
                    <h3>{cuadro.titulo}</h3>
                    <p style={{ textAlign: "justify" }}>{cuadro.descripcion}</p>
                    <p style={{ fontWeight: "bolder" }}>
                      {new Date(cuadro.fecha).toLocaleDateString()}
                    </p>
                    <button
                      type="button"
                      className="btn btn-blue ms-auto mt-2"
                      onClick={() => eliminarCuadro(cuadro.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </>
            ))
          ) : (
            <p className="mt-4">El artista no tiene cuadros registrados.</p>
          )}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default ArtistPage;
