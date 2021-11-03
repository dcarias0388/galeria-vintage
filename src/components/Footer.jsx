import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="container-fluid pt-5">
      <div className="container">
        <h2 className="logo text-center">Gallery Vintage</h2>
        <nav className="nav nav-fill mx-auto mt-5">
          <li className="nav-item">
            <Link className="nav-link" to="https://facebook.com/">
              <i className="fab fa-facebook-f" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="https://twitter.com/">
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
      </div>
      <div className="copyright mt-4">
        <p className="text-center">
          © {new Date().getFullYear()}{" "}
          <Link to="/" className="text-white">
            Gallery Vintage
          </Link>
          . Todos Los Derechos Reservados. Diseñado por Day.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
