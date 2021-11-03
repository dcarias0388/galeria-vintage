import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./../assets/css/style.css";
import { authenticationService } from "./../_services/authenticationService";
import { Role } from "./../_helpers/role";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Article() {
  const articles = useSelector((state) => state.allArticles.articles);
  const user = useSelector((state) => state.authentication.user);
  const [currentUser, setCurrentUser] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    authenticationService.user.subscribe((x) => {
      if (x !== null) {
        setCurrentUser(x);
        setIsUser(x && x.role === Role.User);
      }
    });
  }, [user]);

  const addFavoritos = (e) => {
    const classL = e.target.classList;
    if (!classL.contains("favorito")) {
      classL.add("favorito");
      setFavorito(true);
    } else {
      classL.remove("favorito");
      setFavorito(false);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {favorito ? "Remover de favoritos" : "Añadir a favoritos"}
    </Tooltip>
  );

  const renderList = articles.map((article) => {
    const { id, titulo, autor, fecha, imagen } = article;
    return (
      <div className="col-md-4 mb-4 mt-4" key={id}>
        <div className="container-fluid fh5co-recent-news mx-auto">
          <div className="card">
            {" "}
            <img className="card-img link-img" src={imagen} alt="" />
            <div className="card-img-overlay">
              <div className="top-area">
                {currentUser && isUser ? (
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <button
                      to="#"
                      className="mx-auto d-block buttonSearch"
                      onClick={addFavoritos}
                    >
                      <i className="far fa-heart" />
                    </button>
                  </OverlayTrigger>
                ) : (
                  ""
                )}
              </div>
              <div className="bottom-area">
                <div className="row">
                  <div className="col-5 pe-0 text-white">
                    <Link to={`/article/${id}`} className="text-white">
                      {" "}
                      <i className="fas fa-link" /> Ver
                    </Link>
                  </div>
                  <div className="col  pe-3   text-end">
                    <p className="text-white">
                      {" "}
                      {new Date(fecha).toLocaleDateString()}{" "}
                    </p>
                  </div>
                </div>
                <h4 className="text-white mt-2">{titulo}</h4>
                <p className="text-white">{autor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <React.Fragment> {renderList}</React.Fragment>;
}

export default Article;
