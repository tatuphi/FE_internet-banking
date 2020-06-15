import React, { Component } from "react";

import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";

import TransferMoneyForm from "containers/TransferMoneyForm";

class TransferMoney extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container" style={{ paddingTop: "10px" }}>
          <TransferMoneyForm />
        </div>

        <Footer />
      </div>
    );
  }
}


export default TransferMoney;
