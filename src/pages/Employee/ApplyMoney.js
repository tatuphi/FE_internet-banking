import React, { Component } from "react";
import ApplyMoneyForm from "containers/EmployeeRole/ApplyMoneyForm";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import { Row, Col } from "antd";
import EmployeeMenu from "containers/EmployeeRole/EmployeeMenu";

class ApplyMoney extends Component {
  render() {
    return (
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
              <ApplyMoneyForm />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ApplyMoney;
