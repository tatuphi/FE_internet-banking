import React, { Component } from "react";
import Header from "containers/Share/Header";
import { Row, Col } from "antd";
import EmployeeMenu from "containers/EmployeeRole/EmployeeMenu";
import Footer from "containers/Share/Footer";
import TransactionOtherBankForm from "containers/AdminRole/TransactionOtherBankForm";

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
            <Row>
              <Col span={6}>
                <EmployeeMenu />
              </Col>
              <Col span={18}>
                <TransactionOtherBankForm />
              </Col>
            </Row>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default TransactionOtherBank;
