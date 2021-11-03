import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import "./../assets/css/style.css";
import ocultar from "./../assets/images/ocultar.png";
import mostrar from "./../assets/images/mostrar.png";
import { history } from "../_helpers/history";
import { userActions } from "./../redux/actions/userActions";
import Navbar from "../components/Navbar";

function MiPerfil() {
  const user = useSelector((state) => state.authentication.user);
  const users = JSON.parse(localStorage.getItem("users"));
  const [submitted, setSubmitted] = useState(false);
  const [newUser, setNewUser] = useState({
    id: user.id,
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [showNow, setShowNow] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passNow, setPassNow] = useState("");
  const dispatch = useDispatch();

  let usuario = users.find((x) => x.id === user.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((newUser) => ({ ...newUser, [name]: value }));
  };

  const handleChangePass = (e) => {
    setPassNow(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (
      ((newUser.password === "" && passNow === "") ||
        (newUser.password !== "" && passNow !== "")) &&
      passNow === usuario.password
    ) {
      dispatch(userActions.updateUser(newUser));
      dispatch(userActions.logout());
      history.push("/");
    }
  };

  const handleClosePerfil = () => {
    history.push("/");
  };

  return (
    <div className="article-pg">
      <header className="mt-0 pt-0">
        <Navbar />
      </header>
      <div className="container mt-4 mb-4">
        <h1>Mi Perfil</h1>
        <Form className="form-perfil" onSubmit={handleSubmit}>
          <div className="d-flex">
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={newUser.firstName}
                onChange={handleChange}
                placeholder={user.firstName}
              />
            </Form.Group>
            <Form.Group className="ms-4">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={newUser.lastName}
                onChange={handleChange}
                placeholder={user.lastName}
              />
            </Form.Group>
          </div>

          <div className="d-flex mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleChange}
                placeholder={user.username}
              />
            </Form.Group>

            <Form.Group className="ms-4 passPerfil" style={{ width: "41%" }}>
              <Form.Label>Contraseña Actual</Form.Label>
              <div className="d-flex flex-wrap">
                <Form.Control
                  type={showNow ? "text" : "password"}
                  value={passNow}
                  style={{ width: "65%" }}
                  onChange={handleChangePass}
                  className={
                    "form-control" +
                    (submitted && newUser.password && !passNow
                      ? " is-invalid"
                      : "") +
                    (submitted &&
                    newUser.password &&
                    passNow &&
                    passNow !== usuario.password
                      ? " is-invalid"
                      : "")
                  }
                />
                <button
                  type="button"
                  className="buttonSearch"
                  onClick={() => setShowNow(!showNow)}
                >
                  <img
                    src={showNow ? mostrar : ocultar}
                    id="toggle-ocultar"
                    className="showPass"
                    alt="Ocultar"
                  />
                </button>
                {submitted && newUser.password && !passNow && (
                  <div className="invalid-feedback">
                    Escriba la contraseña actual.
                  </div>
                )}
                {submitted &&
                  newUser.password &&
                  passNow &&
                  passNow !== usuario.password && (
                    <div className="invalid-feedback">
                      La contraseña escrita no se corresponde con su contraseña
                      actual.
                    </div>
                  )}
              </div>
              <Form.Label className="mt-3">Contraseña Nueva</Form.Label>
              <div className="d-flex flex-wrap">
                <Form.Control
                  type={showNew ? "text" : "password"}
                  name="password"
                  style={{ width: "65%" }}
                  value={newUser.password}
                  onChange={handleChange}
                  className={
                    "form-control" +
                    (submitted && !newUser.password && passNow
                      ? " is-invalid"
                      : "")
                  }
                />
                <button
                  type="button"
                  className="buttonSearch"
                  onClick={() => setShowNew(!showNew)}
                >
                  <img
                    src={showNew ? mostrar : ocultar}
                    id="toggle-ocultar"
                    className="showPass"
                    alt="Ocultar"
                  />
                </button>
                {submitted && !newUser.password && passNow && (
                  <div className="invalid-feedback flex-column">
                    Escriba la nueva contraseña.
                  </div>
                )}
              </div>
            </Form.Group>
          </div>
          <Button type="submit" className="btn btn-blue btnAceptar mt-4">
            Actualizar
          </Button>
          <Button
            type="button"
            className="btn btn-blue btnAceptar ms-2 mt-4 ps-4 pe-4"
            onClick={handleClosePerfil}
          >
            Salir
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
}

export default MiPerfil;
