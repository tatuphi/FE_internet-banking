import React, { Component } from "react";
import history from "config/history.config";
import { Router, Switch, Route } from "react-router-dom";

import Login from "pages/Login";
import Homepage from "pages/Home";
import NotFound from "pages/NotFound";

class WrapRouter extends Component {
  render() {
    const routes = [
      {
        path: "/",
        exact: true,
        main: () => <Homepage />,
      },
      {
        path: "/login",
        exact: true,
        main: () => <Login />,
      },
      {
        path: "",
        exact: true,
        main: () => <NotFound />,
      },
    ];
    return (
      <Router history={history}>
        <Switch>
          {routes.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              component={item.main}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}

export default WrapRouter;
