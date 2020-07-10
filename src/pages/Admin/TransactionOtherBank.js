import React, { Component } from "react";

import TransactionOtherBankForm from "containers/AdminRole/TransactionOtherBankForm";
import AdminMenu from "containers/AdminRole/AdminMenu";

class TransactionOtherBank extends Component {
  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#757272" }}>

          <div
            className="container"
            style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
          >

            <AdminMenu />

            <TransactionOtherBankForm />

          </div>

        </div>
      </div>
    );
  }
}

export default TransactionOtherBank;
