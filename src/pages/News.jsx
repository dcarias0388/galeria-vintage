import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import "../assets/css/style.css";

function News() {
  const [news, setNews] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=bbe9d270b68e44e8bfad94bcac25cb3e",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
          },
        }
      );
      setNews(response.data.articles);
    } catch (err) {
      console.log("Err", err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="container-fluid fh5co-recent-news mt-5 pb-5">
      <h2 className="text-uppercase text-center">Noticias Recientes</h2>
      <hr className="mx-auto" />
      <div className="play-list">
        {news.length !== 0 && (
          <OwlCarousel className="owl-theme" items={3} loop margin={10} nav>
            {news.map((n, index) =>
              n.urlToImage !== null ? (
                <div key={index}>
                  <div className="card">
                    {" "}
                    <img
                      className="card-img link-img"
                      src={n.urlToImage}
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="bottom-area">
                        <div className="row">
                          <div className="col-5 pe-0 text-white">
                            <a
                              style={{
                                textDecoration: "none",
                                color: "white",
                              }}
                              target="_blank"
                              href={n.url}
                              rel="noreferrer"
                            >
                              <i className="fas fa-link" /> Leer más
                            </a>
                          </div>
                          <div className="col  pl-0   text-end">
                            <p className="text-white">
                              {new Date(n.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-white news-title mt-2">{n.title}</p>
                        <p className="text-white text-end">{n.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </OwlCarousel>
        )}
      </div>
    </div>
  );
}

export default News;
