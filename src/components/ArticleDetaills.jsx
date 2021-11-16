import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "./../components/Navbar";
import "./../assets/css/style.css";
import { addComent } from "../redux/actions/cuadroAction";

import fullScreem from "./../assets/images/full-screen.png";
import carla from "./../assets/images/carlla-willstons.jpg";
import tom from "./../assets/images/tom-jhonson.jpg";
import mark from "./../assets/images/mark-tommson.jpg";
import insta from "./../assets/images/insta1.png";
import rightIcon from "./../assets/images/right-icon.png";
import insta2 from "./../assets/images/insta2.png";
import insta3 from "./../assets/images/insta3.png";
import insta4 from "./../assets/images/insta4.png";
import insta5 from "./../assets/images/insta5.png";
import insta6 from "./../assets/images/insta6.png";
import post1 from "./../assets/images/t-post1.png";
import post2 from "./../assets/images/t-post2.png";
import post3 from "./../assets/images/t-post3.png";
import Footer from "./Footer";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function ArticleDetaills() {
  const { articleId } = useParams();
  const articles = useSelector((state) => state.allArticles.articles);
  const [cuadro, setCuadro] = useState({});
  const dispatch = useDispatch();
  let [coment, setComent] = useState({
    nombre: "",
    email: "",
    comentario: "",
    fecha: "",
  });

  const fetchArticleDetaills = () => {
    const cuad = articles.find((x) => x.id === parseInt(articleId));
    setCuadro({ ...cuadro, ...cuad });
  };

  useEffect(() => {
    if (articleId !== "") fetchArticleDetaills();
  }, [articleId]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setComent((coment) => ({ ...coment, [name]: value }));
  };

  const addcomentario = (e) => {
    e.preventDefault();
    coment.fecha = new Date().toISOString();
    setComent({ ...coment });

    dispatch(addComent(coment, articleId));

    setComent({ nombre: "", email: "", comentario: "", fecha: "" });
  };

  return (
    <div className="article-pg">
      <header className="mt-0 pt-0">
        <Navbar />
      </header>
      <div className="container-fluid ar-content pt-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 pr-5">
              <div className="card ar-img-over">
                <img
                  className="card-img"
                  src={`./../${cuadro.imagen}`}
                  alt=""
                />
                {/* <div className="card-img-overlay">
                  <Link
                    to="#"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <img src={fullScreem} alt="full" />
                  </Link>
                </div> */}
              </div>
              <div className="row date-time mt-3"></div>
              <h2>{cuadro.titulo}</h2>
              <p>{cuadro.descripcion}</p>

              {cuadro.comentarios !== undefined && (
                <div className="comment-section mt-5">
                  <h3>{cuadro.comentarios.length} Comentarios</h3>
                  <hr className="ms-0" />
                  {cuadro.comentarios.map((coment, index) => (
                    <div className="media pt-5" key={index}>
                      <div className="media-body">
                        <div className="row">
                          <div className="col text-left">
                            <h4>{coment.nombre}</h4>
                          </div>
                          <div className="col text-right">
                            <p className="my-0">
                              <span>
                                Add{" "}
                                {new Date(coment.fecha).toLocaleDateString()}
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                        <p>{coment.comentario}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="comment-form my-5 pt-5">
                <h3>Añadir comentarios</h3>
                <hr className="ml-0" />
                <hr className="s-br" />
                <form onSubmit={addcomentario}>
                  <table className="table table-borderless mt-4">
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={coment.nombre}
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Nombre"
                            required
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={coment.email}
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Email"
                            required
                          />{" "}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <textarea
                            className="form-control"
                            id="comentario"
                            name="comentario"
                            defaultValue={coment.comentario}
                            onChange={handleOnChange}
                            placeholder="Comentario"
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <button
                            type="submit"
                            className="btn btn-blue ms-auto d-block"
                          >
                            Añadir Comentario
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
            <div className="col-lg-3 pl-0">
              <div className="sidebar">
                <h3 className="text-center text-white">Autores destacados</h3>
                <hr
                  className="bg-white mt-0"
                  style={{ height: "5px", opacity: "1", marginLeft: "45%" }}
                />
                <OwlCarousel
                  className="owl-theme"
                  items={1}
                  loop
                  margin={8}
                  nav
                >
                  <div>
                    <div className="card pb-5">
                      {" "}
                      <img
                        className="card-img link-img rounded"
                        src={carla}
                        alt=""
                      />
                    </div>
                    <h3 className="text-center mt-3 mb-0">Carlla Willstons</h3>
                    <p className="text-center mt-1 third-clr">Reportera</p>
                  </div>
                  <div>
                    <div className="card pb-5">
                      {" "}
                      <img
                        className="card-img link-img rounded"
                        src={tom}
                        alt=""
                      />
                    </div>
                    <h3 className="text-center mt-3 mb-0">Tom Jhonson</h3>
                    <p className="text-center mt-1 third-clr">Compositor</p>
                  </div>
                  <div>
                    <div className="card pb-5">
                      {" "}
                      <img
                        className="card-img link-img rounded"
                        src={mark}
                        alt=""
                      />
                    </div>
                    <h3 className="text-center mt-3 mb-0">Mark Tommson</h3>
                    <p className="text-center mt-1 third-clr">Director</p>
                  </div>
                </OwlCarousel>

                <h3 className="text-center mt-5">Síguenos</h3>
                <hr
                  className="mx-auto"
                  style={{
                    height: "3px",
                    backgroundColor: "#03133a",
                    opacity: "1",
                  }}
                />
                <nav className="nav nav-fill mx-auto mb-5">
                  <li className="nav-item">
                    <Link className="nav-link" to="https://facebook.com">
                      <i className="fab fa-facebook-f" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="https://twitter.com">
                      <i className="fab fa-twitter" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      <i className="fab fa-instagram" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      <i className="fab fa-google-plus-g" />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#">
                      <i className="fas fa-rss" />
                    </Link>
                  </li>
                </nav>
                <h3 className="text-center">Instagram</h3>
                <hr
                  className="mx-auto"
                  style={{
                    height: "3px",
                    backgroundColor: "#03133a",
                    opacity: "1",
                  }}
                />
                <div className="row insta-links mt-2">
                  <div className="col-md-4 col-sm-6 col-6">
                    <div className="card">
                      <img className="card-img w-100" src={insta} alt="" />
                      <div className="card-img-overlay d-flex justify-content-center align-items-center">
                        <Link to="#">
                          <img src={rightIcon} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-6">
                    <div className="card">
                      <img className="card-img w-100" src={insta2} alt="" />
                      <div className="card-img-overlay d-flex justify-content-center align-items-center">
                        <Link to="#">
                          <img src={rightIcon} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-6">
                    <div className="card">
                      <img className="card-img w-100" src={insta3} alt="" />
                      <div className="card-img-overlay d-flex justify-content-center align-items-center">
                        <Link to="#">
                          <img src={rightIcon} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-6">
                    <div className="card">
                      <img className="card-img w-100" src={insta4} alt="" />
                      <div className="card-img-overlay d-flex justify-content-center align-items-center">
                        <Link to="#">
                          <img src={rightIcon} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-6">
                    <div className="card">
                      <img className="card-img w-100" src={insta5} alt="" />
                      <div className="card-img-overlay d-flex justify-content-center align-items-center">
                        <Link to="#">
                          <img src={rightIcon} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-6 col-6">
                    <div className="card">
                      <img className="card-img w-100" src={insta6} alt="" />
                      <div className="card-img-overlay d-flex justify-content-center align-items-center">
                        <Link to="#">
                          <img src={rightIcon} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-center mt-5">Publicaciones de tendencia</h3>
                <hr
                  className="mx-auto"
                  style={{
                    height: "3px",
                    backgroundColor: "#03133a",
                    opacity: "1",
                  }}
                />
                <div className="tranding-posts mt-4">
                  <div className="media my-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to="#">
                        <img src={post1} alt="" />
                      </Link>
                    </div>
                    <div className="media-body text-center d-flex align-items-center justify-content-center flex-column px-3">
                      <Link to="#">Las últimas tendencias en viajes</Link>
                      <p className="mt-1">08 Ene 2020</p>
                    </div>
                  </div>
                  <div className="media my-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to="#">
                        <img src={post2} alt="" />
                      </Link>
                    </div>
                    <div className="media-body text-center d-flex align-items-center justify-content-center flex-column px-3">
                      <Link to="#">Diseño eficaz de bellas artes</Link>
                      <p className="mt-1">12 Mar 2020</p>
                    </div>
                  </div>
                  <div className="media my-3">
                    <div className="d-flex align-items-center justify-content-center">
                      <Link to="#">
                        <img src={post3} alt="" />
                      </Link>
                    </div>
                    <div className="media-body text-center d-flex align-items-center justify-content-center flex-column px-3">
                      <Link to="#">¿Cómo diseñar tu primer PSD?</Link>
                      <p className="mt-1">20 Oct 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ArticleDetaills;
