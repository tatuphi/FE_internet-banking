import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "containers/Share/Header";
import Footer from "containers/Share/Footer";
import TransferMoneyForm from "containers/TransferMoneyForm";
import VerticalMenu from "containers/Share/VerticalMenu";

class TransferMoney extends Component {
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
              <VerticalMenu />
            </Col>
            <Col span={18}>
              <TransferMoneyForm />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TransferMoney;
