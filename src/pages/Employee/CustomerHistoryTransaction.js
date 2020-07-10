import React, { Component } from "react";

import EmployeeMenu from "containers/EmployeeRole/EmployeeMenu";

import CustomerTransaction from "containers/EmployeeRole/CustomerTransaction";

class CustomerHistoryTransaction extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#757272" }}>

        <div
          className="container"
          style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
        >

          <EmployeeMenu />
          <div style={{ marginTop: '10%' }}>

            <CustomerTransaction />
          </div>

        </div>

      </div>
    );
  }
}

export default CustomerHistoryTransaction;
