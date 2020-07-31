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
import ManageEmployee from "pages/Admin/ManageEmployee";
import TransactionOtherBank from "pages/Admin/TransactionOtherBank";
import Profile from "pages/Profile";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
class WrapRouter extends Component {
  componentDidMount() {}
  render() {
    const noLayoutRoutes = [
      {
        path: "/login",
        exact: true,
        main: () => <Login />,
      },
      {
        path: "/forgetPassword",
        exact: true,
        main: () => <ForgetPassword />,
      },
      {
        path: "",
        exact: true,
        main: () => <NotFound />,
      },
    ];
    const routes = [
      {
        path: "/",
        exact: true,
        main: () => <Homepage />,
      },

      {
        path: "/info",
        exact: true,
        main: () => <Info />,
      },
      {
        path: "/profile",
        exact: true,
        main: () => <Profile />,
      },
      {
        path: "/employee/createAccount",
        exact: true,
        main: () => <CreateBankAccount />,
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
        path: "/historyPagement",
        exact: true,
        main: () => <HistoryPayment />,
      },

      {
        path: "/employee/applyMoney",
        exact: true,
        main: () => <ApplyMoney />,
      },
      {
        path: "/employee/customerTransaction",
        exact: true,
        main: () => <CustomerHistoryTransaction />,
      },

      {
        path: "/admin/getEmployee",
        exact: true,
        main: () => <ManageEmployee />,
      },
      {
        path: "/admin/transactionOtherBank",
        exact: true,
        main: () => <TransactionOtherBank />,
      },
    ];
    return (
      <Router history={history}>
        <Switch>
          {routes.map((item, index) => (
            <Route key={index} path={item.path} exact={item.exact}>
              <>
                <div className="fixed-top">
                  <Header />
                </div>
                <div className="mt-5">{item.main()}</div>

                <Footer />
              </>
            </Route>
          ))}
          {noLayoutRoutes.map((item, index) => (
            <Route key={index} path={item.path} exact={item.exact}>
              {item.main()}
            </Route>
          ))}
        </Switch>
      </Router>
    );
  }
}

export default WrapRouter;
