import React from "react";
import News from "./News";
import Articles from "../components/Articles";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Main() {
  return (
    <React.Fragment>
      <Header />
      <Articles />
      <News />
      <Footer />
    </React.Fragment>
  );
}

export default Main;
