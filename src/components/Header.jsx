import React from "react";
import "./../assets/css/style.css";
import interior from "./../assets/images/interior1.jpg";
import food from "./../assets/images/food.jpg";
import architecture from "./../assets/images/architecture.jpg";
import travel from "./../assets/images/travel.jpg";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="mt-0 pt-0">
      <Navbar />
      <div className="row ms-0 me-0">
        <div className="col-md-3 pe-0 first">
          <div className="card">
            <img className="card-img header-img" src={architecture} alt="" />
            <div className="card-img-overlay">
              <h5>Arquitectura</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 ps-0 pe-0">
          <div className="card">
            <img className="card-img header-img" src={interior} alt="" />
            <div className="card-img-overlay">
              <h5 style={{ color: "black" }}>Interior</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 ps-0 pe-0">
          <div className="card">
            <img className="card-img header-img" src={food} alt="" />
            <div className="card-img-overlay">
              <h5>Comida</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 ps-0 last">
          <div className="card">
            <img className="card-img header-img" src={travel} alt="" />
            <div className="card-img-overlay">
              <h5 style={{ color: "black" }}>Viaje</h5>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
