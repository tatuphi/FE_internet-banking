import React, { Component } from "react";
import Header from "containers/Share/Header";
import { Row, Col } from "antd";
import EmployeeMenu from "containers/EmployeeRole/EmployeeMenu";
import Footer from "containers/Share/Footer";
import CustomerTransaction from "containers/EmployeeRole/CustomerTransaction";

class CustomerHistoryTransaction extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#757272" }}>
        <Header />
        <div
          className="container"
          style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
        >

          <EmployeeMenu />
          <div style={{ marginTop: '10%' }}>

            <CustomerTransaction />
          </div>

        </div>
        <Footer />
      </div>
    );
  }
}

export default CustomerHistoryTransaction;
