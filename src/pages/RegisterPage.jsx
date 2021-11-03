import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "../_helpers/role";
import { userActions } from "../redux/actions/userActions";

const RegisterPage = ({ handleClose }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: Role.User,
  });
  const [submitted, setSubmitted] = useState(false);
  const registering = useSelector((state) => state.registration.registering);
  const dispatch = useDispatch();

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (user.firstName && user.lastName && user.username && user.password) {
      dispatch(userActions.register(user));
      handleClose();
    }
  };

  return (
    <div className="container mb-4">
      <form name="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.firstName ? " is-invalid" : "")
            }
          />
          {submitted && !user.firstName && (
            <div className="invalid-feedback">El nombre es requerido</div>
          )}
        </div>
        <div className="form-group mt-2">
          <label>Apellidos</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.lastName ? " is-invalid" : "")
            }
          />
          {submitted && !user.lastName && (
            <div className="invalid-feedback">Apellido es requerido.</div>
          )}
        </div>
        <div className="form-group mt-2">
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.username ? " is-invalid" : "")
            }
          />
          {submitted && !user.username && (
            <div className="invalid-feedback">Usuario es requerido</div>
          )}
        </div>
        <div className="form-group mt-2">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className={
              "form-control" +
              (submitted && !user.password ? " is-invalid" : "")
            }
          />
          {submitted && !user.password && (
            <div className="invalid-feedback">Contraseña es requerida</div>
          )}
        </div>
        <div className="form-group mt-4">
          <button className="btn btn-blue">
            {registering && (
              <span className="spinner-border spinner-border-sm ms-1"></span>
            )}
            Registrar
          </button>
          <button className="btn btn-blue ms-2" onClick={handleClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
