import React, { Component } from "react";
import Header from "containers/Share/Header";
import { Row, Col } from "antd";
import Footer from "containers/Share/Footer";
import TransactionOtherBankForm from "containers/AdminRole/TransactionOtherBankForm";
import AdminMenu from "containers/AdminRole/AdminMenu";

class TransactionOtherBank extends Component {
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#757272" }}>
          <Header />
          <div
            className="container"
            style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
          >

            <AdminMenu />

            <TransactionOtherBankForm />

          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default TransactionOtherBank;
