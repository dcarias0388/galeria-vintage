import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import search from "./../assets/images/search-icon.png";
import close from "./../assets/images/close.png";
import LoginPage from "../pages/LoginPage";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/userActions";
import "./../assets/css/style.css";
import { authenticationService } from "../_services/authenticationService";
import { Role } from "../_helpers/role";

function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [show, setShow] = useState(false);
  const [showSelect, setShowSelect] = useState(false);
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  const user = useSelector((state) => state.authentication.user);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isArtista, setIsArtista] = useState(false);

  useEffect(() => {
    authenticationService.user.subscribe((x) => {
      if (x !== null) {
        setCurrentUser(x);
        setIsAdmin(x && x.role === Role.Admin);
        setIsArtista(x && x.role === Role.Artista);
      }
    });
  }, []);

  const toggleNavbar = () => {
    setCollapse(!collapse);
  };

  const toggleOpen = () => {
    setShowSelect(!showSelect);
  };

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleLogout = () => {
    dispatch(userActions.logout());
    setIsAdmin(false);
    setIsArtista(false);
  };
  return (
    <div className="bg-cover clearfix pt-3">
      <h2 className="logo">Gallery Vintage</h2>
      <nav className="nav nav-fill mx-auto">
        <li className="nav-item">
          <Link className="nav-link" to="https://facebook.com" target="_blank">
            <i className="fab fa-facebook-f" />
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="https://twitter.com" target="_blank">
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
      <input
        type="text"
        id="nav-search"
        className={
          showInput
            ? "showSearch nav-search mx-auto"
            : "hidden nav-search mx-auto"
        }
        name=""
      />
      <div className="ms-0 me-0 pb-1">
        <nav className="navbar navbar-expand-md">
          <button
            className={`navbar-toggler ms-auto ${collapse ? "change" : ""}`}
            type="button"
            data-bs-target="#my-nav"
            data-bs-toggle="collapse"
            aria-controls="my-nav"
            aria-expanded={collapse}
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
          >
            <span className="bar1" /> <span className="bar2" />
            <span className="bar3" />
          </button>
          <div
            id="my-nav"
            className={`collapse navbar-collapse ${collapse ? "show" : ""}`}
          >
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/galeria-vintage/">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/galeria-vintage/historia">
                  CONTENIDO
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/galeria-vintage/cultura">
                  CULTURA
                </Link>
              </li>
              {currentUser && isAdmin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/galeria-vintage/admin">
                      ADMIN
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/galeria-vintage/artista">
                      ARTISTA
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
              {currentUser && isArtista ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/galeria-vintage/artista">
                    ARTISTA
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                <div
                  className="input-group mt-0 mx-auto"
                  style={{ width: "16px" }}
                >
                  <button
                    type="submit"
                    className="buttonSearch"
                    onClick={() => setShowInput(!showInput)}
                  >
                    <img
                      src={showInput ? close : search}
                      id="toggle-search"
                      className="ms-2 toggle-search"
                      alt="search icon"
                    />
                  </button>
                </div>
              </li>
            </ul>
            {loggedIn ? (
              <div className="d-flex">
                <div className="dropdown" onClick={toggleOpen}>
                  <button
                    className="btn btn-outline dropdown-toggle me-4"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: "white",
                      textTransform: "uppercase",
                      fontWeight: "bolder",
                    }}
                  >
                    Bienvenido, {user.username}
                  </button>
                  <ul
                    className={`dropdown-menu ${showSelect ? "show" : ""}`}
                    style={{
                      backgroundColor: "#03133a",
                      color: "white",
                      width: "60%",
                    }}
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        style={{ color: "white" }}
                        to="/galeria-vintage/perfil"
                      >
                        Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        style={{ color: "white" }}
                        to="/galeria-vintage/"
                        onClick={handleLogout}
                      >
                        Cerrar Sesión
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <Button
                  className="me-5"
                  variant="outline-secondary"
                  style={{ fontWeight: "bolder", color: "white" }}
                  onClick={handleShow}
                >
                  LOGIN
                </Button>
                <LoginPage show={show} handleClose={handleClose} />
              </React.Fragment>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
