import React, { useEffect, useState } from "react";
import Navbar from "./../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../redux/actions/userActions";
import Swal from "sweetalert2";
import Footer from "./../components/Footer";
import ocultar from "./../assets/images/ocultar.png";
import mostrar from "./../assets/images/mostrar.png";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";

function AdminPage() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });
  const [activeLi, setActiveLi] = useState(null);
  const [showUsers, setShowUsers] = useState(true);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState("");
  const [showNow, setShowNow] = useState(false);

  useEffect(() => {
    dispatch(userActions.getAll());
  }, [showUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const registerUser = () => {
    setShow(true);
    setShowUsers(false);
    setAction("registrar");
    setUser({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      role: "",
    });
  };

  const updateUser = () => {
    if (activeLi !== null) {
      setShow(true);
      setAction("modificar");
      const us = users.items.find((u) => parseInt(u.id) === parseInt(activeLi));
      setUser(us);
    } else {
      Swal.fire({
        text: "Seleccione un usuario para modificar.",
        icon: "warning",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const registrarUsuario = (e) => {
    e.preventDefault();

    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.role
    ) {
      if (action === "registrar") {
        dispatch(userActions.register(user));
      } else {
        dispatch(userActions.updateUser(user));
      }
      setUser({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: "",
      });
      setShow(false);
      setShowUsers(true);
    }
  };

  const cancelOperation = () => {
    setShowUsers(true);
    setShow(false);
  };

  const deleteUser = () => {
    if (activeLi !== "") {
      dispatch(userActions.delete(activeLi));
    }
  };

  return (
    <React.Fragment>
      <header className="mt-0 pt-0">
        <Navbar />
      </header>
      <div className="container mt-4 mb-4">
        <h2>Administración</h2>
        <div>
          {users.loading && <em>Cargando usuarios...</em>}
          {users.error && (
            <span className="text-danger">ERROR: {users.error}</span>
          )}
          {users.items && (
            <div
              className={`${
                showUsers ? "showAdminUser" : "hiddenAdminUser"
              } w-50 m-auto`}
            >
              <Tab.Container id="list-group-tabs">
                <ListGroup variant="flush">
                  {users.items.map((user) => (
                    <ListGroup.Item
                      action
                      key={user.id}
                      onClick={() => setActiveLi(user.id)}
                      value={user.id}
                      className={`${activeLi === user.id ? "active" : ""}`}
                    >
                      <i className="fas fa-user me-2" />
                      {user.firstName} {user.lastName}
                      {user.deleting ? (
                        <em> - Borrando...</em>
                      ) : user.deleteError ? (
                        <span className="text-danger">
                          {" "}
                          - ERROR: {user.deleteError}
                        </span>
                      ) : (
                        ""
                      )}
                      {user.updating ? (
                        <em> - Actualizando...</em>
                      ) : user.deleteError ? (
                        <span className="text-danger">
                          {" "}
                          - ERROR: {user.error}
                        </span>
                      ) : (
                        ""
                      )}
                    </ListGroup.Item>
                  ))}{" "}
                </ListGroup>
              </Tab.Container>

              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-blue ms-4 mt-2"
                  onClick={registerUser}
                >
                  Registrar
                </button>
                <button
                  type="submit"
                  onClick={updateUser}
                  className="btn btn-blue ms-4 mt-2"
                >
                  Modificar
                </button>
                <button
                  type="submit"
                  className="btn btn-blue ms-4 mt-2"
                  onClick={deleteUser}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )}
          <div className={`${show ? "showAdminUser" : "hiddenAdminUser"}`}>
            <hr />
            <form onSubmit={registrarUsuario}>
              <h5>
                {action === "registrar"
                  ? "Añadir un nuevo usuario"
                  : "Modificar usuario"}
              </h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-floating mt-2">
                    <input
                      type="text"
                      id="nombre"
                      className="form-control"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="nombre">Nombre</label>
                  </div>
                  <div className="form-floating mt-2">
                    <input
                      type="text"
                      id="apellidos"
                      name="lastName"
                      className="form-control"
                      value={user.lastName}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="apellidos">Apellidos</label>
                  </div>

                  <div className="form-floating mt-2">
                    <input
                      type="text"
                      id="usuario"
                      name="username"
                      className="form-control"
                      value={user.username}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="usuario">Usuario</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex form-floating mt-2">
                    <input
                      type={showNow ? "text" : "password"}
                      id="pass"
                      name="password"
                      className="form-control passWord"
                      value={user.password}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="pass">Contraseña</label>
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
                  </div>

                  <div className="form-floating mt-2">
                    <select
                      className="form-select"
                      aria-label="Roles"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                    >
                      <option defaultValue> </option>
                      <option value="User">Usuario</option>
                      <option value="Artista">Artista</option>
                      <option value="Admin">Administrador</option>
                    </select>
                    <label htmlFor="pass">Rol</label>
                  </div>
                  <div className="mt-4 text-end">
                    <button
                      type="submit"
                      className="btn btn-blue ms-4 mt-2"
                      style={{ width: "100px" }}
                    >
                      {action === "modificar" ? "Actualizar" : "Registrar"}
                    </button>
                    <button
                      type="button"
                      onClick={cancelOperation}
                      className="btn btn-blue ms-4 mt-2"
                      style={{ width: "100px" }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default AdminPage;
