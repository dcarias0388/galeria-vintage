import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../redux/actions/userActions";
import { Modal, Tabs, Tab } from "react-bootstrap";
import RegisterPage from "./RegisterPage";
import { history } from "../_helpers/history";
import { alertActions } from "../redux/actions/alertActions";

const LoginPage = ({ show, handleClose }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector((state) => state.authentication.loggingIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const [key, setKey] = useState("login");

  // reset login status
  useEffect(() => {
    dispatch(userActions.logout());
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
    if (username && password) {
      // get return url from location state or default to home page
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(userActions.login(username, password, from));

      handleClose();
    }
  };

  return (
    <Modal
      show={show}
      backdrop="static"
      size="m"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="login" title="LOGUEARSE">
          <div className="container">
            <form name="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  className={
                    "form-control" +
                    (submitted && !username ? " is-invalid" : "")
                  }
                />
                {submitted && !username && (
                  <div className="invalid-feedback">Usuario es requerido.</div>
                )}
              </div>
              <div className="form-group mt-2">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className={
                    "form-control" +
                    (submitted && !password ? " is-invalid" : "")
                  }
                />
                {submitted && !password && (
                  <div className="invalid-feedback">Password es requerido.</div>
                )}
              </div>
              <Modal.Footer className="mt-4">
                <div className="form-group">
                  <button className="btn btn-blue">
                    {loggingIn && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Loguear
                  </button>
                  <button className="btn btn-blue ms-2" onClick={handleClose}>
                    Cancelar
                  </button>
                </div>
              </Modal.Footer>
            </form>
          </div>
        </Tab>
        <Tab eventKey="register" title="REGISTRARSE">
          <RegisterPage handleClose={handleClose} />
        </Tab>
      </Tabs>
    </Modal>
  );
};

export default LoginPage;
