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
import Profile from "pages/Profile"
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
class WrapRouter extends Component {
  componentDidMount() { }
  render() {

    const role = localStorage.getItem('role')
    const isAuth = localStorage.getItem('isAuth');


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
        main: () => isAuth ? <Info /> : <Redirect to='/login' />
      },
      {
        path: "/profile",
        exact: true,
        main: () => isAuth ? <Profile /> : <Redirect to='/login' />,
      },
      {
        path: "/employee/createAccount",
        exact: true,
        main: () => role === 'EMPLOYEE' ? <CreateBankAccount /> : <Redirect to='/' />
      },

      {
        path: "/changePassword",
        exact: true,
        main: () => isAuth ? <ChangePassword /> : <Redirect to='/login' />,
      },
      {
        path: "/transferMoney",
        exact: true,
        main: () => role === 'CUSTOMER' ? <TransferMoney /> : <Redirect to='/' />,
      },
      {
        path: "/transferOtherBank",
        exact: true,
        main: () => role === 'CUSTOMER' ? <TransferOtherBank /> : <Redirect to='/' />,
      },
      {
        path: "/beneficiary",
        exact: true,
        main: () => role === 'CUSTOMER' ? <Beneficiary /> : <Redirect to='/' />
      },
      {
        path: "/deptRemind",
        exact: true,
        main: () => role === 'CUSTOMER' ? <DeptRemind /> : <Redirect to='/' />,
      },
      {
        path: "/historyPagement",
        exact: true,
        main: () => role === 'CUSTOMER' ? <HistoryPayment /> : <Redirect to='/' />,
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
        path: "/admin/getEmployee",
        exact: true,
        main: () => role === 'ADMIN' ? <ManageEmployee /> : <Redirect to='/' />,
      },
      {
        path: "/admin/transactionOtherBank",
        exact: true,
        main: () => role === 'ADMIN' ? < TransactionOtherBank /> : < Redirect to='/' />,
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
            >
              <>
                <div className="fixed-top">
                  <Header />
                </div>
                <div className="mt-5">
                  {item.main()}
                </div>

                <Footer />
              </>
            </Route>

          ))}
          {
            noLayoutRoutes.map((item, index) => <Route
              key={index}
              path={item.path}
              exact={item.exact}
            >

              {item.main()}




            </Route>)
          }

        </Switch>
      </Router>
    );
  }
}

export default WrapRouter;
