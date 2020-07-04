import React, { Component } from "react";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import CreateAccountForm from "containers/CreateAccountForm";
import { Row, Col } from "antd";
import EmployeeMenu from "containers/EmployeeRole/EmployeeMenu";
import ShowCustomers from "containers/EmployeeRole/Customer";

class CreateBankAccount extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#757272" }}>
        <Header />
        <div
          className="container"
          style={{ backgroundColor: "white", boxShadow: "2px 5px 5px black" }}
        >

          <EmployeeMenu />

          <div style={{ marginTop: '10px' }}>
            <CreateAccountForm />
            <ShowCustomers />
          </div>


        </div>
        <Footer />
      </div>
    );
  }
}

export default CreateBankAccount;
