import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticationService } from "./../_services/authenticationService";

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const user = authenticationService.currentUserValue;
        if (!user) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(user.role) === -1) {
          // role not authorised so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }

        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
