import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/style.css";
import Footer from "./../components/Footer";

function NewsDetaills() {
  const [obra, setObra] = useState([]);

  const fetchPinturas = () => {
    fetch("json/pinturas.json")
      .then((response) => response.json())
      .then((data) => setObra(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchPinturas();
  }, []);

  return (
    <React.Fragment>
      <header className="mt-0 pt-0">
        <Navbar />
      </header>
      <div className="container mt-4 mb-4">
        <h3>Conociendo más del arte....</h3>
        <div className="row">
          {obra.map((x, index) => (
            <div key={index} className="col-lg-4 col-md-6 text-center">
              <hr />
              <div className="mt-4">
                <figure>
                  <img className="newsImg" src={x.image} alt="" />
                </figure>
                <figcaption>
                  <i>
                    <b>{x.title}</b>, {x.artistName} {x.yearAsString}
                  </i>
                </figcaption>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default NewsDetaills;
