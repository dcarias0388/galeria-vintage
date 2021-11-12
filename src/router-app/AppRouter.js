import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "../_helpers/history";
import Main from "../pages/Main";
import { Role } from "./../_helpers/role";
import { PrivateRoute } from "./PrivateRoute";
import AdminPage from "./../pages/AdminPage";
import ArtistPage from "../pages/ArtistPage";
import MiPerfil from "../pages/MiPerfil";
import ArticleDetaills from "../components/ArticleDetaills";
import CulturaDetaills from "../pages/CulturaDetaills";
import { useSelector } from "react-redux";
import HistoriaDetaills from "../pages/HistoriaDetaills";

function AppRouter() {
  const alert = useSelector((state) => state.alert);

  return (
    <React.Fragment>
      {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )}
      <Router basename="/galeria-vintage" history={history}>
        <Switch>
          <Route path="/" exact component={Main} />
          <PrivateRoute
            path="/admin"
            roles={[Role.Admin]}
            component={AdminPage}
          />
          <PrivateRoute
            path="/artista"
            roles={[Role.Artista, Role.Admin]}
            component={ArtistPage}
          />
          <Route path="/perfil" exact component={MiPerfil} />
          <Route path="/article/:articleId" exact component={ArticleDetaills} />
          <Route path="/cultura" exact component={CulturaDetaills} />
          <Route path="/historia" exact component={HistoriaDetaills} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default AppRouter;
