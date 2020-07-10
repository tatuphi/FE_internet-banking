import React, { Component } from "react";
import CreateAccountForm from "containers/CreateAccountForm";
import { Row, Col } from "antd";
import EmployeeMenu from "containers/EmployeeRole/EmployeeMenu";
import ShowCustomers from "containers/EmployeeRole/Customer";

class CreateBankAccount extends Component {
  render() {
    return (
      <div className="commom">

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

      </div>
    );
  }
}

export default CreateBankAccount;
