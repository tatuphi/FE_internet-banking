import React, { Component } from "react";
import history from "config/history.config";
import { Router, Switch, Route, Redirect } from "react-router-dom";

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
import HistoryPayment from "pages/historyPagement";
import ApplyMoney from "pages/Employee/ApplyMoney";
import CustomerHistoryTransaction from "pages/Employee/CustomerHistoryTransaction";
class WrapRouter extends Component {
  componentDidMount() { }
  render() {

    const role = localStorage.getItem('role')
    console.log(role)
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
        path: "/employee/createAccount",
        exact: true,
        main: () => role === 'EMPLOYEE' ? <CreateBankAccount /> : <Redirect to='/' />
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
        main: () => role === 'CUSTOMER' ? <Beneficiary /> : <Redirect to='/' />
      },
      {
        path: "/deptRemind",
        exact: true,
        main: () => <DeptRemind />,
      },
      {
        path: "/historyPagement",
        exact: true,
        main: () => <HistoryPayment />,
      },

      {
        path: "/employee/applyMoney",
        exact: true,
        main: () => role === 'EMPLOYEE' ? <ApplyMoney /> : <Redirect to='/' />,
      },
      {
        path: "/employee/customerTransaction",
        exact: true,
        main: () => role === 'EMPLOYEE' ? <CustomerHistoryTransaction /> : <Redirect to='/' />,
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
