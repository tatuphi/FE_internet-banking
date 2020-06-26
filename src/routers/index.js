import React, { Component } from "react";
import history from "config/history.config";
import { Router, Switch, Route } from "react-router-dom";

import Login from "pages/Login";
import Homepage from "pages/Home";
import NotFound from "pages/NotFound";
import ForgetPassword from "pages/ForgetPassword";
import ChangePassword from "pages/ChangePassword";
import CreateBankAccount from "pages/CreateBankAccount";
import TransferMoney from "pages/TransferMoney";
import Info from "pages/Info";
import TransferOtherBank from "pages/TransferOtherBank";
import Beneficiary from "pages/Beneficiary";
import DeptRemind from "pages/DeptRemind";
class WrapRouter extends Component {
  componentDidMount() { }
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
        path: "/info",
        exact: true,
        main: () => <Info />,
      },
      {
        path: "/createAccount",
        exact: true,
        main: () => <CreateBankAccount />,
      },
      {
        path: "/forgetPassword",
        exact: true,
        main: () => <ForgetPassword />,
      },
      {
        path: "/changePassword",
        exact: true,
        main: () => <ChangePassword />,
      },
      {
        path: "/transferMoney",
        exact: true,
        main: () => <TransferMoney />,
      },
      {
        path: "/transferOtherBank",
        exact: true,
        main: () => <TransferOtherBank />,
      },
      {
        path: "/beneficiary",
        exact: true,
        main: () => <Beneficiary />,
      },
      {
        path: "/deptRemind",
        exact: true,
        main: () => <DeptRemind />,
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
